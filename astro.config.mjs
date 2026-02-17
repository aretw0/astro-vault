import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import wikiLinkPlugin from 'remark-wiki-link';
import syncAssets from './src/integrations/sync-assets.js';
import remarkCallouts from './src/plugins/remark-callouts.js';
import remarkWikiImageEmbeds from './src/plugins/remark-wiki-image-embeds.js';

// Base path configuration for GitHub Pages deployment
// - Local development always uses '/' by default
// - Production builds use '/astro-vault' by default
// - Can be overridden via ASTRO_SITE and ASTRO_BASE env vars
const site = process.env.ASTRO_SITE || 'https://aretw0.github.io';
const base = process.env.ASTRO_BASE || (process.env.NODE_ENV === 'production' ? '/astro-vault' : '/');

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [syncAssets()],
  markdown: {
    remarkPlugins: [
      remarkDirective,
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
          
          // Normalize path: lowercase, replace spaces with hyphens
          let path = permalink.replace(/ /g, '-').toLowerCase();
          
          // Remove trailing /index to avoid 404s
          // [[folder/index]] → /folder
          // [[folder/index|alias]] → /folder
          path = path.replace(/\/index$/, '');
          
          return base === '/' ? `/${path}` : `${base}/${path}`;
        },
      }]
    ]
  }
});
