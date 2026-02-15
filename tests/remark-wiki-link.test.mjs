
import html from 'rehype-stringify';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import wikiLinkPlugin from 'remark-wiki-link';
import { expect, test } from 'vitest';

const processMarkdown = async (markdown, options = {}) => {
  const result = await remark()
    .use(wikiLinkPlugin, {
      aliasDivider: '|',
      pageResolver: (name) => [name.toLowerCase().replace(/ /g, '-')],
      hrefTemplate: (permalink) => {
        // Simulate the normalization from astro.config.mjs
        let path = permalink.replace(/ /g, '-').toLowerCase();
        path = path.replace(/\/index$/, ''); // Remove trailing /index
        return `/vault/${path}`;
      },
      ...options
    })
    .use(remarkRehype)
    .use(html)
    .process(markdown);
  return result.toString();
};

test('wikilink with alias renders correctly', async () => {
  const markdown = '[[guide/template|Configurar o template]]';
  const output = await processMarkdown(markdown);
  
  // Adjusted expectation based on how remark-wiki-link typically works
  // It should generate <a href="/vault/guide/template" class="internal new">Configurar o template</a>
  expect(output).toContain('href="/vault/guide/template"');
  expect(output).toContain('>Configurar o template</a>');
});

test('wikilink without alias renders correctly', async () => {
    const markdown = '[[Page One]]';
    const output = await processMarkdown(markdown);
    expect(output).toContain('href="/vault/page-one"');
    expect(output).toContain('>Page One</a>');
});

test('wikilink with /index removes it from URL', async () => {
  const markdown = '[[guide/index|Guia]]';
  const output = await processMarkdown(markdown);
  // Should remove /index from href to avoid 404
  expect(output).toContain('href="/vault/guide"');
  expect(output).not.toContain('href="/vault/guide/index"');
  expect(output).toContain('>Guia</a>');
});
