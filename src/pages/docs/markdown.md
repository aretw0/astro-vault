---
layout: ../../layouts/BaseLayout.astro
title: Markdown Básico
---

# Markdown Básico

O Astro Vault suporta toda a sintaxe padrão do Markdown, permitindo que você escreva notas ricas e bem formatadas.

## Parágrafos e Quebras de Linha

Parágrafos são criados simplesmente escrevendo texto. Deixe uma linha em branco entre parágrafos para separá-los.

Este é o primeiro parágrafo.

Este é o segundo parágrafo, separado por uma linha em branco.

## Headings (Títulos)

Use `#` para criar títulos de diferentes níveis:

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

### Exemplo Visual

#### Heading Nível 4
##### Heading Nível 5
###### Heading Nível 6

## Formatação de Texto

- **Negrito**: Use `**texto**` ou `__texto__` → **texto em negrito**
- *Itálico*: Use `*texto*` ou `_texto_` → *texto em itálico*
- ***Negrito e Itálico***: Combine os dois → ***texto em negrito e itálico***
- `Código inline`: Use crases → `código`
- ~~Tachado~~: Use `~~texto~~` → ~~texto tachado~~

## Listas

### Lista não ordenada

```markdown
- Item 1
- Item 2
  - Sub-item 2.1
  - Sub-item 2.2
- Item 3
```

**Resultado:**

- Item 1
- Item 2
  - Sub-item 2.1
  - Sub-item 2.2
- Item 3

### Lista ordenada

```markdown
1. Primeiro item
2. Segundo item
3. Terceiro item
   1. Sub-item 3.1
   2. Sub-item 3.2
```

**Resultado:**

1. Primeiro item
2. Segundo item
3. Terceiro item
   1. Sub-item 3.1
   2. Sub-item 3.2

## Citações (Blockquotes)

Use `>` para criar citações:

```markdown
> Esta é uma citação.
> Pode ter múltiplas linhas.
```

**Resultado:**

> Esta é uma citação.
> Pode ter múltiplas linhas.

## Blocos de Código

Para código com múltiplas linhas, use três crases (```) e opcionalmente especifique a linguagem:

````markdown
```javascript
function hello() {
  console.log("Hello, world!");
}
```
````

**Resultado:**

```javascript
function hello() {
  console.log("Hello, world!");
}
```

## Linha Horizontal

Use `---` ou `***` para criar uma linha horizontal:

```markdown
---
```

**Resultado:**

---

## Próximos Passos

- [[links|Aprenda sobre Wikilinks]] para conectar suas notas
- [[images|Descubra como incorporar imagens]]
- [[callouts|Veja como usar callouts para destacar informações]]
