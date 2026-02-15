# Técnico

## Filosofia: Progressive Disclosure

O Astro Vault adota uma abordagem de **revelação progressiva** da plataforma Astro:

| Nível | O usuário faz | O que aprende |
|-------|--------------|---------------|
| 0 | Escreve `.md` em `src/pages/`, dá push | Markdown vira site |
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
* **Dogfooding:** Demonstra ao usuário que dados externos podem ser interpolados em páginas Astro — preparação conceitual para níveis avançados.
* **SemVer e fases:**
  - `v0.x.y` = MVP / Fase 1 (em desenvolvimento)
  - `v1.0.0` = Fase 2 (template usável por terceiros)
  - `v2.0.0+` = Fase 3 (Progressive Disclosure completa)

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
