import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

// Regex patterns for different callout syntaxes
const OBSIDIAN_HEADER_REGEX = /^\[!([a-zA-Z0-9_-]+)\]([+-])?(?:\s+(.*))?$/;
const MKDOCS_HEADER_REGEX = /^!!!\s+([a-zA-Z0-9_-]+)(?:\s+"([^"]+)")?(?:\s+(.*))?$/;

function normalizeCalloutType(type) {
  const normalized = String(type || 'note').trim().toLowerCase();
  const aliases = {
    info: 'note',
    abstract: 'note',
    summary: 'note',
    tldr: 'note',
    todo: 'note',
    hint: 'tip',
    important: 'warning',
    attention: 'warning',
    caution: 'warning',
    error: 'danger',
    bug: 'danger',
    failure: 'danger',
    fail: 'danger',
    missing: 'danger'
  };
  return aliases[normalized] || normalized;
}

function defaultTitleForType(type) {
  const label = type.replace(/[-_]/g, ' ').trim();
  return label.charAt(0).toUpperCase() + label.slice(1);
}

/**
 * Parse Obsidian-style callout header from blockquote
 */
function parseObsidianHeader(value) {
  const match = OBSIDIAN_HEADER_REGEX.exec(value);
  if (!match) {
    return null;
  }

  return {
    typeRaw: match[1],
    fold: match[2] || '',
    title: match[3] || ''
  };
}

/**
 * Parse MkDocs-style callout header: !!! note "Title" or !!! note
 */
function parseMkDocsHeader(value) {
  const match = MKDOCS_HEADER_REGEX.exec(value);
  if (!match) {
    return null;
  }

  return {
    typeRaw: match[1],
    title: match[2] || match[3] || ''
  };
}

/**
 * Creates a normalized callout AST node
 */
function createCalloutNode(type, title, children, types) {
  const normalizedType = normalizeCalloutType(type);
  const finalTitle = title || defaultTitleForType(normalizedType);
  const typeConfig = types[normalizedType];

  const titleNode = {
    type: 'paragraph',
    data: {
      hProperties: {
        className: ['callout-title']
      }
    },
    children: [{ type: 'text', value: finalTitle }]
  };

  const calloutNode = {
    type: 'callout',
    data: {
      hName: 'aside',
      hProperties: {
        className: ['callout', `callout-${normalizedType}`],
        role: 'note',
        'aria-label': finalTitle,
        'data-callout': normalizedType
      }
    },
    children: [titleNode, ...children]
  };

  // Inject inline CSS custom property if type is configured
  if (typeConfig?.color) {
    calloutNode.data.hProperties.style = `--callout-color: ${typeConfig.color}`;
  }

  return calloutNode;
}

/**
 * Strips the callout header marker from the first text node of a paragraph.
 * Returns an array of child nodes with the header removed.
 * If nothing remains after stripping, returns an empty array.
 */
function stripHeaderFromParagraph(paragraph) {
  if (!paragraph.children || paragraph.children.length === 0) {
    return [];
  }

  const children = [...paragraph.children];
  const first = children[0];

  if (first.type !== 'text') {
    return children;
  }

  // The first text node contains the header line; strip it
  const lines = first.value.split('\n');
  // Remove the first line (the callout header)
  lines.shift();
  const remaining = lines.join('\n').replace(/^\s+/, '');

  if (remaining) {
    children[0] = { ...first, value: remaining };
    return children;
  }

  // First text node is fully consumed; return the rest
  return children.slice(1);
}

const DEFAULT_TYPES = {
  note: { color: '#448aff' },
  tip: { color: '#00c853' },
  warning: { color: '#ffab00' },
  danger: { color: '#ff5252' }
};

