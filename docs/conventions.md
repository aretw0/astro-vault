# Convencoes de nomes e estrutura

Este guia descreve como organizar arquivos e nomes no Astro Vault.

## Estrutura principal

- src/pages: notas e paginas (viram rotas).
- src/assets: imagens e midias.
- public/assets: gerado automaticamente (nao editar).
- docs: documentacao do projeto.

## Frontmatter obrigatorio

Todo .md em src/pages precisa de frontmatter:

```yaml
---
layout: ../layouts/BaseLayout.astro
title: Titulo da pagina
---
```

## Nomes de arquivos

- Use letras minusculas e hifens.
- Evite espacos e acentos em nomes de arquivo.
- Pastas viram caminhos na URL.

Exemplo:

- src/pages/servicos/depilacao.md -> /servicos/depilacao

## Arquivos ignorados

- Arquivos iniciados com _ sao ignorados pelo build.
- Use _rascunho.md para notas privadas.

## Imagens e midias

- Coloque imagens em src/assets.
- Use nomes unicos para evitar colisao.
- Embeds via ![[imagem.png]] apontam para /assets.

## Sintaxes suportadas

- Wikilinks: [[Minha Nota]]
- Wikilinks com alias: [[pasta/arquivo|Texto do link]]
- Image embeds: ![[imagem.png]]
- Callouts: > [!note]

Veja a lista completa em PLANNING.md e ../src/pages/syntaxes.md.

## Links internos

**Prefira wikilinks para navegacao interna:**

```markdown
[[onboarding/editor|Ver tutorial do editor]]
```

**Evite links com `./` em subpastas:**

Links como `[texto](./arquivo.md)` dentro de pastas podem resolver incorretamente. Wikilinks ou links com `../` funcionam:

```markdown
[[onboarding/faq|FAQ]]        # Wikilink (recomendado)
[FAQ](../onboarding/faq)      # Link relativo com ../
```
