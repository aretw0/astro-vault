# Estratégia de Testes

O Astro Vault adota uma pirâmide de testes pragmática para garantir a estabilidade do template sem criar fricção para o usuário final.

O objetivo principal não é apenas cobrir código, mas **garantir determinismo** em um ambiente (Astro + Remark + Markdown) que pode ser volátil durante o desenvolvimento.

## 1. Testes Unitários e de Integração (Vitest)

**Foco:** Lógica de plugins Remark e scripts de build.

Como o Astro utiliza Hot Module Replacement (HMR) que nem sempre recarrega plugins Remark corretamente, os testes unitários são a **única forma confiável** de desenvolver novas sintaxes Markdown.

* **Ferramenta:** [Vitest](https://vitest.dev/)
* **Localização:** `tests/*.test.mjs`
* **Comando:** `npm run test`
* **O que testamos:**
  * Transformações AST (Markdown → HTML) dos plugins `remark-callouts`, `remark-wiki-image-embeds`.
  * Integração com opções de configuração (ex: cores customizadas de callouts).
  * Lógica de `sync-assets.js` e tratamento de caminhos.

**Exemplo de fluxo de desenvolvimento:**

1. Escrever um caso de teste falho para uma nova sintaxe (ex: `> [!tip]`).
2. Implementar a lógica no plugin.
3. Ver o teste passar em <500ms.
4. Só então subir o servidor Astro para verificação visual.

## 2. Testes de Regressão Visual (Manual/Snapshot)

**Foco:** Garantir que o CSS e o Layout não quebram o conteúdo existente.

* **Ferramenta:** Página `src/pages/styleguide.md` (Kitchen Sink).
* **O que testamos:**
  * Essa nota mestra contém todos os elementos suportados (callouts, imagens, links, código).
  * Antes de qualquer release, o desenvolvedor deve acessar `/styleguide` e verificar se tudo renderiza conforme esperado.
* **Futuro (Nível 2):** Implementar Playwright para snapshots visuais automatizados.

## 3. Integração Contínua (CI)

Utilizamos GitHub Actions para garantir que nenhum commit quebrado entre na `main`.

* **Workflow:** `.github/workflows/test.yml`
* **Triggers:**
  * `push` na branch `main`.
  * `pull_request` visando a branch `main`.
  * **Otimização:** Concorrência configurada para cancelar builds redundantes se novos commits forem enviados rapidamente.
* **Jobs:**
  * `unit-tests`: Roda `npm run test`.
  * `build`: Roda `npm run build` para garantir que o site compila sem erros (verifica links quebrados, paths inválidos).

---

## Guia de Execução Local

```bash
# Rodar todos os testes uma vez
npm run test

# Rodar em modo watch (desenvolvimento de plugins)
npm run test:watch
```
