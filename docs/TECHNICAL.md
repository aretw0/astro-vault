# Técnico

## Abordagem de Desenvolvimento

Seguiremos uma abordagem incremental para evitar *over-engineering*:
**Spike -> SDD Simplificado -> (Dev Container) -> BDD/TDD**

### 1. Fase 0: Spike (Prova de Conceito) - [CONCLUÍDO]

**Resultado:** Sucesso. A integração técnica foi validada e implementada.

#### Decisões Técnicas (ADR - Architecture Decision Record)

1. **Wikilinks:**
    * **Decisão:** Usar `remark-wiki-link`.
    * **Configuração:** `pageResolver` customizado para slugify (`Note A` -> `note-a`) e `hrefTemplate` apontando para `/vault/`.

2. **Imagens (`![[img]]`):**
    * **Problema:** Obsidian usa caminhos relativos/mágicos; Astro exige caminhos explícitos.
    * **Solução (Plugin):** Criamos `src/plugins/remark-obsidian-images.js` que transforma `![[img.png]]` em `![img](/vault-images/img.png)`.
    * **Solução (Sync):** Criamos uma Integração Astro (`src/integrations/sync-assets.js`) que copia recursivamente imagens de `src/content/vault` para `public/vault-images` antes do build.

3. **Namespacing de Assets:**
    * `public/assets/`: Reservado para assets manuais do site (logo, favicon). Versionado no Git.
    * `public/vault-images/`: Reservado para imagens sincronizadas do Obsidian. **Ignorado no Git** (pois a fonte da verdade é o `src/content/vault`).

### 2. SDD - Specification Driven Development (Simplificado)

Evitar a "burocracia de documentação". Focaremos em poucos arquivos vivos em `/docs`:

* `PRODUCT.md`: Visão, Personas e User Stories.
* `TECHNICAL.md`: Arquitetura, Decisões de Design e Stack.
* `PLANNING.md`: Roadmap, Backlog e Tarefas.

*Na raiz:*

* `README.md`: Guia de início rápido.

### 3. Dev Container & Ambiente

Definir um ambiente reprodutível (Dev Container) apenas após validar o Spike.

### 4. Qualidade (QA & Testing)

* **Style Guide (Kitchen Sink):**
  * Mantemos o arquivo `src/content/vault/StyleGuide.md` (antigo Spike) como uma "Nota Mestra" de teste.
  * **Objetivo:** Teste de Regressão Visual. Sempre que alterarmos CSS ou Layouts, verificamos essa nota para garantir que imagens, links e formatações complexas continuam funcionando.
* **BDD:** Testes de aceitação para garantir que o fluxo "Escrever no Obsidian -> Push -> Site Atualizado" funcione.
* **TDD:** Testes unitários para lógicas complexas.