export default function remarkCallouts(options = {}) {
  const types = { ...DEFAULT_TYPES, ...(options.types || {}) };

  return (tree, file) => {
    const source = typeof file?.value === 'string' ? file.value : '';
    const lines = source ? source.split(/\r?\n/) : [];

    // Handler for Obsidian-style callouts (blockquote with [!type])
    visit(tree, 'blockquote', (node, index, parent) => {
      if (!node.children || node.children.length === 0) {
        return;
      }

      const firstChild = node.children[0];
      if (!firstChild || firstChild.type !== 'paragraph') {
        return;
      }

      const startLine = node.position?.start?.line;
      if (!Number.isInteger(startLine)) {
        return;
      }

      const blockStartIndex = startLine - 1;
      const rawLines = lines.slice(blockStartIndex, blockStartIndex + 5);

      let parsed = null;
      for (const rawLine of rawLines) {
        const cleaned = rawLine.replace(/^\s*>\s?/, '').trim();
        parsed = parseObsidianHeader(cleaned);
        if (parsed) {
          break;
        }
      }

      if (!parsed) {
        return;
      }

      const type = parsed.typeRaw;
      const title = String(parsed.title).trim();

      // Strip the header from the first paragraph, keep remaining content
      const remainingChildren = stripHeaderFromParagraph(firstChild);
      const bodyNodes = node.children.slice(1);

      let children = [];
      if (remainingChildren.length > 0) {
        // Preserve the remaining content as a paragraph
        const contentParagraph = {
          ...firstChild,
          children: remainingChildren
        };
        children = [contentParagraph, ...bodyNodes];
      } else {
        children = [...bodyNodes];
      }

      // Replace blockquote with callout node
      const callout = createCalloutNode(type, title, children, types);
      Object.assign(node, callout);
    });

    // Handler for Docusaurus-style callouts (:::type)
    visit(tree, 'containerDirective', (node, index, parent) => {
      if (node.name) {
        const type = node.name;
        const title = node.attributes?.title || '';
        const children = node.children || [];

        // Replace containerDirective with callout node
        const callout = createCalloutNode(type, title, children, types);
        Object.assign(node, callout);
      }
    });

    // Handler for MkDocs-style callouts (!!! type)
    const nodesToReplace = [];
    
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!node.children || node.children.length === 0 || !parent) {
        return;
      }

      const firstChild = node.children[0];
      if (firstChild.type !== 'text') {
        return;
      }

      // Handle potential CRLF line endings from split
      const firstLine = firstChild.value.split('\n')[0].trimEnd();
      const parsed = parseMkDocsHeader(firstLine);

      if (!parsed) {
        return;
      }

      const type = parsed.typeRaw;
      const title = parsed.title;

      // MkDocs callouts are self-contained: header + content in same paragraph
      // Split the paragraph's text into lines
      const lines = firstChild.value.split('\n');
      
      // Lines after the first (header) are the callout content
      const contentLines = lines.slice(1);
      
      // Parse content: remove leading indentation uniformly
      const children = [];
      if (contentLines.length > 0) {
        // Remove common indentation from all lines
        const nonEmptyLines = contentLines.filter(line => line.trim());
        if (nonEmptyLines.length > 0) {
          const minIndent = Math.min(...nonEmptyLines.map(line => {
            const match = line.match(/^( +)/);
            return match ? match[1].length : 0;
          }));
          
          // Build dedented content
          const dedentedContent = contentLines
            .map(line => {
              if (!line.trim()) return ''; // Empty line
              return line.substring(minIndent);
            })
            .join('\n')
            .trim();
          
          if (dedentedContent) {
            // Parse the dedented content as markdown to support nested formatting
            const tempProcessor = unified().use(remarkParse);
            const contentAst = tempProcessor.parse(dedentedContent);
            children.push(...contentAst.children);
          }
        }
      }

      // Schedule replacement - replace only this paragraph node
      nodesToReplace.push({
        parent,
        index,
        callout: createCalloutNode(type, title, children, types)
      });
    });

    // Apply MkDocs replacements (reverse order to maintain indices)
    nodesToReplace.reverse().forEach(({ parent, index, callout }) => {
      parent.children.splice(index, 1, callout); // Replace 1 node
    });
  };
}
