# BOOTSTRAP.md

Esse arquivo servei para fazer o bootstrap desse repositório em branco, com apenas o git inicializado.

## Objetivo

Repositório template para caixa de notas, que deve ser editada via obsidian ou vscode, contendo estrutura para publicar conteúdo estático no github pages usando o framework Astro.

## Visão Geral

Visualizo que a maior parte do usuários desse template terá a mim como seu guia nesse mundo de facilidades que vem a partir de um repositório git, no entanto, com boa documentação eles podem facilmente seguir com as próprias mãos.

De toda forma, acredito que uma boa base de astro bem documentada vai servir para evoluir o projeto para outros usos. No entanto, para esse início, devemos nos concentrar para que o público-alvo inicial seja capaz de se beneficiar do template.

### Público-alvo inicial

1. Usuário que gostaria de ter um perfil online no seu namespace de usuário do github.
    - Perfil do github.
    - Portfólio online.
    - Blog pessoal.
    - Geralmente desenvolvedor, mas não assumir que é.

2. Prestadora de serviço (manicure, cabelereira, e etc) que gostaria de ter uma presença online para suas produção que no momento são postadas apenas no instagram.

    - Uma pessoa que demoraria a encontrar as formas de customizar, mas deve encontrar algo que goste logo.
    - Possível interessado em evoluir o projeto para incluir seu e-commerce (carece de pesquisa para saber as limitações do github pages).

3. Usuário que gostaria de ter uma presença online para suas poesias que no momento são postadas apenas no instagram.
    
    - Uma pessoa como essa rapidamente iria atrás de customizar o template, e não gosta de ficar presa a algo que limitasse a sua expressão diagramática. Ou seja, precisamos acertar na documentação de como atingir certos efeitos mais específicos no texto escrito, dando a liberdade pro artista brincar. Conseguimos isso com o Astro? É algo que precisamos confirmar.

## Abordagem

Devemos seguir a abordagem: SDD -> BDD -> TDD -> OUTROS.

### SDD - Specification Driven Development

Especificações necessárias em arquivos markdown:

- Na raiz:
    - README.md
    - AGENTS.md

- Em `/docs`:
    - USER_STORIES.md
    - PRODUCT.md
    - SPECS.md
    - DESIGN.md
    - ARCHITECTURE.md
    - TESTING_STRATEGY.md
    - ROADMAP.md
    - TASKS.md

### BDD - Behavior Driven Development

Definir qual ambiente declarativo de BDD para a execução de testes de aceitação.

### TDD - Test Driven Development

Definir qual ambiente declarativo de TDD para a execução de testes unitários.

### OUTROS

Nesse ponto devemos nos concentrar em deixar uma boa documentação desse projeto garantindo a comunicação do mesmo. Podemos nos usufruir do próprio github pages para publicar a documentação do projeto.
