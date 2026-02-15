import { defineConfig } from 'astro/config';
import wikiLinkPlugin from 'remark-wiki-link';
import syncAssets from './src/integrations/sync-assets.js';
import remarkCallouts from './src/plugins/remark-callouts.js';
import remarkWikiImageEmbeds from './src/plugins/remark-wiki-image-embeds.js';

// Base path: '/astro-vault' for GitHub Pages project sites, '/' for custom domains.
const base = '/astro-vault';

// https://astro.build/config
export default defineConfig({
  site: 'https://aretw0.github.io',
  base,
  integrations: [syncAssets()],
  markdown: {
    remarkPlugins: [
      [remarkCallouts, {
        types: {
          note: { color: '#448aff' },
          tip: { color: '#00c853' },
          warning: { color: '#ffab00' },
          danger: { color: '#ff5252' }
        }
      }],
      [remarkWikiImageEmbeds, { base }],
      [wikiLinkPlugin, {
        pageResolver: (name) => [name.toLowerCase().replace(/ /g, '-')],
        hrefTemplate: (permalink) => `${base}/${permalink}`,
      }]
    ]
  }
});
