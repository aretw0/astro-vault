---
layout: ../layouts/BaseLayout.astro
title: Kitchen Sink
description: Visual regression testing page showing all supported Markdown features.
---

# 🧪 Kitchen Sink

**Visual regression testing page** — um pouco de tudo que o Astro Vault suporta.

> **Para documentação completa**, veja [[docs|Documentação]].

---

## 📝 Texto e Formatação

Parágrafo com **negrito**, *itálico*, ***ambos***, `código inline`, e ~~tachado~~.

### Listas

Não ordenada:

- Item principal
  - Sub-item aninhado
  - Outro sub-item

Ordenada:

1. Primeiro
2. Segundo
   1. Sub 2.1
   2. Sub 2.2

### Blockquote Regular

> Uma citação tradicional do Markdown.
> Pode ter múltiplas linhas.

---

## 🔗 Links

**Wikilinks:**

- Existente: [[docs/markdown]]
- Com alias: [[docs/links|guia de links]]
- Inexistente: [[nota-futura]]
- Privado: [[_ignored-note]]

**Links externos:** [Astro](https://astro.build)

---

## 🖼️ Imagens

**Alt automático:**
![[test_image.png]]

**Alt customizado:**
![[test_image.png|Test image showing layout capabilities]]

**Inexistente:** ![[missing.png]]

**Privada:** ![[_private.png]]

---

## 💡 Callouts

Para documentação completa, veja [[docs/callouts]].

### Obsidian

> [!note]
> Nota básica.

> [!tip] Dica
> Com título customizado.

> [!warning]
> Aviso de cuidado.

> [!danger]
> Crítico!

### Docusaurus

:::note
Sintaxe Docusaurus.
:::

:::tip{title="Dica Pro"}
Com atributo title.
:::

:::warning
Tenha cuidado.
:::

:::danger
Perigo!
:::

### MkDocs

!!! note
    Sintaxe MkDocs.

!!! tip "Título"
    Entre aspas.

!!! warning
    Cautela necessária.

!!! danger
    Bloqueador!

### Aninhados

:::tip
Callout externo (Docusaurus).

> [!note]
> Callout interno (Obsidian).

Voltando ao externo.
:::

### Tipos Customizados

> [!success]
> Tipo customizado com fallback.

> [!question] Por quê?
> Funciona sem configuração prévia.

---

## 💻 Código

Inline: `const x = 42;`

Bloco com syntax highlighting:

```javascript
function hello(name) {
  console.log(`Hello, ${name}!`);
}

hello("world");
```

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

---

## 📊 Tabelas

| Feature    | Obsidian | Docusaurus | MkDocs |
|------------|----------|------------|--------|
| Callouts   | ✅       | ✅         | ✅     |
| Wikilinks  | ✅       | ✅         | ✅     |
| No content | ✅       | ✅         | ⚠️     |

---

## 🎯 Linha Horizontal

Acima desta linha.

---

Abaixo desta linha.

---

**Fim do Kitchen Sink** • Voltar para [[./index|Início]]
