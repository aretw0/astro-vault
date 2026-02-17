# Planning

Este documento centraliza o Roadmap, Backlog e Tarefas do projeto Astro Vault.

**Premissa:** Progressividade. Cada fase entrega valor completo no nível atual antes de avançar.

**Contexto de limitações:** Para entender os trade-offs conscientes de cada nível de Progressive Disclosure, consulte [`LIMITATIONS.md`](./LIMITATIONS.md).

**Processo de release:** Para entender como as colheitas são geradas e documentadas, consulte [`RELEASE_PROCESS.md`](./RELEASE_PROCESS.md).

## Versionamento (SemVer)

**Objetivo:** Comunicar fases por SemVer e tornar a versão do projeto sempre disponível para uso no site e na documentação.

- **Fonte de verdade:** `VERSION` (ver ADR-06 em TECHNICAL.md).
- **Sincronização:** `package.json` espelha o mesmo número de versão.
- **Dogfood:** ✅ Versão exibida no footer do site via interpolação em `BaseLayout.astro`.
- **Fases e SemVer:**
  - `v0.1.0` = MVP (site funcional, base path, versionamento) — ✅ CONCLUÍDA
  - `v0.2.0` = Sintaxes e Convenções (callouts, getImage research) — ✅ CONCLUÍDA
  - `v0.3.0` = Visual e Leitura (temas, SEO, meta tags) — ✅ CONCLUÍDA
  - `v0.4.0` = Documentação e Onboarding (tutoriais, FAQ) — ✅ CONCLUÍDA
  - `v1.0.0` = Template Público (inicialização automática, release)
  - `v2.0.0+` = Progressive Disclosure avançado (Content Collections, frameworks, islands)

## Roadmap

### Fase 0: Validação Técnica (Spike) — CONCLUÍDA

*Foco: Garantir que a integração Markdown → Astro é viável sem hacks excessivos.*

- [x] Validar renderização de Wikilinks (`[[nota]]`) no Astro.
- [x] Validar renderização de imagens locais (`![[imagem.png]]`) no Astro.
- [x] Definir stack de plugins (remark/rehype) necessária.
- [x] Implementar "Smart Asset Sync" (apenas imagens usadas).
- [x] Arquitetura "Pages as Content" (simplicidade).

### Fase 0.1.0: MVP — CONCLUÍDA

*Foco: Site no ar, funcional, editável por Markdown.*

- [x] Setup inicial do Astro (template básico).
- [x] Configuração do GitHub Actions para deploy no Pages.
- [x] **Fix: Configurar `site` e `base` em `astro.config.mjs`** para que links funcionem no GitHub Pages (ver ADR-05 em TECHNICAL.md).
- [x] **Fix: Propagar `base` para wikilink `hrefTemplate` e `remark-wiki-image-embeds`.**
- [x] **Fix: Usar `import.meta.env.BASE_URL` no nav do `BaseLayout.astro`.**
- [x] **Fix: Atualizar conteúdo do `index.md`** — texto ainda referencia `src/content` e estrutura desatualizada.
- [x] Verificar regressão visual no `kitchen-sink.md` após fixes de base path.
- [x] Configuração de versionamento e release (ADR-06: VERSION como fonte de verdade).
- [x] Definir e automatizar a fonte de verdade da versão (`VERSION` + `package.json`).
- [x] Exibir versão no site (dogfood de interpolação em `BaseLayout.astro`).

### Fase 0.2.0: Sintaxes e Convenções — CONCLUÍDA

*Foco: Expandir suporte a sintaxes Markdown abertas e melhorar acessibilidade de conteúdo.*

- [x] Suporte a Callouts/Admonitions (sintaxe compatível com Obsidian, Quartz, etc.).
- [x] **Setup de Testes:** Introdução do Vitest para validar plugins Remark de forma determinística, contornando limitações de cache do Astro HMR.
- [x] **Visual: Diferencial de Cores:** Implementar CSS específico para tipos de callouts (`note`, `tip`, `warning`, `danger`).
- [x] **Customização de Callouts:** Sistema de configuração de tipos via `astro.config.mjs` (ADR-09) — tipos ilimitados com inline CSS custom properties.
- [x] **Research:** Investigar `getImage()` do Astro para otimização de imagem em plugin remark. **Veredito:** Inviável no Nível 0-1 (Pages as Content). Implementação real movida para Nível 2 (Content Collections).
- [x] Documentar sintaxes suportadas em página dedicada (wikilinks, image embeds, callouts) em `src/pages/syntaxes.md`.

### Fase 0.3.0: Visual e Experiência de Leitura — CONCLUÍDA

*Foco: Melhorar a experiência visual do site.*

- [x] Refinar tipografia e espaçamento para melhor legibilidade (foco em leitura).
- [x] Melhorar quebra de linha e formatação de código.
- [x] Meta tags para SEO básico.
- [x] Open Graph tags para compartilhamento.

### Fase 0.4.0: Documentação e Onboarding — CONCLUÍDA

*Foco: Preparar usuários para usar o template.*

- [x] Tutorial: Como usar seu editor Markdown favorito com Git (fluxo sem terminal; VS Code, Obsidian, iA Writer, etc.).
- [x] Tutorial: Como configurar o template do zero e fazer o primeiro deploy.
- [x] Documentar convenções de nomes de arquivos e estrutura de pastas.
- [x] FAQ sobre limitações e progressão de níveis (com links diretos para LIMITATIONS).
- [x] Publicar os guias também como páginas do site (para leitura online).
- [x] Estruturar conteúdo pensando em futura internacionalização (PT-BR primeiro).

### Fase 0.4.1: Ajustes Callouts — CONCLUÍDA

- [x] Revisar o suporte a callouts para permitir Docusaurus-style e MkDocs-style admonitions.

### Fase 0.4.2: Patching ui, deploy, gitpages, domain

- [x] Revisar o deploy no GitHub Pages.
- [x] Revisar o domínio.
- [x] Revisar o UI.

### Fase 1.0.0: Template Público

*Foco: Tornar o template usável por terceiros com automação de inicialização.*

- [ ] GitHub Actions para inicialização do template (retirar arquivos e referências específicas do template, deixando apenas o necessário).
- [ ] Estudar o [`aretw0/template-initializer`](https://github.com/aretw0/template-initializer) para automação de setup. Obs.: vault-seed faz uso do `template-initializer` para criar repositórios personalizados a partir do template.
- [ ] Validação final de todos os fluxos (clone → edit → push → deploy).
- [ ] Release notes e changelog estruturado.
- [ ] Anúncio público do template.

### Fase 2.0.0: Evolução Astro (Progressive Disclosure)

*Foco: Abrir caminho para níveis avançados sem forçar migração.*

- [ ] **Temas/Layouts específicos** (Blog, Portfólio) — incluindo Dark Mode Toggle granular.
- [ ] Implementar otimização nativa de imagens via `astro:assets` integrado a Content Collections (Zod `image()` schema).
- [ ] Documentar caminho de migração `src/pages` → Content Collections.
- [ ] Extrair `remark-wiki-image-embeds` e `sync-assets` como pacotes npm independentes (plugins inline → dependências de config padrão).
- [ ] Exemplos de componentes customizados para "Artistas".
- [ ] Suporte a tags em Markdown.
- [ ] Graph View (opcional, desejável para Digital Gardens).

## Backlog (sem fase definida)

- **Research:** E-commerce simples via Markdown (persona Prestadora de Serviço).
- **Feat:** Dev Container para ambiente reprodutível.
- **Doc:** Rascunho do tutorial de setup do editor Markdown.
