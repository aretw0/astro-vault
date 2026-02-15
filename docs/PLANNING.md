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
  - `v0.2.0` = Sintaxes e Convenções (callouts, getImage research)
  - `v0.3.0` = Visual e Leitura (temas, SEO, meta tags)
  - `v0.4.0` = Documentação e Onboarding (tutoriais, FAQ)
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
- [x] Verificar regressão visual no `styleguide.md` após fixes de base path.
- [x] Configuração de versionamento e release (ADR-06: VERSION como fonte de verdade).
- [x] Definir e automatizar a fonte de verdade da versão (`VERSION` + `package.json`).
- [x] Exibir versão no site (dogfood de interpolação em `BaseLayout.astro`).

### Fase 0.2.0: Sintaxes e Convenções

*Foco: Expandir suporte a sintaxes Markdown abertas e melhorar acessibilidade de conteúdo.*

- [ ] Suporte a Callouts/Admonitions (sintaxe compatível com Obsidian, Quartz, etc.).
- [ ] **Research:** Investigar `getImage()` do Astro para otimização de imagem em plugin remark (tentar resolver no Nível 0-1 sem migrar para MDX). Ver limitação documentada em `LIMITATIONS.md`.
- [ ] Documentar sintaxes suportadas em página dedicada (wikilinks, image embeds, callouts).

### Fase 0.3.0: Visual e Experiência de Leitura

*Foco: Melhorar a experiência visual do site.*

- [ ] Temas/Layouts com foco em leitura (tipografia, espaçamento, dark mode refinado).
  - [ ] Layout de blog (opcional, desejável para Digital Gardens).
  - [ ] Layout de portfólio (opcional, desejável para Artistas).
  - [ ] Verificar como separar estilos globais de temas específicos (ex: blog) para não poluir o CSS base.
  - [ ] Verificar impacto de temas mais complexos na simplicidade do template (ex: blog com sidebar vs layout mais simples).
  - [ ] Dark mode: avaliar se o toggle deve ser global ou por tema (ex: blog pode ter dark mode, mas portfólio não).
  - [ ] Verificar necessidade de configuração adicional para temas (ex: frontmatter para escolher tema por página).
  - [ ] Garantir que temas não quebrem a simplicidade do setup (ex: tema deve ser opcional e fácil de aplicar).
  - [ ] Documentar como usar temas e criar novos temas (ex: criar um tema customizado para portfólio).
  - [ ] Testar temas com diferentes tipos de conteúdo (texto, imagens, callouts) para garantir consistência visual.
  - [ ] Verificar performance dos temas (ex: evitar temas com muitos assets ou scripts que possam impactar o tempo de carregamento).
  - [ ] Considerar acessibilidade nos temas (contraste, legibilidade, navegação por teclado).
  - [ ] Verificar compatibilidade dos temas com diferentes navegadores e dispositivos.
  - [ ] Criar um tema base minimalista que possa ser customizado facilmente (ex: tema com variáveis CSS para cores e fontes).
  - [ ] Avaliar se os temas devem ser parte do template ou se devem ser pacotes separados (ex: `astro-vault-theme-blog`).
  - [ ] Documentar processo de criação de temas para incentivar contribuições da comunidade.
  - [ ] Criar exemplos de temas para diferentes casos de uso (blog, portfólio, digital garden).
  - [ ] Verificar se os temas podem ser aplicados globalmente ou por página (ex: frontmatter para escolher tema).
- [ ] Quebra de linha e formatação de código melhoradas.
- [ ] Meta tags para SEO básico.
- [ ] Open Graph tags para compartilhamento.

### Fase 0.4.0: Documentação e Onboarding

*Foco: Preparar usuários para usar o template.*

- [ ] Tutorial: Como usar seu editor Markdown favorito com Git (compatibilidade com VS Code, Obsidian, iA Writer, etc).
- [ ] Tutorial: Como configurar para uso do template.
- [ ] Documentar convenções de nomes de arquivos e estrutura de pastas.
- [ ] FAQ sobre limitações e progressão de níveis.

### Fase 1.0.0: Template Público

*Foco: Tornar o template usável por terceiros com automação de inicialização.*

- [ ] GitHub Actions para inicialização do template (retirar arquivos e referências específicas do template, deixando apenas o necessário).
- [ ] Estudar o [`aretw0/template-initializer`](https://github.com/aretw0/template-initializer) para automação de setup. Obs.: vault-seed faz uso do `template-initializer` para criar repositórios personalizados a partir do template.
- [ ] Validação final de todos os fluxos (clone → edit → push → deploy).
- [ ] Release notes e changelog estruturado.
- [ ] Anúncio público do template.

### Fase 2.0.0: Evolução Astro (Progressive Disclosure)

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
4. [x] Definir versão fonte de verdade e garantir sincronização (`VERSION` + `package.json`).
5. [x] Dogfood: interpolar a versão no site ("Built with Astro Vault v{version}").
6. [ ] Definir primeiro item da Fase 0.2.0 para iniciar.
