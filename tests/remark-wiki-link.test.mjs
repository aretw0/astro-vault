
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
      hrefTemplate: (permalink) => `/vault/${permalink}`,
      ...options
    })
    .use(remarkRehype)
    .use(html)
    .process(markdown);
  return result.toString();
};

test('wikilink with alias renders correctly', async () => {
  const markdown = '[[onboarding/template|Configurar o template]]';
  const output = await processMarkdown(markdown);
  
  // Adjusted expectation based on how remark-wiki-link typically works
  // It should generate <a href="/vault/onboarding/template" class="internal new">Configurar o template</a>
  expect(output).toContain('href="/vault/onboarding/template"');
  expect(output).toContain('>Configurar o template</a>');
});

test('wikilink without alias renders correctly', async () => {
    const markdown = '[[Page One]]';
    const output = await processMarkdown(markdown);
    expect(output).toContain('href="/vault/page-one"');
    expect(output).toContain('>Page One</a>');
});
