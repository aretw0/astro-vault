---
layout: ../layouts/BaseLayout.astro
title: Sintaxes Suportadas
---

## Wikilinks

Use `[[Minha Nota]]` para criar links entre notas. O texto e convertido para URL em minusculo com espacos virando hifens.

Exemplo:

```
[[Guia Rapido]]
```

## Image Embeds

Use `![[imagem.png]]` para embutir imagens do diretorio `src/assets/`.

Exemplo:

```
![[diagrama.png]]
![[diagrama.png|Alt text opcional]]
```

## Callouts

Use `> [!note]` para criar callouts com titulo opcional. Tipos comuns: `note`, `tip`, `warning`, `danger`.

Exemplo:

```
> [!note] Observacao
> Este conteudo fica em destaque.
```

### Customizando Cores

Voce pode criar seus proprios tipos de callout editando o `astro.config.mjs`:

```js
remarkPlugins: [
  [remarkCallouts, {
    types: {
      success: { color: '#00e676' },
      question: { color: '#448aff' }
    }
  }]
]
```

Tipos nao mapeados usam a cor accent padrao automaticamente.

## Links

* [[styleguide]]
* [[linked-note]]
