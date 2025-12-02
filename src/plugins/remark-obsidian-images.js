import { visit } from 'unist-util-visit';

export default function remarkObsidianImages() {
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
          url: `/assets/${filename}`,
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
