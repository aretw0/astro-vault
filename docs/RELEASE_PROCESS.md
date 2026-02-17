# Processo de Release e Versionamento

Este documento detalha como as releases são geradas, versionadas e publicadas no Astro Vault. Seguimos uma filosofia de "Jardinagem Digital", onde cada release representa uma "colheita" madura e documentada do nosso conhecimento e código.

## 1. Filosofia: O Ciclo da Colheita

No Astro Vault, o conhecimento não é estático. Versionar não é apenas mudar um número, é mapear a evolução do jardim.

- **Commits:** São as ações diárias de jardinagem (plantar, podar, regar).
- **Releases:** São as colheitas. Momentos em que o progresso é consolidado, etiquetado e compartilhado.

## 2. Padrões de Versionamento

### Versionamento Semântico (SemVer)

Adotamos o formato `MAJOR.MINOR.PATCH`:

- **MAJOR (X.0.0):** Mudanças que quebram a compatibilidade ou alteram radicalmente a filosofia do projeto.
- **MINOR (0.Y.0):** Novas funcionalidades (ex: novos plugins, novos layouts) de forma retrocompatível.
- **PATCH (0.0.Z):** Correções de bugs e ajustes finos que não alteram o uso geral.

> **Nota sobre v0.x.y:** Durante a fase de MVP (Fase 1), as versões seguem a lógica de "estabilidade incremental". Versões `0.x` representam marcos de funcionalidades no Roadmap.

### Conventional Commits

Para automatizar o `CHANGELOG.md`, usamos mensagens de commit padronizadas:

- `feat:` Novos recursos (gera seção no changelog).
- `fix:` Correções de bugs (gera seção no changelog).
- `refactor:` Mudanças no código que não alteram comportamento (gera seção no changelog).
- `docs:` Alterações apenas em documentação.
- `chore/style/test:` Manutenção, formatação ou testes.

## 3. Fluxo de Release (Padrão)

O processo é automatizado usando `standard-version`, tendo o arquivo `VERSION` como fonte de verdade (conforme [ADR-06](./TECHNICAL.md#adr-06-versionamento-via-arquivo-version)).

### Passo 1: Simulação (Dry Run)

Sempre execute uma simulação antes para verificar qual será a próxima versão e como ficará o changelog:

```bash
npm run release:dry
```

### Passo 2: Execução Local

Se o dry-run estiver correto, gere a release:

```bash
npm run release
```

Isso irá:

1. Analisar os commits desde a última tag.
2. Incrementar a versão no arquivo `VERSION` e `package.json`.
3. Atualizar o `CHANGELOG.md`.
4. Criar um commit de release: `chore(release): vX.Y.Z`.
5. Criar uma tag Git local: `vX.Y.Z`.

### Passo 3: Publicação

Envie as alterações e a tag para o GitHub:

```bash
git push --follow-tags origin main
```

**O que acontece depois:**

- **GitHub Release:** O workflow `release.yml` extrai as notas do `CHANGELOG.md` e cria a release oficial.
- **Site Deploy:** O workflow `deploy.yml` é acionado **apenas pela tag**. Isso garante que o site público reflita apenas versões estáveis (colheitas), enquanto o `main` serve para o histórico de trabalho.
- O site será atualizado automaticamente em `https://aretw0.github.io/astro-vault/`.

### Passo 4: Deploys Ad-hoc (Opcional)

Graças à nossa orquestração dinâmica, você pode disparar deploys para destinos diferentes sem mudar o código:

1. Vá em **Actions** > **Deploy to GitHub Pages**.
2. Clique em **Run workflow**.
3. Preencha `site` (ex: `https://meu-dominio.com`) e `base` (ex: `/`).
4. Clique em **Run workflow**.

Isso usará as variáveis `ASTRO_SITE` e `ASTRO_BASE` injetadas no ambiente de build para gerar os links corretos.

## 4. Nuances e Lições Aprendidas (via vault-seed)

### O "Release Gate" (Guarda de Release)

Evite criar "releases vazias". Se não houver commits do tipo `feat`, `fix` ou `refactor` desde a última versão, o `standard-version` pode não ter o que documentar. Verifique sempre o `release:dry` para garantir que a colheita tem "sabor".

### Processo de Recuperação (Undo Release)

Se uma release for gerada por erro:

1. **Remover Tag Local:** `git tag -d vX.Y.Z`
2. **Remover Tag Remota:** `git push --delete origin vX.Y.Z`
3. **Desfazer Commit:** `git revert HEAD` (ou `git reset --hard HEAD~1` se ainda não deu push do commit).
4. **Limpeza no GitHub:** Exclua a release manualmente na interface do GitHub se o workflow já tiver rodado.

### Fallback Manual (Se o CI Falhar)

Se o workflow automático de release falhar, você pode criar uma release manualmente via GitHub CLI:

```bash
# Extrair notas do changelog (exemplo simplificado)
VERSION=$(cat VERSION)
NOTES=$(awk '/^###? / && c++>0 {exit} c>0 {print}' CHANGELOG.md)
gh release create "v$VERSION" --title "v$VERSION" --notes "$NOTES"
```

## 5. Configuração Inicial do GitHub Pages (Cold Boot)

Na **primeira vez** que você configura o repositório, é necessário ajustar as configurações do GitHub para permitir deploys automatizados via tags.

### Passo 1: Configurar Source do GitHub Pages

1. Acesse **Settings** > **Pages** no repositório
2. Em **Build and deployment** > **Source**, selecione: **GitHub Actions**
   - ⚠️ **Não** use "Deploy from a branch" - isso ignora os workflows

### Passo 2: Configurar Proteção de Ambiente

O ambiente `github-pages` é criado automaticamente pelo GitHub, mas vem com regras de proteção que **bloqueiam deploys de tags** por padrão.

1. Acesse **Settings** > **Environments** > **github-pages**
2. Em **Deployment branches and tags**, configure:
   - ✅ **Selected branches and tags**
   - Adicione regra: **Tags** matching pattern `v*`
3. (Opcional) Remova a regra que permite deploy da branch `main` se quiser que **apenas** releases estáveis (tags) atualizem o site público

### Por Que Isso É Necessário?

O workflow `deploy.yml` está configurado para disparar **apenas em tags** (`v*`), garantindo que o site público reflita somente versões estáveis. Se o ambiente não permitir tags, você verá o erro:

```
Tag "v0.1.0" is not allowed to deploy to github-pages due to environment protection rules.
```

**Após esta configuração inicial, todos os deploys futuros serão automáticos.**

## 6. Manutenção da Independência (ADR-06)

Lembre-se: O versionamento do **conteúdo** (o seu jardim) é o que importa. Mantemos o arquivo `VERSION` isolado para que você possa versionar suas notas sem depender necessariamente das complexidades do `package.json`, embora o processo de release atual os sincronize para manter a saúde do ecossistema Astro.
