# Agents.md

## Project identity

Astro Vault is a progressive Digital Garden: Markdown notes with open syntaxes → Astro static site.
Works with any markdown editor (VS Code, Obsidian, iA Writer, etc.).
Read `docs/PRODUCT.md` for vision/personas and `docs/TECHNICAL.md` for architecture decisions (ADRs).
Understand trade-offs and progression path in `docs/LIMITATIONS.md`.

## Architecture (stable)

- **Pages as Content:** Markdown files in `src/pages/` become routes directly. No Content Collections yet (see ADR-01).
- **Frontmatter contract:** Every `.md` in `src/pages/` must have:

  ```yaml
  layout: ../layouts/BaseLayout.astro
  title: <page title>
  ```

- **Extended Markdown support** via three remark plugins configured in `astro.config.mjs`:
  - `remark-wiki-link`: Wikilinks `[[My Note]]` → `/<base>/my-note` (lowercase, spaces → hyphens).
  - `remark-wiki-image-embeds` (`src/plugins/remark-wiki-image-embeds.js`): Image embeds `![[image.png]]` → `<img src="<base>/assets/image.png">`.
  - `remark-callouts` (`src/plugins/remark-callouts.js`): Semantic callouts `> [!note]` → `<aside class="callout callout-note">`. **Customizable** via `options.types` in config (see ADR-09).
- **Smart Asset Sync** (`src/integrations/sync-assets.js`): scans all `.md` for image references and copies only those from `src/assets/` to `public/assets/`. Files prefixed with `_` are ignored (private).

## Key files

| Purpose                       | File                                    |
| ----------------------------- | --------------------------------------- |
| Astro config + plugin wiring  | `astro.config.mjs`                      |
| Asset sync integration        | `src/integrations/sync-assets.js`       |
| Image embed remark plugin     | `src/plugins/remark-wiki-image-embeds.js` |
| Callouts remark plugin        | `src/plugins/remark-callouts.js`        |
| Base layout (all pages)       | `src/layouts/BaseLayout.astro`          |
| Global styles (dark theme)    | `src/styles/global.css`                 |
| Visual regression test page   | `src/pages/styleguide.md`               |
| Unit tests (Plugins)          | `tests/remark-callouts.test.mjs`        |

## Conventions

- Notes live in `src/pages/`; folder hierarchy = URL hierarchy.
- Images live in `src/assets/`; `public/assets/` is git-ignored and auto-generated.
- Files/images prefixed with `_` are excluded from build (e.g., `_ignored-note.md`, `_draft.png`).
- **Internal navigation:** Use wikilinks `[[path/to/page|Link text]]` instead of Markdown relative links. Astro does not rewrite relative links in subfolders, causing them to resolve incorrectly (see ADR-11 and LIMITATIONS.md Caveat 4).
- The `base` path in `astro.config.mjs` is conditional: `/` in development (for DX) and `/repo-name` in production (for GitHub Pages). Users must update the production value to match their repository name. Wikilink and image plugins automatically incorporate this base — see ADR-05 and ADR-10 in `docs/TECHNICAL.md`.

## Dev commands

```bash
npm run dev       # local dev server
npm run build     # static build
npm run preview   # preview build output
npm run test      # run unit tests for plugins (vitest)
npm run clean     # remove .astro, dist, public/assets
```

## Current status and roadmap

See `docs/PLANNING.md` for the living roadmap. Key context: the project is in **Fase 1 (MVP)** — stabilizing deployment and base path handling before expanding features.
