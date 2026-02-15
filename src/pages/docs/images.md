---
layout: ../../layouts/BaseLayout.astro
title: Imagens
---

# Imagens

O Astro Vault facilita a incorporação de imagens usando **image embeds** no estilo Obsidian, além de suportar a sintaxe tradicional do Markdown.

## Image Embeds (Recomendado)

A forma mais simples de adicionar imagens é usando a sintaxe `![[nome-da-imagem.ext]]`:

```markdown
![[test_image.png]]
```

**Resultado:**

![[test_image.png]]

### Como Funciona

1. Coloque suas imagens na pasta `src/assets/`
2. Use `![[nome-do-arquivo.ext]]` em qualquer nota
3. O build automaticamente:
   - Copia a imagem para `public/assets/`
   - Adiciona o `base` path correto
   - Gera um `alt` text humanizado (sem extensão)

### Alt Text Customizado

Use a sintaxe de pipe `|` para definir um texto alternativo personalizado:

```markdown
![[test_image.png|Uma bela imagem de teste mostrando capacidades de layout]]
```

**Resultado:**

![[test_image.png|Uma bela imagem de teste mostrando capacidades de layout]]

O texto alternativo é importante para acessibilidade e SEO.

## Imagens Markdown Tradicionais

Você também pode usar a sintaxe padrão do Markdown:

```markdown
![Alt text](/astro-vault/assets/test_image.png)
```

**Nota:** Com esta sintaxe, você precisa incluir manualmente o `base` path (`/astro-vault/` neste caso) e garantir que a imagem esteja em `public/assets/`.

## Organização de Imagens

### Arquivos na Pasta Correta

✅ **Correto:** Imagens em `src/assets/`

```
src/
  assets/
    diagram.png
    screenshot.jpg
    icon.svg
```

### Sincronização Automática

A integração `sync-assets` escaneia todas as suas notas e copia **apenas as imagens referenciadas** para `public/assets/`. Isso mantém o build limpo e rápido.

### Imagens Privadas (Prefixo `_`)

Imagens que começam com `_` são ignoradas pelo build:

```markdown
![[_draft-diagram.png]]
```

Este embed não funcionará em produção — use isso para imagens de rascunhos que não devem ser publicadas.

## Referências de Imagens

### Imagens que Existem

Esta imagem funciona: ![[test_image.png]]

### Imagens que Não Existem

Esta imagem não existe: ![[non-existing-image.png]]

O Astro Vault **não quebra** se você referenciar uma imagem inexistente — simplesmente não renderizará nada. Isso permite que você planeje seus embeds e adicione as imagens depois.

### Imagens Ignoradas

Esta imagem é privada: ![[_test_image_to_ignore.png]]

## Formatos Suportados

O Astro Vault suporta todos os formatos de imagem comuns:

- **Raster:** `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`
- **Vetorial:** `.svg`

## ⚠️ Limitações Atuais

### Sem Otimização Automática

As imagens são servidas **como estão** — não há:

- ❌ Redimensionamento automático
- ❌ Conversão para WebP/AVIF
- ❌ Responsive images (`srcset`)
- ❌ Lazy loading (você precisa adicionar manualmente)

**Mitigação:**

- Otimize suas imagens antes de colocá-las em `src/assets/`
- Use ferramentas como [Squoosh](https://squoosh.app/) ou [TinyPNG](https://tinypng.com/)
- Mantenha imagens em tamanhos razoáveis (< 500KB recomendado)

Para otimização automática, você precisará migrar para **Content Collections** (Nível 2 do roadmap). Veja [[../syntaxes#image-optimization|Limitações]] para mais detalhes.

## Próximos Passos

- [[docs/callouts|Aprenda a usar callouts para destacar informações]]
- [[docs/markdown|Volte ao básico do Markdown]]
- Retorne para [[docs/index|Documentação]]
