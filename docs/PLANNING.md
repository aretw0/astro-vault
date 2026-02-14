# Planning

Este documento centraliza o Roadmap, Backlog e Tarefas do projeto Astro Vault.

**Premissa:** Progressividade. Cada fase entrega valor completo no nível atual antes de avançar.

## Roadmap

### Fase 0: Validação Técnica (Spike) — CONCLUÍDA

*Foco: Garantir que a integração Obsidian → Astro é viável sem hacks excessivos.*

- [x] Validar renderização de Wikilinks (`[[nota]]`) no Astro.
- [x] Validar renderização de imagens locais (`![[imagem.png]]`) no Astro.
- [x] Definir stack de plugins (remark/rehype) necessária.
- [x] Implementar "Smart Asset Sync" (apenas imagens usadas).
- [x] Arquitetura "Pages as Content" (simplicidade).

### Fase 1: MVP — EM ANDAMENTO

*Foco: Site no ar, funcional, editável pelo Obsidian.*

- [x] Setup inicial do Astro (template básico).
- [x] Configuração do GitHub Actions para deploy no Pages.
- [x] **Fix: Configurar `site` e `base` em `astro.config.mjs`** para que links funcionem no GitHub Pages (ver ADR-05 em TECHNICAL.md).
- [x] **Fix: Propagar `base` para wikilink `hrefTemplate` e `remark-obsidian-images`.**
- [x] **Fix: Usar `import.meta.env.BASE_URL` no nav do `BaseLayout.astro`.**
- [x] **Fix: Atualizar conteúdo do `index.md`** — texto ainda referencia `src/content` e estrutura desatualizada.
- [ ] Verificar regressão visual no `styleguide.md` após fixes de base path.
- [ ] Configuração de versionamento e release.

### Fase 2: Experiência do Usuário (DX & UX)

*Foco: Template usável por terceiros.*

- [ ] GitHub Actions para inicialização do template (retirar arquivos e referências específicas do template, deixando apenas o necessário).
- [ ] Tutorial: Como configurar para uso do template.
- [ ] Tutorial: Como configurar Obsidian + Git Plugin (persona prestadora de serviço).
- [ ] Temas/Layouts com foco em leitura.
- [ ] Suporte a Callouts/Admonitions do Obsidian.

### Fase 3: Evolução Astro (Progressive Disclosure)

*Foco: Abrir caminho para níveis avançados sem forçar migração.*

- [ ] Documentar caminho de migração `src/pages` → Content Collections.
- [ ] Exemplos de componentes customizados para "Artistas".
- [ ] Suporte a tags do Obsidian.
- [ ] Graph View (opcional, desejável para Digital Gardens).

## Backlog (sem fase definida)

- **Research:** E-commerce simples via Markdown (persona Prestadora de Serviço).
- **Feat:** Dev Container para ambiente reprodutível.
- **Doc:** Rascunho do tutorial de setup do Obsidian.

## Tarefas Imediatas

1. [ ] Resolver todos os itens `Fix:` da Fase 1 (base path).
2. [ ] Validar deploy funcional no GitHub Pages.
3. [ ] Limpar conteúdo desatualizado (index.md, README.md).
