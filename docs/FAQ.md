# FAQ

## Por que minhas imagens nao sao otimizadas?

No Nivel 0-1, as paginas sao .md em src/pages. O Astro nao consegue aplicar o componente Image nesse fluxo. A solucao completa aparece no Nivel 2 com Content Collections. Veja LIMITATIONS.md.

## Preciso usar MDX?

Nao. O projeto foi desenhado para Markdown puro no Nivel 0-1. MDX so entra no Nivel 2.

## Por que meus links quebram no GitHub Pages?

Em projeto no GitHub Pages, o base precisa ser /nome-do-repo. Edite a linha `const base = isProd ? '/astro-vault' : '/';` em astro.config.mjs e substitua '/astro-vault' pelo nome do seu repositorio. Veja TECHNICAL.md (ADR-10).

## Por que links Markdown relativos nao funcionam em subpastas?

Links com `./` (mesmo nivel) dentro de subpastas resolvem incorretamente. Use wikilinks `[[pasta/arquivo|Texto]]` ou links com `../` (subir nivel): `[FAQ](../onboarding/faq)`. Veja LIMITATIONS.md (Caveat 4) e TECHNICAL.md (ADR-11).

## Posso usar Obsidian ou iA Writer?

Sim. As sintaxes sao abertas e funcionam com editores populares. O Obsidian e apenas um exemplo.

## Mudei um plugin e nao atualizou no dev server

O HMR do Astro nao recarrega plugins Remark com confiabilidade. Rode npm run test e reinicie o dev server. Veja TESTING.md.

## Onde vejo o que esta previsto para o futuro?

Consulte PLANNING.md e LIMITATIONS.md.
