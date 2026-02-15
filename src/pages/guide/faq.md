---
layout: ../../layouts/BaseLayout.astro
title: FAQ
---

# FAQ

## Imagens nao sao otimizadas?

Isso e esperado no Nivel 0-1. A otimizacao entra no Nivel 2.

## Links quebram no GitHub Pages?

Confirme se base em astro.config.mjs esta correto (substitua '/astro-vault' pelo nome do seu repo).

## Links internos nao funcionam em subpastas?

Links com `./` podem falhar. Use wikilinks `[[pasta/arquivo|Texto]]` ou `../` para subir nivel.

## Plugins Remark nao recarregam?

Rode `npm run test` e reinicie o dev server.

Mais detalhes: veja [`LIMITATIONS.md`](https://github.com/aretw/astro-vault/blob/main/LIMITATIONS.md) e [`TECHNICAL.md`](https://github.com/aretw/astro-vault/blob/main/TECHNICAL.md) no repositório.
