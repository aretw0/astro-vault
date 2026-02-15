---
layout: ../../layouts/BaseLayout.astro
title: Callouts
---

# Callouts

Callouts (também chamados de *admonitions*) são caixas destacadas usadas para chamar atenção para informações importantes, avisos, dicas ou notas.

O Astro Vault suporta **três sintaxes diferentes** de callouts, permitindo que você escolha a que preferir ou reutilize notas de outras ferramentas.

## Sintaxes Suportadas

### 1. Obsidian-style (Blockquote + [!type])

A sintaxe do Obsidian usa blockquotes com um marcador especial:

```markdown
> [!note]
> Este é um callout de nota básico.

> [!tip] Dica rápida
> Você pode adicionar um título customizado após o tipo.

> [!warning]
> Este callout destaca um possível problema.

> [!danger]
> Este callout marca uma questão crítica.
```

**Resultado:**

> [!note]
> Este é um callout de nota básico.

> [!tip] Dica rápida
> Você pode adicionar um título customizado após o tipo.

> [!warning]
> Este callout destaca um possível problema.

> [!danger]
> Este callout marca uma questão crítica.

### 2. Docusaurus-style (:::type)

A sintaxe do Docusaurus usa diretivas de container:

```markdown
:::note
Este é um callout no estilo Docusaurus.
:::

:::tip{title="Dica Profissional"}
Sintaxe Docusaurus com atributo de título customizado.
:::

:::warning
Tenha cuidado com esta abordagem.
:::

:::danger
Isto é crítico!
:::
```

**Resultado:**

:::note
Este é um callout no estilo Docusaurus.
:::

:::tip{title="Dica Profissional"}
Sintaxe Docusaurus com atributo de título customizado.
:::

:::warning
Tenha cuidado com esta abordagem.
:::

:::danger
Isto é crítico!
:::

### 3. MkDocs-style (!!! type)

A sintaxe do MkDocs usa marcadores `!!!` com indentação:

```markdown
!!! note
    Este é um callout no estilo MkDocs.

!!! tip "Dica rápida"
    Sintaxe MkDocs com título entre aspas.

!!! warning
    Tenha cautela aqui.

!!! danger
    Problema crítico detectado.
```

**Resultado:**

!!! note
    Este é um callout no estilo MkDocs.

!!! tip "Dica rápida"
    Sintaxe MkDocs com título entre aspas.

!!! warning
    Tenha cautela aqui.

!!! danger
    Problema crítico detectado.

## Tipos de Callout

O Astro Vault vem com quatro tipos pré-configurados, cada um com sua cor característica:

| Tipo      | Cor     | Uso                               |
|-----------|---------|-----------------------------------|
| `note`    | Azul    | Informações gerais, observações   |
| `tip`     | Verde   | Dicas, sugestões, boas práticas   |
| `warning` | Laranja | Avisos, cuidados, ressalvas       |
| `danger`  | Vermelho| Crítico, erros, bloqueadores      |

### Aliases de Tipos

Alguns aliases são automaticamente convertidos para os tipos padrão:

- `info`, `abstract`, `summary`, `tldr`, `todo` → `note`
- `hint` → `tip`
- `important`, `attention`, `caution` → `warning`
- `error` → `danger`

## Callouts Aninhados

Você pode aninhar callouts de sintaxes diferentes:

```markdown
:::tip
Callout externo com sintaxe Docusaurus.

> [!note]
> Callout aninhado usando sintaxe Obsidian dentro.

De volta ao conteúdo externo.
:::
```

**Resultado:**

:::tip
Callout externo com sintaxe Docusaurus.

> [!note]
> Callout aninhado usando sintaxe Obsidian dentro.

De volta ao conteúdo externo.
:::

Os callouts aninhados têm um visual diferenciado (fundo mais escuro e borda mais grossa) para melhor hierarquia visual.

## Tipos Customizados

Você pode usar **qualquer tipo** que desejar — se não estiver configurado, ele usará a cor accent padrão:

```markdown
> [!success]
> Este callout usa um tipo customizado não definido na config. Ele usa a cor accent como fallback.

> [!question] Por que isso importa?
> Tipos customizados funcionam perfeitamente sem quebrar o site.
```

**Resultado:**

> [!success]
> Este callout usa um tipo customizado não definido na config. Ele usa a cor accent como fallback.

> [!question] Por que isso importa?
> Tipos customizados funcionam perfeitamente sem quebrar o site.

### Configurando Cores Customizadas

Para adicionar cores específicas para novos tipos, edite o `astro.config.mjs`:

```javascript
// astro.config.mjs
remarkCallouts({
  types: {
    note: { color: '#448aff' },
    tip: { color: '#00c853' },
    warning: { color: '#ffab00' },
    danger: { color: '#ff5252' },
    success: { color: '#00e676' },  // Novo tipo
    question: { color: '#ba68c8' }   // Novo tipo
  }
})
```

## Conteúdo Rico em Callouts

Callouts suportam todo o Markdown dentro deles:

> [!tip] Funcionalidades Avançadas
> Você pode usar **negrito**, *itálico*, `código inline`, listas:
>
> - Item 1
> - Item 2
>   - Sub-item
>
> E até blocos de código:
>
> ```javascript
> console.log("Hello!");
> ```

## ⚠️ Limitação: Wikilinks em MkDocs

Callouts no estilo **MkDocs não suportam wikilinks ou outras extensões customizadas** dentro de seu conteúdo. Isso ocorre porque o parser MkDocs reconstrói o conteúdo em uma instância isolada do `remark`.

**Alternativa:** Use Obsidian (`> [!note]`) ou Docusaurus (`:::note`) para callouts que precisem de wikilinks, highlights ou outras sintaxes estendidas.

Exemplo que **não funcionará** em callouts MkDocs:

```markdown
!!! note
    Veja [[markdown]] para mais detalhes.  ❌ Wikilink não será processado
```

Exemplo que **funcionará** com outras sintaxes:

```markdown
> [!note]
> Veja [[markdown]] para mais detalhes.  ✅ Wikilink funciona
```

## Qual Sintaxe Usar?

**Recomendação:** Use a sintaxe que você já conhece ou prefere:

- **Vindo do Obsidian?** Use `> [!type]`
- **Vindo do Docusaurus?** Use `:::type`
- **Vindo do MkDocs?** Use `!!! type` (mas evite wikilinks dentro)

Todas as três sintaxes geram a **mesma saída HTML** e visual. Você pode até misturar sintaxes diferentes no mesmo arquivo!

## Próximos Passos

- [[docs/markdown|Volte ao básico do Markdown]]
- [[docs/links|Aprenda sobre Wikilinks]]
- Retorne para [[docs/index|Documentação]]
