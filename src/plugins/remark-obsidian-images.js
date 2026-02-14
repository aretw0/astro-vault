import { visit } from 'unist-util-visit';

/**
 * Remark plugin that transforms Obsidian image embeds (![[image.png]])
 * into standard markdown image nodes.
 *
 * @param {Object} options
 * @param {string} [options.base=''] - Base path prefix for generated URLs (e.g., '/astro-vault').
 */
export default function remarkObsidianImages(options = {}) {
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
