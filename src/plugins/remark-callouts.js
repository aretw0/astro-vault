import { visit } from 'unist-util-visit';

const CALLOUT_HEADER_REGEX = /^\[!([a-zA-Z0-9_-]+)\]([+-])?(?:\s+(.*))?$/;

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

function parseCalloutHeader(value) {
  const match = CALLOUT_HEADER_REGEX.exec(value);
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

    visit(tree, 'blockquote', (node) => {
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
        parsed = parseCalloutHeader(cleaned);
        if (parsed) {
          break;
        }
      }

      if (!parsed) {
        return;
      }

      const type = normalizeCalloutType(parsed.typeRaw);
      const title = String(parsed.title).trim() || defaultTitleForType(type);
      const typeConfig = types[type];

      // Transform blockquote → semantic aside
      node.data = node.data || {};
      node.data.hName = 'aside';
      node.data.hProperties = {
        className: ['callout', `callout-${type}`],
        role: 'note',
        'aria-label': title,
        'data-callout': type
      };

      // Inject inline CSS custom property if type is configured
      if (typeConfig?.color) {
        node.data.hProperties.style = `--callout-color: ${typeConfig.color}`;
      }

      // Strip the header from the first paragraph, keep remaining content
      const remainingChildren = stripHeaderFromParagraph(firstChild);

      // Build new children: title + remaining content from first paragraph + rest
      const titleNode = {
        type: 'paragraph',
        data: {
          hProperties: {
            className: ['callout-title']
          }
        },
        children: [{ type: 'text', value: title }]
      };

      const bodyNodes = node.children.slice(1);

      if (remainingChildren.length > 0) {
        // Preserve the remaining content as a paragraph
        const contentParagraph = {
          ...firstChild,
          children: remainingChildren
        };
        node.children = [titleNode, contentParagraph, ...bodyNodes];
      } else {
        node.children = [titleNode, ...bodyNodes];
      }
    });
  };
}
