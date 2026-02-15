import { defineConfig } from 'astro/config';
import wikiLinkPlugin from 'remark-wiki-link';
import syncAssets from './src/integrations/sync-assets.js';
import remarkCallouts from './src/plugins/remark-callouts.js';
import remarkWikiImageEmbeds from './src/plugins/remark-wiki-image-embeds.js';

// ⚠️ USER ACTION REQUIRED: Update the repo name below
// Base path configuration for GitHub Pages deployment
// - Local development always uses '/'
// - Production builds use '/your-repo-name'
// TODO: Replace '/astro-vault' with your GitHub repository name
const isProd = process.env.NODE_ENV === 'production';
const base = isProd ? '/astro-vault' : '/';  // ← CHANGE THIS

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
      [remarkWikiImageEmbeds, { base: base === '/' ? '' : base }],
      [wikiLinkPlugin, {
        aliasDivider: '|',
        pageResolver: (name) => [name.toLowerCase().replace(/ /g, '-')],
        hrefTemplate: (permalink) => {
          if (permalink.startsWith('#')) return permalink; // Anchor links
          const path = permalink.replace(/ /g, '-').toLowerCase();
          return base === '/' ? `/${path}` : `${base}/${path}`;
        },
      }]
    ]
  }
});
