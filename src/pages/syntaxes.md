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

O Astro Vault suporta **três sintaxes diferentes** para callouts/admonitions, permitindo máxima compatibilidade entre editores:

### Obsidian-style (Blockquote + [!type])

A sintaxe original usada por Obsidian, Quartz e outros Digital Gardens.

````
> [!note]
> Conteúdo do callout.

> [!tip] Título Customizado
> Use títulos opcionais após o tipo.
````

### Docusaurus-style (:::type)

A sintaxe de containers usada por Docusaurus e padrão CommonMark Directive.

````
:::note
Conteúdo do callout.
:::

:::tip{title="Título Customizado"}
Defina títulos via atributo.
:::
````

### MkDocs-style (!!! type)

A sintaxe de admonitions do MkDocs Material e Python-Markdown.

````
!!! note
    Conteúdo indentado com 4 espaços.

!!! tip "Título Customizado"
    Títulos entre aspas duplas.
````

### Comparação Visual

Todas as três sintaxes geram **exatamente o mesmo HTML** e têm **aparência idêntica** no site:

| Sintaxe | Editor | Exemplo |
|---------|--------|---------|
| Obsidian | Obsidian, Quartz | `> [!note]` |
| Docusaurus | Docusaurus, Starlight | `:::note` |
| MkDocs | MkDocs Material | `!!! note` |

**Escolha a sintaxe do seu editor favorito** — todas funcionam igualmente bem!

### Tipos Disponíveis

Tipos padrão: `note`, `tip`, `warning`, `danger`.

Aliases automáticos:

- `info`, `abstract`, `summary`, `tldr`, `todo` → `note` (azul)
- `hint` → `tip` (verde)
- `important`, `attention`, `caution` → `warning` (laranja)
- `error`, `bug`, `failure`, `fail`, `missing` → `danger` (vermelho)

### Callouts Aninhados

Você pode aninhar callouts de sintaxes diferentes:

````
:::tip
Dica externa.

> [!note]
> Nota aninhada com sintaxe diferente.

:::
````

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

- [[kitchen-sink]]
- [[linked-note]]
