import { describe, it, expect } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkCallouts from '../src/plugins/remark-callouts.js';

async function process(md) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkCallouts)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(md);
  return String(result);
}

describe('remark-callouts', () => {
  it('converts basic note callout', async () => {
    const md = '> [!note]\n> This is a note.';
    const html = await process(md);

    expect(html).toContain('<aside');
    expect(html).toContain('class="callout callout-note"');
    expect(html).toContain('data-callout="note"');
    expect(html).toContain('role="note"');
    expect(html).toContain('callout-title');
    expect(html).toContain('Note');
    expect(html).toContain('This is a note.');
  });

  it('uses custom title when provided', async () => {
    const md = '> [!tip] Quick win\n> You can do this.';
    const html = await process(md);

    expect(html).toContain('callout-tip');
    expect(html).toContain('aria-label="Quick win"');
    expect(html).toContain('Quick win');
    expect(html).toContain('You can do this.');
  });

  it('handles warning type', async () => {
    const md = '> [!warning]\n> Be careful here.';
    const html = await process(md);

    expect(html).toContain('callout-warning');
    expect(html).toContain('Warning');
    expect(html).toContain('Be careful here.');
  });

  it('handles danger type', async () => {
    const md = '> [!danger]\n> Critical issue.';
    const html = await process(md);

    expect(html).toContain('callout-danger');
    expect(html).toContain('Danger');
    expect(html).toContain('Critical issue.');
  });

  it('leaves normal blockquotes untouched', async () => {
    const md = '> Just a regular quote.';
    const html = await process(md);

    expect(html).toContain('<blockquote');
    expect(html).not.toContain('<aside');
    expect(html).not.toContain('callout');
  });

  it('handles multi-paragraph content', async () => {
    const md = '> [!note]\n> First paragraph.\n>\n> Second paragraph.';
    const html = await process(md);

    expect(html).toContain('callout-note');
    expect(html).toContain('First paragraph.');
    expect(html).toContain('Second paragraph.');
  });

  it('generates default title from type name', async () => {
    const md = '> [!important]\n> Pay attention.';
    const html = await process(md);

    expect(html).toContain('callout-important');
    expect(html).toContain('Important');
  });

  it('handles fold markers without breaking', async () => {
    const md = '> [!note]+\n> Expanded by default.';
    const html = await process(md);

    expect(html).toContain('callout-note');
    expect(html).toContain('Expanded by default.');
  });
});
