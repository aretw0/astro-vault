# Planning

Este documento centraliza o Roadmap, Backlog e Tarefas do projeto Astro Vault.

## Roadmap

### Fase 0: Validação Técnica (Spike)

*Foco: Garantir que a integração Obsidian -> Astro é viável sem hacks excessivos.*

- [x] Validar renderização de Wikilinks (`[[nota]]`) no Astro.
- [x] Validar renderização de imagens locais (`![[imagem.png]]`) no Astro.
- [x] Definir stack de plugins (remark/rehype) necessária.

### Fase 1: MVP (Minimum Viable Product)

*Foco: Um site no ar, editável pelo Obsidian.*

- [ ] Setup inicial do Astro (template básico).
- [ ] Configuração do GitHub Actions para Deploy no Pages.
- [ ] Tutorial "Como configurar Obsidian + Git" (para a Persona Não-Técnica).

### Fase 2: Experiência do Usuário (DX & UX)

*Foco: Melhorar a aparência e a facilidade de uso.*

- [ ] Temas/Layouts (foco em leitura).
- [ ] Suporte a Callouts/Admonitions do Obsidian.
- [ ] Componentes customizados para "Artistas" (se validado).

## Backlog

### Prioridade Alta (Imediato)

- **Spike:** Criar repo de teste ou branch para validar `obsidian-to-astro`.
- **Doc:** Escrever rascunho do tutorial de setup do Obsidian.

### Prioridade Média

- **Feat:** Adicionar suporte a tags do Obsidian como categorias no Astro.
- **Feat:** Criar página de "Graph View" (opcional, mas desejável para Digital Gardens).

### Prioridade Baixa

- **Research:** E-commerce simples via Markdown (para a Persona Prestadora de Serviço).

## Tarefas Atuais

1. [ ] Executar Fase 1: MVP (Limpeza, Layout, Estilos).
