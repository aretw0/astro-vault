import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { describe, expect, it } from 'vitest';
import remarkCallouts from '../src/plugins/remark-callouts.js';

async function process(md, options = {}) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkCallouts, options)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(md);
  return String(result);
}

describe('remark-callouts styles', () => {
  it('injects default color style for "note"', async () => {
    const md = '> [!note]\n> This is a note.';
    const html = await process(md);
    
    // Expect failure here if the bug is real
    expect(html).toContain('style="--callout-color: #448aff"');
  });

  it('injects custom color style from options', async () => {
    const md = '> [!success]\n> Great job!';
    const options = {
      types: {
        success: { color: '#00ff00' }
      }
    };
    const html = await process(md, options);

    expect(html).toContain('style="--callout-color: #00ff00"');
  });

  it('maps "info" alias to "note" color', async () => {
    const md = '> [!info]\n> Information here.';
    const html = await process(md);

    // Should have note-blue color
    expect(html).toContain('style="--callout-color: #448aff"');
    expect(html).toContain('class="callout callout-note"');
  });

  it('does not inject style for unknown types', async () => {
    const md = '> [!unknown]\n> Mystery.';
    const html = await process(md);

    expect(html).toContain('callout-unknown');
    expect(html).not.toContain('style=');
  });
});
