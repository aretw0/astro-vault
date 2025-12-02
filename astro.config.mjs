import { defineConfig } from 'astro/config';
import wikiLinkPlugin from 'remark-wiki-link';
import syncAssets from './src/integrations/sync-assets.js';
import remarkObsidianImages from './src/plugins/remark-obsidian-images.js';

// https://astro.build/config
export default defineConfig({
  integrations: [syncAssets()],
  markdown: {
    remarkPlugins: [
      remarkObsidianImages,
      [wikiLinkPlugin, {
        pageResolver: (name) => [name.toLowerCase().replace(/ /g, '-')],
        hrefTemplate: (permalink) => `/${permalink}`,
      }]
    ]
  }
});
