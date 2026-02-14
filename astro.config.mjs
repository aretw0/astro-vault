import { defineConfig } from 'astro/config';
import wikiLinkPlugin from 'remark-wiki-link';
import syncAssets from './src/integrations/sync-assets.js';
import remarkObsidianImages from './src/plugins/remark-obsidian-images.js';

// Base path: '/astro-vault' for GitHub Pages project sites, '/' for custom domains.
const base = '/astro-vault';

// https://astro.build/config
export default defineConfig({
  site: 'https://aretw0.github.io',
  base,
  integrations: [syncAssets()],
  markdown: {
    remarkPlugins: [
      [remarkObsidianImages, { base }],
      [wikiLinkPlugin, {
        pageResolver: (name) => [name.toLowerCase().replace(/ /g, '-')],
        hrefTemplate: (permalink) => `${base}/${permalink}`,
      }]
    ]
  }
});
