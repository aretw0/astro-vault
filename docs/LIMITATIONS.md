# Limitações e Jornada de Progressão

Este documento mapeia as **limitações técnicas** de cada nível de Progressive Disclosure do Astro Vault. O objetivo é dar consciência ao usuário sobre até onde cada abordagem pode levá-lo, e qual o caminho natural de evolução.

---

## Filosofia: Trade-offs Intencionais

Cada nível do Astro Vault **escolhe simplicidade** em áreas específicas, aceitando limitações técnicas como preço da acessibilidade. Essas limitações não são bugs — são **fronteiras conscientes** que indicam quando o usuário está pronto para o próximo nível.

---

## Nível 0: Markdown Puro em `src/pages/`

**O que você tem:**

- ✅ Escreve `.md`, dá push, site atualiza
- ✅ Wikilinks `[[nota]]` funcionam
- ✅ Image embeds `![[imagem.png]]` funcionam
- ✅ Frontmatter define layout e título
- ✅ Lazy loading automático em imagens

**Limitações aceitas:**

### 1. Imagens não são otimizadas automaticamente

**Sintoma:** Astro Dev Audit avisa "Use the Image component" no styleguide.

**Por quê:** O componente `<Image>` do Astro requer:

- Import estático de imagens (`import myPhoto from '../assets/photo.png'`)
- Componentes `.astro` ou `.mdx` (não funciona em `.md` puro)
- Imagens em `src/` (as nossas estão em `public/assets/`)

**O que você perde:**

- ❌ Resize/crop automático
- ❌ Conversão para WebP/AVIF
- ❌ Responsive images (`srcset`)
- ❌ Prevenção de CLS (Cumulative Layout Shift)

**O que já temos (mitigação):**

- ✅ `loading="lazy"` nativo
- ✅ Alt text humanizado (sem extensão de arquivo)
- ✅ Base path correto para deploy

**Próximos passos:**

- **Nível 1 (Concluído):** Pesquisa confirmou que `getImage()` no Remark em `.md` puro é tecnicamente inviável sem hacks frágeis (ADR-XX pendente).
- **Nível 2:** Migrar para Content Collections (`src/content/`) + schema Zod. Isso permite o uso nativo de `astro:assets` e o componente `<Image>` do Astro, garantindo otimização de imagens baseada na configuração do framework.
- **Nível 3:** Extrair como `remark-astro-wiki-images` com suporte nativo a assets do Astro

### 2. Sem validação de tipos no frontmatter

**Sintoma:** Typo em `layout: ../layouts/BaseLyout.astro` (errado) só quebra em runtime.

**Por quê:** `src/pages/*.md` não participam de Content Collections, que oferecem schema Zod.

**Próximos passos:**

- **Nível 2:** Migrar para Content Collections (`src/content/`) com schema de validação

### 3. Sem queries avançadas

**Sintoma:** Não dá para fazer "liste todas as notas com tag #tutorial" programaticamente.

**Por quê:** Arquivos em `src/pages/` são apenas rotas — sem API de coleção.

**Próximos passos:**

- **Nível 2:** Content Collections com `getCollection()` para queries tipadas

---

## Caveats Técnicos (Perigos Ocultos)

Estes são comportamentos que podem surpreender o usuário caso o vault cresça.

### 1. Colisão de Nomes em Assets

**O que acontece:** A integração `sync-assets.js` achata a estrutura de pastas ao copiar para `public/assets/`.
**Risco:** Se você tiver `viagens/paris.jpg` e `trabalho/paris.jpg`, apenas uma chegará ao site final.
**Mitigação:** Use nomes únicos para arquivos de mídia ou aceite este trade-off em prol de URLs de assets curtas no Nível 0-1.

### 2. HMR e Plugins Remark

**O que acontece:** Alterações em `src/plugins/*.js` não são refletidas instantaneamente no browser pelo Astro.
**Risco:** Frustração durante o desenvolvimento de novas sintaxes.
**Mitigação:** Execute `npm run test` para validar lógica de plugin de forma isolada e reinicie o servidor Astro (`npm run dev`) apenas para a verificação final.

### 3. Callouts: Customização Limitada a Cores

**O que funciona (Nível 0-1):**

- ✅ Tipos ilimitados via sintaxe `> [!custom-type]`
- ✅ Configuração de cores por tipo em `astro.config.mjs`
- ✅ Fallback automático para cor accent em tipos desconhecidos
- ✅ Ícones via emoji/Unicode no título customizado

**O que NÃO funciona:**

- ❌ Ícones SVG inline (requer MDX)
- ❌ Validação de tipos permitidos (requer Zod Schema)
- ❌ Callouts colapsáveis/interativos (requer client-side JS)
- ❌ Backgrounds complexos com gradientes (tecnicamente possível, mas over-engineering)

**Exemplo de customização atual:**

```js
// astro.config.mjs
remarkPlugins: [
  [remarkCallouts, {
    types: {
      success: { color: '#00e676' },
      question: { color: '#448aff' },
      quote: { color: '#9e9e9e' }
    }
  }]
]
```

**Próximos passos:**

- **Nível 2 (Content Collections):** Schema Zod valida tipos permitidos. Componente `<Callout>` customizado aceita ícones SVG e slots.
- **Nível 3 (Islands):** Callouts interativos via React/Vue (ex: `client:load` para collapse).

### 4. Links Markdown Relativos com `./` em Subpastas Não Funcionam

**O que acontece:** Links Markdown que usam `./` para referenciar arquivos no mesmo nível dentro de subpastas de `src/pages/` resolvem para o caminho errado.

**Exemplo do problema:**

