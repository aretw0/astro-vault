import { describe, it, expect } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkWikiImageEmbeds from '../src/plugins/remark-wiki-image-embeds.js';

async function process(md, base = '') {
  const result = await unified()
    .use(remarkParse)
    .use(remarkWikiImageEmbeds, { base })
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(md);
  return String(result);
}

describe('remark-wiki-image-embeds', () => {
  it('converts basic image embed', async () => {
    const html = await process('![[photo.png]]');

    expect(html).toContain('<img');
    expect(html).toContain('src="/assets/photo.png"');
    expect(html).toContain('alt="photo"');
    expect(html).toContain('loading="lazy"');
  });

  it('uses explicit alt text via pipe syntax', async () => {
    const html = await process('![[photo.png|My photo]]');

    expect(html).toContain('alt="My photo"');
  });

  it('humanizes filenames for auto alt text', async () => {
    const html = await process('![[test_image.png]]');
    expect(html).toContain('alt="test image"');
  });

  it('applies base path prefix', async () => {
    const html = await process('![[img.png]]', '/astro-vault');

    expect(html).toContain('src="/astro-vault/assets/img.png"');
  });

  it('leaves normal text untouched', async () => {
    const html = await process('No images here.');

    expect(html).not.toContain('<img');
    expect(html).toContain('No images here.');
  });

  it('handles multiple embeds in one line', async () => {
    const html = await process('![[a.png]] and ![[b.png]]');

    expect(html).toContain('src="/assets/a.png"');
    expect(html).toContain('src="/assets/b.png"');
  });

  it('strips hyphens from alt text', async () => {
    const html = await process('![[my-diagram.svg]]');
    expect(html).toContain('alt="my diagram"');
  });
});
