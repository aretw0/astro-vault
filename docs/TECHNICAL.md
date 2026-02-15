# Técnico

## Filosofia: Progressive Disclosure

O Astro Vault adota uma abordagem de **revelação progressiva** da plataforma Astro:

| Nível | O usuário faz | O que aprende |
|-------|--------------|---------------|
| 0 | Escreve `.md`, faz o release (tag) | Markdown vira site (fluxo de colheita) |
| 1 | Edita frontmatter, CSS, layout | Estrutura de um site Astro |
| 2 | Usa Content Collections (`src/content/`) | APIs avançadas do Astro |
| 3 | Integra React/Vue/Svelte, islands | Poder total do Astro |

**Hoje o projeto opera no Nível 0–1.** A arquitetura foi desenhada para que a transição entre níveis seja natural, nunca forçada. Inspiração filosófica: [Quartz](https://quartz.jzhao.xyz/) (publicação de notas sobre Hugo) — mesma energia, mas sem esconder o framework.

**Limitações conscientes:** Cada nível aceita trade-offs em prol de simplicidade. Para mapeamento completo de limitações e jornada de progressão, consulte [`LIMITATIONS.md`](./LIMITATIONS.md).

## Abordagem de Desenvolvimento

Seguiremos uma abordagem incremental para evitar *over-engineering*:
**Spike -> SDD Simplificado -> (Dev Container) -> BDD/TDD**

### 1. Fase 0: Spike (Prova de Conceito) — CONCLUÍDA

**Resultado:** Sucesso. A integração técnica foi validada e implementada.

### 2. Decisões Técnicas (ADR)

#### ADR-01: Pages as Content

* **Decisão:** Usar `src/pages/` em vez de Content Collections.
* **Motivo:** Simplicidade radical — "arquivo na pasta = página no site". Hierarquia de pastas nativa e URLs previsíveis sem configuração extra.
* **Trade-off:** Perde-se tipagem e queries da Content Layer API. Aceito para o Nível 0–1; Content Collections entram no Nível 2.

#### ADR-02: Smart Asset Sync

* **Problema:** Copiar todas as imagens do vault gera lixo e expõe rascunhos.
* **Solução:** `src/integrations/sync-assets.js` escaneia `.md` buscando referências `![[]]` e `()`. Copia para `public/assets` apenas as imagens citadas. Ignora arquivos começando com `_`.

#### ADR-03: Frontmatter-Driven Configuration

* **Layouts:** Controlados via `layout: ../layouts/BaseLayout.astro` no frontmatter.
* **Title:** `title: ...` define o título da página.
* Essa convenção é a porta de entrada para o usuário entender componentes Astro.

#### ADR-04: Syntaxes Abertas: Wikilinks e Image Embeds

* Suportamos wikilinks `[[Nota]]` → URL (lowercase, espaços → hyphens) via `remark-wiki-link`.
* Suportamos image embeds `![[imagem.png]]` → `<img src="/assets/imagem.png">` via remark plugin.
* Essas são convenções abertas usadas em wikis e markdown editors diversos, não exclusivas do Obsidian.
* Ambas configuradas em `astro.config.mjs` para máxima compatibilidade.

#### ADR-05: Base Path para GitHub Pages

* **Problema descoberto (Fev/2026):** O deploy em `https://user.github.io/repo-name/` requer que todos os links internos incluam o prefixo `/repo-name/`. Sem isso, navegação, wikilinks, imagens e favicon quebram com 404.
* **Causa raiz:** `astro.config.mjs` não define `site` nem `base`. Os plugins remark geram URLs absolutas sem o prefixo.
* **Solução necessária:**
  1. Configurar `site` e `base` no `astro.config.mjs`.
  2. O `hrefTemplate` do wikilink precisa incorporar o `base`.
  3. O plugin de image embeds (`remark-wiki-image-embeds`) precisa prefixar URLs com `base`.
  4. O nav link do `BaseLayout.astro` deve usar `import.meta.env.BASE_URL`.
* **Consideração de template:** `base` deve ser facilmente alterável — `/` para domínio customizado, `/repo-name` para GitHub Pages de projeto.

#### ADR-06: Versionamento via arquivo VERSION

* **Decisão:** O arquivo `VERSION` na raiz é a fonte de verdade única para o versionamento do projeto.
* **Motivo:** Simplicidade e visibilidade — um arquivo de texto puro, fácil de editar e automatizar via scripts/CI.
* **Sincronização:** `package.json` espelha a mesma versão. Ferramentas podem validar consistência (e.g., npm version hook ou script pré-commit).
* **Interpolação no site:** `BaseLayout.astro` importa `VERSION?raw` (Vite raw import) e exibe no footer: "Built with Astro Vault v{version}".
* **Processo de Automação:** Detalhes sobre como gerenciar releases e versionamento estão em [`RELEASE_PROCESS.md`](./RELEASE_PROCESS.md).
* **Dogfooding:** Demonstra ao usuário que dados externos podem ser interpolados em páginas Astro — preparação conceitual para níveis avançados.
* **SemVer e fases:**
  * `v0.x.y` = MVP / Fase 1 (em desenvolvimento)
  * `v1.0.0` = Fase 2 (template usável por terceiros)
  * `v2.0.0+` = Fase 3 (Progressive Disclosure completa)

#### ADR-07: Callouts com sintaxe Obsidian e HTML semântico

* **Decisão:** Suportar callouts via sintaxe `> [!note]` (e variantes) e renderizar como `<aside>` com classes e rótulo acessível.
* **Motivo:** Sintaxe amplamente adotada (Obsidian, Quartz, etc.) e HTML semântico correto para conteúdo complementar.
* **Resultado:** Callouts têm classes `callout` e `callout-{tipo}`, além de `aria-label` e `data-callout`.
* **Trade-off:** O título passa a ser gerado/normalizado pelo plugin; formatações complexas no título não são suportadas no Nível 0-1.

#### ADR-08: Testes Unitários para Plugins Remark

* **Problema:** O Astro não recarrega plugins Remark via HMR durante o desenvolvimento. Além disso, erros na árvore AST são difíceis de depurar via browser.
* **Decisão:** Usar `vitest` para testar as transformações da árvore AST de forma isolada.
* **Benefício:** Ciclo de feedback de <500ms. Garante que mudanças no código do plugin não quebrem a renderização sem precisar reiniciar o servidor Astro.
* **Localização:** Os testes residem em `tests/*.test.mjs`.

#### ADR-09: Customização de Callouts via Config (Abordagem B)

* **Problema:** Callouts hardcoded no CSS limitam a extensibilidade. Usuários que inventam tipos customizados (`> [!success]`) veem apenas a borda genérica roxa.
* **Decisão:** O plugin `remark-callouts` aceita um mapa `options.types` configurável via `astro.config.mjs`. Para cada tipo mapeado, o plugin injeta `style="--callout-color: X"` no HTML. O CSS usa `var(--callout-color, var(--accent))` como fallback.
* **Benefício:** Tipos ilimitados sem regras CSS por tipo. Customização em um único arquivo (`astro.config.mjs`). Zero breaking changes — tipos não mapeados herdam a cor accent.
* **Trade-offs aceitos (Nível 0-1):**
  * Apenas cor é suportada via inline style. Ícones customizados requerem emoji/Unicode ou MDX (Nível 2).
  * Backgrounds customizados são tecnicamente possíveis mas aumentam complexidade visual.
  * Sem validação de tipos — erros de digitação simplesmente caem no fallback (validação Zod só no Nível 2 com Content Collections).
* **Jornada de progressão:**
  * **Nível 0-1 (atual):** Config no `astro.config.mjs` com mapa de cores.
  * **Nível 2 (futuro):** Schema Zod em Content Collections valida tipos permitidos. Callouts renderizados via componente Astro customizado que aceita ícones SVG, layouts complexos, e slots.
  * **Nível 3 (islands):** Callouts colapsáveis/interativos via framework (React/Vue).

#### ADR-10: Base Path Condicional para DX

* **Problema:** Desenvolver com `base: '/astro-vault'` força navegação para `localhost:4321/astro-vault`, criando fricção desnecessária no desenvolvimento local.
* **Decisão:** Usar `base: '/'` em desenvolvimento e `base: '/repo-name'` em produção via detecção de `process.env.NODE_ENV`.
* **Benefício:** DX superior — desenvolvedores navegam diretamente para `localhost:4321/` enquanto o build de produção gera URLs corretos para GitHub Pages.
* **Configuração necessária:** O usuário deve editar a linha `const base = isProd ? '/astro-vault' : '/';` em `astro.config.mjs` substituindo `'/astro-vault'` pelo nome do seu repositório.
* **Validação:** Wikilinks e image embeds devem respeitar o base path correto em ambos os ambientes.
* **Trade-off aceito:** Requer ação manual do usuário ao clonar o template. Futuras automações (template-initializer, ADR futuro) devem substituir esse valor programaticamente.

#### ADR-11: Wikilinks para Navegação Interna

* **Problema:** Links Markdown com `./` (mesmo nível) dentro de subpastas de `src/pages/` resolvem incorretamente no browser. Um link `./editor` dentro de `/onboarding/index.md` resolve para `/editor` (root) em vez de `/onboarding/editor`.
* **Causa raiz:** O Astro não reescreve links Markdown para URLs absolutas. O browser interpreta `./` baseado na URL atual, e `/onboarding` sem trailing slash é tratado como arquivo, não como pasta.
* **O que funciona:** Links com `../` (subir nível) funcionam corretamente: `[FAQ](../onboarding/faq)`. Porém, são verbosos e exigem conhecimento da estrutura de pastas.
* **Decisão:** Usar wikilinks (`[[onboarding/editor|Texto]]`) para toda navegação interna. O plugin `remark-wiki-link` transforma wikilinks em URLs absolutas que respeitam a estrutura de pastas e o base path.
* **Benefício:** DX consistente — o mesmo formato funciona em qualquer profundidade de pasta. O base path condicional (ADR-10) é aplicado automaticamente. Alias (`|`) permite textos de link humanizados.
* **Alternativa descartada:** Criar um plugin remark customizado para reescrever links Markdown relativos adicionaria complexidade sem ganho real sobre wikilinks, que já são uma convenção aberta do ecossistema.

### 3. SDD - Specification Driven Development (Simplificado)

Poucos arquivos vivos em `/docs`:

* `PRODUCT.md`: Visão, Personas e User Stories.
* `TECHNICAL.md`: Arquitetura, Decisões de Design e Stack.
* `PLANNING.md`: Roadmap, Backlog e Tarefas.

*Na raiz:*

* `README.md`: Guia de início rápido.
* `.github/copilot-instructions.md`: Instruções para agentes AI (estável).

### 4. Dev Container & Ambiente

Definir um ambiente reprodutível (Dev Container) apenas após estabilizar o MVP.

### 5. Qualidade (QA & Testing)

* **Style Guide (Kitchen Sink):**
  * `src/pages/styleguide.md` é a "Nota Mestra" de teste de regressão visual.
  * **Objetivo:** Sempre que alterar CSS, layouts ou plugins, verificar que imagens, links e formatações complexas continuam funcionando.
* **BDD:** Testes de aceitação para garantir que o fluxo "Escrever Markdown → Push → Site Atualizado" funcione.
* **TDD:** Testes unitários para lógicas complexas (plugins remark, sync-assets).
