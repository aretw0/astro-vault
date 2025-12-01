# Técnico

## Abordagem de Desenvolvimento

Seguiremos uma abordagem incremental para evitar *over-engineering*:
**Spike -> SDD Simplificado -> (Dev Container) -> BDD/TDD**

### 1. Fase 0: Spike (Prova de Conceito)

Antes de qualquer documentação pesada, precisamos validar a integração técnica crítica.

* **Objetivo:** Renderizar uma nota do Obsidian contendo **Wikilinks (`[[nota]]`)** e **Imagens locais** dentro do Astro.
* *Por que?* Se isso for complexo demais, inviabiliza o uso para o público não-técnico.

### 2. SDD - Specification Driven Development (Simplificado)

Evitar a "burocracia de documentação". Focaremos em poucos arquivos vivos em `/docs`:

* `PRODUCT.md`: Visão, Personas e User Stories.
* `TECHNICAL.md`: Arquitetura, Decisões de Design e Stack.
* `PLANNING.md`: Roadmap, Backlog e Tarefas.

*Na raiz:*

* `README.md`: Guia de início rápido.

### 3. Dev Container & Ambiente

Definir um ambiente reprodutível (Dev Container) apenas após validar o Spike.

### 4. Qualidade (BDD/TDD)

* **BDD:** Testes de aceitação para garantir que o fluxo "Escrever no Obsidian -> Push -> Site Atualizado" funcione.
* **TDD:** Testes unitários para lógicas complexas.
