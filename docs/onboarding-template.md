# Tutorial: Configurar o template

Este guia ajuda a configurar o Astro Vault e fazer o primeiro deploy.

## Objetivo

- Criar um repositorio baseado no template.
- Ajustar o base path para o GitHub Pages.
- Publicar o site com o primeiro push.

## Passo a passo

1. Crie um repositorio no GitHub usando este projeto como base.
2. Abra o repositorio localmente com GitHub Desktop.
3. Edite astro.config.mjs e localize a linha com o base path:

    ```js
    const base = isProd ? '/astro-vault' : '/';  // ← CHANGE THIS
    ```

    Substitua `'/astro-vault'` pelo nome do seu repositorio:

    ```js
    const base = isProd ? '/meu-portfolio' : '/';
    ```

4. Atualize src/pages/index.md com seu titulo e texto.
5. Faça Commit e Push.
6. Aguarde o deploy automatico do GitHub Pages.

**Importante:** O base path é automaticamente `/` no desenvolvimento local (voce acessa `localhost:4321/`) e muda para `/seu-repo` apenas no build de producao.

## Publicar sem rodar local

Se voce nao precisa rodar localmente, pode pular npm install.
O GitHub Actions faz build e deploy automaticamente no push.

## Rodar local (opcional)

Se quiser ver localmente:

```bash
npm install
npm run dev
```

## Proximo passo

Veja as convencoes de nomes e estrutura em conventions.md.
