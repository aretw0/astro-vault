import { visit } from 'unist-util-visit';

/**
 * Remark plugin: transforms wiki-style image embeds (![[image.png]])
 * into standard markdown image nodes.
 *
 * This handles an open convention used across many editors (Obsidian,
 * Dendron, Foam, etc.) — not specific to any single tool.
 *
 * TODO: Extract into standalone npm package (e.g., remark-wiki-image-embeds)
 * so it becomes a default Astro Vault dependency instead of inline code.
 *
 * @param {Object} options
 * @param {string} [options.base=''] - Base path prefix for URLs (e.g., '/astro-vault').
 */
export default function remarkWikiImageEmbeds(options = {}) {
  const base = options.base || '';

  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      const value = node.value;
      const imageRegex = /!\[\[(.*?)(?:\|(.*?))?\]\]/g;
      
      const children = [];
      let lastIndex = 0;
      let match;
      let hasMatch = false;

      while ((match = imageRegex.exec(value)) !== null) {
        hasMatch = true;
        const [fullMatch, filename, alt] = match;
        const start = match.index;

        if (start > lastIndex) {
          children.push({
            type: 'text',
            value: value.slice(lastIndex, start)
          });
        }

        children.push({
          type: 'image',
          url: `${base}/assets/${filename}`,
          alt: alt || filename,
          title: null
        });

        lastIndex = start + fullMatch.length;
      }

      if (hasMatch) {
        if (lastIndex < value.length) {
          children.push({
            type: 'text',
            value: value.slice(lastIndex)
          });
        }
        
        parent.children.splice(index, 1, ...children);
      }
    });
  };
}
