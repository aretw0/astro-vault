import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { describe, expect, it } from 'vitest';
import remarkCallouts from '../src/plugins/remark-callouts.js';

async function process(md) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkCallouts)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(md);
  return String(result);
}

describe('remark-callouts', () => {
  describe('Obsidian-style callouts', () => {
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
    const md = '> [!my-custom-type]\n> Custom content.';
    const html = await process(md);

    expect(html).toContain('callout-my-custom-type');
    expect(html).toContain('My custom type');
  });

  it('handles fold markers without breaking', async () => {
    const md = '> [!note]+\n> Expanded by default.';
    const html = await process(md);

    expect(html).toContain('callout-note');
    expect(html).toContain('Expanded by default.');
  });
  });

  describe('Docusaurus-style callouts', () => {
    it('converts basic note callout', async () => {
      const md = ':::note\nThis is a note.\n:::';
      const html = await process(md);

      expect(html).toContain('<aside');
      expect(html).toContain('class="callout callout-note"');
      expect(html).toContain('data-callout="note"');
      expect(html).toContain('Note');
      expect(html).toContain('This is a note.');
    });

    it('uses custom title when provided', async () => {
      const md = ':::tip{title="Quick win"}\nYou can do this.\n:::';
      const html = await process(md);

      expect(html).toContain('callout-tip');
      expect(html).toContain('aria-label="Quick win"');
      expect(html).toContain('Quick win');
      expect(html).toContain('You can do this.');
    });

    it('handles warning type', async () => {
      const md = ':::warning\nBe careful here.\n:::';
      const html = await process(md);

      expect(html).toContain('callout-warning');
      expect(html).toContain('Warning');
      expect(html).toContain('Be careful here.');
    });

    it('handles danger type', async () => {
      const md = ':::danger\nCritical issue.\n:::';
      const html = await process(md);

      expect(html).toContain('callout-danger');
      expect(html).toContain('Danger');
      expect(html).toContain('Critical issue.');
    });

    it('handles multi-paragraph content', async () => {
      const md = ':::note\nFirst paragraph.\n\nSecond paragraph.\n:::';
      const html = await process(md);

      expect(html).toContain('callout-note');
      expect(html).toContain('First paragraph.');
      expect(html).toContain('Second paragraph.');
    });
  });

  describe('MkDocs-style callouts', () => {
    it('converts basic note callout', async () => {
      const md = '!!! note\n    This is a note.';
      const html = await process(md);

      expect(html).toContain('<aside');
      expect(html).toContain('class="callout callout-note"');
      expect(html).toContain('data-callout="note"');
      expect(html).toContain('Note');
      expect(html).toContain('This is a note.');
    });

    it('uses custom title when provided', async () => {
      const md = '!!! tip "Quick win"\n    You can do this.';
      const html = await process(md);

      expect(html).toContain('callout-tip');
      expect(html).toContain('aria-label="Quick win"');
      expect(html).toContain('Quick win');
      expect(html).toContain('You can do this.');
    });

    it('handles warning type', async () => {
      const md = '!!! warning\n    Be careful here.';
      const html = await process(md);

      expect(html).toContain('callout-warning');
      expect(html).toContain('Warning');
      expect(html).toContain('Be careful here.');
    });

    it('handles danger type', async () => {
      const md = '!!! danger\n    Critical issue.';
      const html = await process(md);

      expect(html).toContain('callout-danger');
      expect(html).toContain('Danger');
      expect(html).toContain('Critical issue.');
    });
  });

  describe('Nested callouts', () => {
    it('handles Docusaurus callout nested in Docusaurus', async () => {
      const md = ':::tip\nOuter tip.\n\n:::note\nNested note.\n:::\n\n:::';
      const html = await process(md);

      expect(html).toContain('callout-tip');
      expect(html).toContain('callout-note');
      expect(html).toContain('Outer tip.');
      expect(html).toContain('Nested note.');
    });

    it('handles Obsidian callout nested in Docusaurus', async () => {
      const md = ':::tip\nOuter tip.\n\n> [!note]\n> Nested note.\n\n:::';
      const html = await process(md);

      expect(html).toContain('callout-tip');
      expect(html).toContain('callout-note');
      expect(html).toContain('Outer tip.');
      expect(html).toContain('Nested note.');
    });
  });

  describe('Mixed syntax coexistence', () => {
    it('processes all three syntaxes in same document', async () => {
      const md = `
> [!note]
> Obsidian callout.

:::tip
Docusaurus callout.
:::

!!! warning
    MkDocs callout.
`;
      const html = await process(md);

      expect(html).toContain('callout-note');
      expect(html).toContain('Obsidian callout.');
      expect(html).toContain('callout-tip');
      expect(html).toContain('Docusaurus callout.');
      expect(html).toContain('callout-warning');
      expect(html).toContain('MkDocs callout.');
    });
  });

  describe('Type aliases', () => {
    it('normalizes info to note', async () => {
      const md = '> [!info]\n> Info content.';
      const html = await process(md);

      expect(html).toContain('callout-note');
      expect(html).toContain('Info');
    });

    it('normalizes hint to tip', async () => {
      const md = ':::hint\nHint content.\n:::';
      const html = await process(md);

      expect(html).toContain('callout-tip');
      expect(html).toContain('Hint');
    });

    it('normalizes important to warning', async () => {
      const md = '!!! important\n    Important content.';
      const html = await process(md);

      expect(html).toContain('callout-warning');
      expect(html).toContain('Important');
    });

    it('normalizes error to danger', async () => {
      const md = '> [!error]\n> Error content.';
      const html = await process(md);

      expect(html).toContain('callout-danger');
      expect(html).toContain('Error');
    });
  });
});
