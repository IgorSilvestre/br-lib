# br-lib

It's a simple package, just to be used as a utils, there are some functions that many projects need such as a strong regex, parse ISO Dates to Brazilian standard, check if a CNPJ is valid, etc.


É um pacote simples, apenas para ser usado como utilitários. Existem algumas funções que muitos projetos precisam, como um regex forte, converter datas ISO para o padrão brasileiro, verificar se um CNPJ é válido, etc.


**Add the repo as a dependency to your package.json**

Adicione o repositório como dependencia em seu package.json
```bash
"br-lib": "https://github.com/IgorSilvestre/br-lib.git",
```
––––––––––––––––
**Install**

Bun
```bash
bun install
```
NPM:
```bash
npm install
```
Yarn:
```bash
yarn
```


––––––––––––––––
**Testing**
```bash
bun test
```

**If you want to use any function just import it to your project. There are no default imports so you'll need to import it as the same name:**

Se você quiser usar alguma função, basta importá-la para o seu projeto. Eu não faço importações padrão, então você precisará importá-la com o mesmo nome
```javascript
import { function } from 'br-lib'
```

Issues are good but PRs are better =) (Don't break the tests)

Issues são bons mas PRs são melhores (Não quebrem os testes)
