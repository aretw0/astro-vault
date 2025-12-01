# BOOTSTRAP.md

Este arquivo serve para fazer o bootstrap deste repositório em branco, com apenas o git inicializado.

## Objetivo

Repositório template para "Jardim Digital" (Digital Garden) ou Blog, editável via Obsidian ou VSCode, contendo estrutura para publicar conteúdo estático no GitHub Pages usando o framework Astro.

## Visão Geral

Visualizo que a maior parte dos usuários deste template terá a mim como guia. No entanto, com boa documentação, eles devem ser capazes de seguir com as próprias mãos.

Acredito que uma boa base de Astro bem documentada servirá para evoluir o projeto para outros usos. Porém, o foco inicial é garantir que o público-alvo consiga se beneficiar do template sem fricção excessiva.

### Público-alvo

1. **O Desenvolvedor (Eu/Você)**
    * Perfil do GitHub, Portfólio, Blog técnico.
    * Sabe usar git, mas quer um setup pronto e eficiente.

2. **A Prestadora de Serviço (Ex: Manicure, Artesã)**
    * Quer presença online além do Instagram.
    * **Necessidade Crítica:** A interface administrativa será o **Obsidian**.
    * *Ação:* Precisamos de um tutorial focado em "Como configurar Obsidian + Git Plugin" para que ela nunca precise abrir um terminal.

3. **O Artista (Ex: Poeta)**
    * Quer liberdade visual e não quer ficar preso a layouts rígidos.
    * *Desafio:* O Astro permite essa flexibilidade? Precisamos validar se a customização via Markdown/Frontmatter é suficiente ou se precisaremos de componentes customizados fáceis de usar.

## Abordagem

Seguiremos uma abordagem incremental para evitar *over-engineering*:
**Spike -> SDD Simplificado -> (Dev Container) -> BDD/TDD**

### 1. Fase 0: Spike (Prova de Conceito)

Antes de qualquer documentação pesada, precisamos validar a integração técnica crítica.

* **Objetivo:** Renderizar uma nota do Obsidian contendo **Wikilinks (`[[nota]]`)** e **Imagens locais** dentro do Astro.
* *Por que?* Se isso for complexo demais, inviabiliza o uso para o público não-técnico.

### 2. SDD - Specification Driven Development (Simplificado)

Evitar a "burocracia de documentação". Focaremos em poucos arquivos vivos em `/docs`:

* `PRODUCT.md`: Visão, Personas e User Stories (O "Porquê" e "Para Quem").
* `TECHNICAL.md`: Arquitetura, Decisões de Design (Obsidian -> Astro) e Stack.
* `PLANNING.md`: Roadmap, Backlog e Tarefas imediatas.

*Na raiz:*

* `README.md`: Guia de início rápido.

### 3. Dev Container & Ambiente

Definir um ambiente reprodutível (Dev Container) apenas após validar o Spike, para garantir que outros devs possam colaborar sem "works on my machine".

### 4. Qualidade (BDD/TDD)

* **BDD:** Testes de aceitação para garantir que o fluxo "Escrever no Obsidian -> Push -> Site Atualizado" funcione.
* **TDD:** Testes unitários para lógicas complexas (ex: parsers de markdown customizados), se houver.

### Próximos Passos Imediatos (Checklist de Extinção)

Esta seção serve para guiar a **dissolução** deste arquivo `BOOTSTRAP.md` em documentos definitivos e código. Assim que esta lista for concluída, este arquivo deverá ser deletado.

1. [x] Criar `docs/PLANNING.md` com o backlog inicial.
2. [x] Migrar "Visão Geral" e "Público-alvo" para `docs/PRODUCT.md`.
3. [x] Migrar "Abordagem Técnica" para `docs/TECHNICAL.md`.
4. [ ] Executar o **Spike** da integração Obsidian-Astro (Inicializar Projeto).
5. [ ] Deletar `BOOTSTRAP.md`.
