# Planning

Este documento centraliza o Roadmap, Backlog e Tarefas do projeto Astro Vault.

**Premissa:** Progressividade. Cada fase entrega valor completo no nível atual antes de avançar.

**Contexto de limitações:** Para entender os trade-offs conscientes de cada nível de Progressive Disclosure, consulte [`LIMITATIONS.md`](./LIMITATIONS.md).

## Versionamento (SemVer)

**Objetivo:** Comunicar fases por SemVer e tornar a versão do projeto sempre disponível para uso no site e na documentação.

- **Fonte de verdade:** `VERSION`.
- **Sincronização:** `package.json` deve espelhar o mesmo número de versão.
- **Dogfood:** Exibir a versão no site (ex.: "Built by Astro Vault v{{VAULT_VERSION}}").
- **Virada de chave:** Fase 2 inicia em `v1.0.0`.

## Roadmap

### Fase 0: Validação Técnica (Spike) — CONCLUÍDA

*Foco: Garantir que a integração Markdown → Astro é viável sem hacks excessivos.*

- [x] Validar renderização de Wikilinks (`[[nota]]`) no Astro.
- [x] Validar renderização de imagens locais (`![[imagem.png]]`) no Astro.
- [x] Definir stack de plugins (remark/rehype) necessária.
- [x] Implementar "Smart Asset Sync" (apenas imagens usadas).
- [x] Arquitetura "Pages as Content" (simplicidade).

### Fase 0.1.0: MVP — EM ANDAMENTO

*Foco: Site no ar, funcional, editável por Markdown.*

- [x] Setup inicial do Astro (template básico).
- [x] Configuração do GitHub Actions para deploy no Pages.
- [x] **Fix: Configurar `site` e `base` em `astro.config.mjs`** para que links funcionem no GitHub Pages (ver ADR-05 em TECHNICAL.md).
- [x] **Fix: Propagar `base` para wikilink `hrefTemplate` e `remark-wiki-image-embeds`.**
- [x] **Fix: Usar `import.meta.env.BASE_URL` no nav do `BaseLayout.astro`.**
- [x] **Fix: Atualizar conteúdo do `index.md`** — texto ainda referencia `src/content` e estrutura desatualizada.
- [x] Verificar regressão visual no `styleguide.md` após fixes de base path.
- [ ] Configuração de versionamento e release.
- [ ] Definir e automatizar a fonte de verdade da versão (`VERSION` + `package.json`).
- [ ] Exibir versão no site (dogfood de interpolacao de `VAULT_VERSION`).

### Fase 0.2.0: Experiência do Usuário (DX & UX)

*Foco: Template usável por terceiros.*

- [ ] GitHub Actions para inicialização do template (retirar arquivos e referências específicas do template, deixando apenas o necessário).
- [ ] Tutorial: Como configurar para uso do template.
- [ ] Tutorial: Como usar seu editor Markdown favorito com Git (compatibilidade com VS Code, Obsidian, iA Writer, etc).
- [ ] Temas/Layouts com foco em leitura.
- [ ] Suporte a Callouts/Admonitions.
- [ ] **Research:** Investigar `getImage()` do Astro para otimização de imagem em plugin remark (tentar resolver no Nível 0-1 sem migrar para MDX). Ver limitação documentada em `LIMITATIONS.md`.

### Fase 0.3.0: Evolução Astro (Progressive Disclosure)

*Foco: Abrir caminho para níveis avançados sem forçar migração.*

- [ ] Documentar caminho de migração `src/pages` → Content Collections.
- [ ] Extrair `remark-wiki-image-embeds` e `sync-assets` como pacotes npm independentes (plugins inline → dependências de config padrão).
- [ ] Exemplos de componentes customizados para "Artistas".
- [ ] Suporte a tags em Markdown.
- [ ] Graph View (opcional, desejável para Digital Gardens).

## Backlog (sem fase definida)

- **Research:** E-commerce simples via Markdown (persona Prestadora de Serviço).
- **Feat:** Dev Container para ambiente reprodutível.
- **Doc:** Rascunho do tutorial de setup do editor Markdown.

## Tarefas Imediatas

1. [x] Resolver todos os itens `Fix:` da Fase 0.1.0 (base path).
2. [x] Validar deploy funcional no GitHub Pages.
3. [x] Limpar conteúdo desatualizado (index.md, README.md).
4. [ ] Definir versao fonte de verdade e garantir sincronizacao (`VERSION` + `package.json`).
5. [ ] Dogfood: interpolar a versao no site (ex.: "Built by Astro Vault v{{VAULT_VERSION}}").
