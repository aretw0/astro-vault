---
layout: ../../layouts/BaseLayout.astro
title: Links e Wikilinks
---

# Links e Wikilinks

O Astro Vault suporta tanto links tradicionais do Markdown quanto **Wikilinks** no estilo Obsidian, facilitando a criação de conexões entre suas notas.

## Wikilinks (Recomendado)

Wikilinks são a forma mais simples de criar links entre notas. Use a sintaxe `[[nome-da-nota]]`:

```markdown
Veja mais em [[markdown]] para aprender o básico.
```

**Resultado:**

Veja mais em [[markdown]] para aprender o básico.

### Como Funcionam

1. O texto entre `[[` e `]]` é convertido automaticamente para um link
2. O caminho é normalizado: espaços viram hífens, letras ficam minúsculas
3. O `base` path configurado é adicionado automaticamente

**Exemplo de conversões:**

- `[[Minha Nota]]` → `/minha-nota`
- `[[docs/Links]]` → `/docs/links`
- `[[Guia de Instalação]]` → `/guia-de-instalacao`

### Aliases (Texto Customizado)

Você pode usar um texto diferente do nome do arquivo usando a sintaxe de pipe `|`:

```markdown
Leia o [[markdown|guia de Markdown]] para começar.
```

**Resultado:**

Leia o [[markdown|guia de Markdown]] para começar.

### Wikilinks com Pastas

Para notas em subdiretórios, inclua o caminho relativo:

```markdown
Veja o [[guide/index|guia de início]].
```

**Resultado:**

Veja o [[guide/index|guia de início]].

## Links Markdown Tradicionais

Você também pode usar a sintaxe padrão do Markdown:

```markdown
[Texto do Link](https://exemplo.com)
```

**Resultado:**

[Texto do Link](https://exemplo.com)

### ⚠️ Limitação com Links Relativos

**Evite usar links markdown relativos** para navegação interna entre notas em subpastas:

```markdown
❌ [Não use assim](./nota.md)
❌ [[nota|Não use assim]]
✅ [Use com o caminho](/outra-pasta/nota)
✅ [[outra-pasta/nota|Use com o caminho]]
```

**Por quê?** O Astro não reescreve links markdown relativos com o `base` path configurado, fazendo com que eles quebrem em produção (GitHub Pages).

## Links Externos

Para links externos, use a sintaxe markdown tradicional:

```markdown
Visite o [site oficial do Astro](https://astro.build).
```

**Resultado:**

Visite o [site oficial do Astro](https://astro.build).

## Referências de Notas

### Links que Existem

Este link funciona: [[markdown]]

### Links que Não Existem

Este link aponta para uma nota inexistente: [[nota-inexistente]]

O Astro Vault **não quebra** se você linkar para uma nota que não existe ainda — o link simplesmente levará a uma página 404. Isso permite que você crie links enquanto escreve e crie as notas depois.

### Notas Privadas (Prefixo `_`)

Notas que começam com `_` são ignoradas pelo build:

Este link não funcionará em produção: [[_ignored-note]]

Use isso para rascunhos ou notas pessoais que não devem ser publicadas.

## Próximos Passos

- [[docs/images|Aprenda a incorporar imagens]]
- [[docs/callouts|Descubra como usar callouts]]
- Voltar para [[docs/index|Documentação]]
