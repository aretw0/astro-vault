# RFC: Ecossistema e Root Workspace (Zero Fricção)

**Status:** Rascunho / Discussão
**Objetivo:** Consolidar a arquitetura em torno da experiência de "Fricção Cognitiva Zero", o Schema declarativo (Everything as Code), a integração com o Loam e a busca por um novo Branding para a CLI/Produto.

---

## 1. O Paradigma do Root Workspace (Nível 0)

A experiência inicial ideal deve assemelhar-se à simplicidade do Jekyll ou MkDocs: o usuário interage apenas com seus arquivos `.md` na **raiz** do projeto (ou pastas não-reservadas), sem se deparar com estruturas de framework (`src/pages`, `package.json`, etc.).

### Implementação Pragmática: Astro 5 Content Layer API

* Não usaremos "ocultação escalonada" (copiar arquivos dinamicamente para uma pasta `.vault`).
* Em vez disso, usaremos a **Content Layer API** do Astro. O servidor (empacotado na nossa futura CLI) rodará a partir do diretório atual (`process.cwd()`), com um Loader configurado para varrer a raiz do usuário e gerir esses arquivos em memória.
* Isso garante performance, ausência de dados duplicados e total respeito ao ambiente local do usuário.

---

## 2. Branding: Em Busca de Identidade (Brainstorming)

Dado que **Loam** (solo fértil) é a engine de persistência, e **Astro-Vault** carregava o peso de "Vault" (conflito de namespace/genérico demais), qual é o nome do *Cultivador* ou do *Jardim* em si?

Categorias de inspiração:

### 2.1. Metáforas Botânicas (Trabalhando com o "Loam")

* **Arbour / Arbor**: Uma estrutura que suporta o crescimento (como o framework suporta o conteúdo).
* **Greenhouse (Estufa)**: Reflete "segurança, ambiente controlado e crescimento" para as ideias.
* **Seedbed**: O viveiro onde as ideias começam.
* **Flora**: Elegante, direto ao ponto sobre jardim.

### 2.2. O Conceito "Digital Garden" Direto

* **DGN (Digital Garden Node)**: Como você sugeriu, curto, hackable, forte para C-Level e Devs. O CLI seria `dgn dev`.
* **GardenLab**: Experimental, onde as ideias nascem.
* **FolioGarden**: Uma mistura de portfólio de notas.

*Ação pendente:* Escolher o nome oficial para cunhar a extensão dos arquivos e o binário da CLI. Por enquanto, usaremos `<BRAND>` como placeholder.

---

## 3. Schema-First Design: A Configuração Literada (`<BRAND>.yaml` ou `loam.yaml`)

Se queremos esconder `astro.config.mjs`, entregamos uma interface declarativa ("Everything as Code"). Este schema é consumido e interpretado pela nossa CLI.

```yaml
# loam.yaml ou dgn.yaml
# Tudo deve possuir defaults pragmáticos. O arquivo serve apenas para sobreposições.

site:
  title: "Meu Jardim Digital"
  description: "Notas e aprendizados abertos"
  url: "https://meusite.com"
  theme: "auto" # dark | light | auto
  lang: "pt-BR"

features:
  backlinks: true     # Liga os nós do grafo via metadados do Loam
  search: true        # Gera índice para o frontend (pagefind, etc)
  wikilinks: true     # Mantém o remark parseando [[links]]

# Personalização direta (esconde a complexidade do remark-callouts)
callouts:
  success: { color: "#00e676", icon: "✅" }
  idea:    { color: "#ffeb3b", icon: "💡" }

# Rampa para o Nível 2 (Powerhouse)
advanced:
  eject_mode: false # Se true, alerta a CLI que o usuário fez 'eject' e o astro.config local toma controle
```

---

## 4. Convergência: Loam como Motor de Inteligência e Cache

O frontend de um Digital Garden precisa de relacionamentos (ex: quais arquivos linkam para este?). Fazer o Astro escanear milhares de arquivos no runtime pesaria a arquitetura.

Felizmente, o **Loam** já implementa indexação de alta performance baseada em Modified Time (`mtime`) em sua arquitetura de cache (`.loam/index.json` referenciado no ADR-007 do Loam).

### A Coerência Técnica

1. **CLI / Watcher**: A <BRAND> CLI roda em background e invoca o motor do Loam.
2. **Índice Rápido**: O Loam mantém o `.loam/index.json` hiper-atualizado quando os `.md` mudam. O Loam gera os metadados agregados (ex: array de backlinks).
3. **Consumo Astro**: O Astro (via Loader na Content Layer) apenas lê os estados em memória ou lê o próprio `index.json` construído pelo Loam. Toda a inteligência de indexação rica sai do Astro (TypeScript/Node lento) e vai pro Loam (Go rápido).
4. **Nível 0 Poderoso**: Isso resulta num site estático com as relações ricas do Flowershow, mas sem bancos de dados rodando ativamente (Postgres, MinIO).