```markdown
<!-- Em src/pages/onboarding/index.md -->
[Editor](./editor)  <!-- Esperado: /onboarding/editor -->
                    <!-- Resultado: /editor (root) ❌ -->
```

**Por quê:** O Astro não reescreve links Markdown automaticamente. O browser interpreta `./` baseado na URL atual, e `/onboarding` (sem trailing slash) é tratado como arquivo, não como pasta.

**O que FUNCIONA:**

```markdown
<!-- Links que sobem nível com ../ funcionam corretamente -->
[FAQ](../onboarding/faq)  ✅

<!-- Wikilinks funcionam em qualquer situação -->
[[onboarding/editor|Editor]]  ✅
```

**Solução recomendada no Nível 0-1:** Use **wikilinks** para navegação interna, que funcionam consistentemente:

```markdown
[[onboarding/editor|Editor Markdown + Git]]
```

**Benefícios dos wikilinks:**

- ✅ Funcionam em qualquer profundidade de pasta
- ✅ Respeitam o base path automaticamente (dev e prod)
- ✅ Suportam alias para textos humanizados: `[[pasta/arquivo|Texto]]`
- ✅ Convenção aberta usada em múltiplos editores (Obsidian, Foam, Dendron, etc.)

**Alternativa:** Links com `../` funcionam, mas exigem conhecimento da estrutura de pastas:

```markdown
[FAQ](../onboarding/faq)  <!-- Funciona, mas verboso -->
```

**Próximos passos:**

- **Nível 2:** Com MDX, é possível criar um componente `<Link>` que reescreve caminhos automaticamente.
- **Nível 3:** Plugin remark customizado para reescrever links Markdown relativos (se necessário para compatibilidade com ferramentas externas).

---

## Nível 1: Componentes Astro + CSS Customizado

**O que você ganha:**

- ✅ Controle total de layout via `.astro`
- ✅ CSS scoped por componente
- ✅ Slots, props, lógica condicional

**Limitações aceitas:**

### 1. Sem interatividade client-side

**Sintoma:** Não dá para ter um botão que abre modal ou theme toggle sem JavaScript.

**Por quê:** Componentes `.astro` renderizam apenas no servidor (SSG).

**Próximos passos:**

- **Nível 3:** Adicionar islands de React/Vue/Svelte com diretivas client:*

### 2. Ainda sem otimização de imagem em markdown

**Sintoma:** Mesmo problema do Nível 0 — `.md` puro não aceita componentes.

**Próximos passos:**

- **Nível 2:** Migrar para `.mdx` para misturar Markdown + componentes

---

## Nível 2: Content Collections + MDX

**O que você ganha:**

- ✅ Schema de validação (Zod)
- ✅ Queries tipadas (`getCollection()`)
- ✅ Componentes dentro do Markdown (`.mdx`)
- ✅ Otimização de imagem via `<Image>` do Astro

**Limitações aceitas:**

### 1. Sintaxe MDX é mais estrita que Markdown

**Sintoma:** Algumas coisas que funcionavam em `.md` podem quebrar em `.mdx` (e.g., `{` sem escape).

**Mitigação:** Documentar convenções e fornecer exemplos.

### 2. Perda de URL hierárquica automática

**Sintoma:** Em `src/pages/`, a pasta `projetos/site.md` vira `/projetos/site`. Em `src/content/`, você precisa definir routing manual.

**Mitigação:** Configurar `slug` customizado ou usar `getStaticPaths()`.

**Próximos passos:**

- **Nível 2:** Documentar estratégia de routing em Content Collections

---

## Nível 3: Frameworks + Islands Architecture

**O que você ganha:**

- ✅ React/Vue/Svelte para interatividade
- ✅ Hidratação parcial (só ilhas interativas carregam JS)
- ✅ Reutilização de componentes de ecosistemas maduros (shadcn, etc.)

**Limitações aceitas:**

### 1. Aumento de complexidade no build

**Sintoma:** Mais dependências, build mais lento, bundle maior.

**Mitigação:** Usar islands com moderação (`client:idle`, `client:visible`).

### 2. Curva de aprendizado de frameworks

**Sintoma:** Usuário precisa aprender React/Vue/Svelte além de Astro.

**Mitigação:** Documentar quando vale a pena cada framework.

---

## Mapa de Decisão: Quando Evoluir?

| Você quer... | Nível recomendado | Trade-off |
|---|---|---|
| Publicar notas rapidamente | 0 | Sem otimização de imagem |
| Customizar visual do site | 1 | Sem interatividade |
| Validar frontmatter, listar por tags | 2 | Sintaxe MDX mais rígida |
| Otimizar imagens automaticamente | 2 | Migrar `.md` → `.mdx` |
| Theme toggle, busca client-side | 3 | Bundle JS maior |
| Graph view interativo | 3 | Complexidade de desenvolvimento |

---

## Roadmap de Remoção de Limitações

Ver `PLANNING.md` para datas e priorização. Destaques:

- **Fase 2 (UX):** Investigar `getImage()` no plugin para tentar otimização de imagem em `.md` puro (ainda Nível 0-1).
- **Fase 3 (Evolução Astro):** Documentar migração para Content Collections + MDX, fornecendo caminho claro de Nível 1 → 2.
- **Futuro (Extração):** `remark-wiki-image-embeds` vira pacote npm com suporte a `astro:assets` nativo.

---

## Referências

- [Astro Image Guide](https://docs.astro.build/en/guides/images/) — entenda por que `<Image>` precisa de imports estáticos
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) — compare com `src/pages/`
- [Progressive Disclosure (TECHNICAL.md)](./TECHNICAL.md) — filosofia do projeto
