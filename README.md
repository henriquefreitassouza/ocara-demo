# Ocara - A praça da Taba

## Introdução

A Ocara é uma rede social que promove encontros entre pessoas com uma paixão em comum: **a leitura**. Este projeto é a materialização de uma *spinoff* fictícea da [A Taba](https://www.ataba.com.br), empresa que faz curadoria de livros infanto juvenis e que possui um clube de livros por assinatura.

A Taba é uma palavra do Tupi que significa **aldeia**. A empresa possui este nome pois acredita que, para formar leitores, é necessário uma aldeia de pessoas que leem.

Ocara também é uma palavra do Tupi, que significa centro da taba, ou centro da aldeia. Se a aldeia é o ambiente de incentivo a formação de leitores, o centro da aldeia é o centro deste ambiente estimulante. É neste local, ou **praça**, que se encontram o que A Taba acredita serem os três agentes necessários para formar leitores: o **livro**, o **leitor** e a **leitura**.

A Ocara é um espaço que traz as emoções de uma feira literária para dentro do mundo digital. Nesta feira digital, pessoas leitoras são convidadas a ingressarem em clubes de leitura e a compartilharem suas experiências com os livros que estão lendo, ou a descobrirem novas paixões literárias.

A Ocara existe para estimular conversas sobre livros, pois são estas conversas que estimulam o nascimento de novos leitores.

## Sobre este repositório

```
ocara-demo
├── app
├── docs
├── .git
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
├── README.md
└── web
```

O projeto está organizado em dois grandes projetos, aqui chamados de **módulos**:
- [Web](https://github.com/henriquefreitassouza/ocara-demo/tree/main/web): é a interface da Ocara. Este módulo serve o conteúdo do site para os visitantes e faz a gestão da comunicação com o App.
- [App](https://github.com/henriquefreitassouza/ocara-demo/tree/main/app): é o controlador de dados da Ocara. Este módulo administra os pedidos de acesso a dados e faz as entregas conforme cada pedido.

O repositório que agrupa os módulos é, também, um pacote, mas não possui dependências.

Na pasta `docs` estão guardadas as imagens usadas para a construção das documentações neste arquivo e nos arquivos `README.md` dos módulos.

A pasta `.git` e o arquivo `.gitignore` existem apenas no ambiente local.

Para iniciar o projeto em sua máquina local, é necessário que você tenha instalado em sua máquina os seguintes softwares:
- Node.js 16+
- NPM 8+
- Git

Com as ferramentas instaladas, basta clonar este repositório com `git clone`, entrar nas pastas de cada módulo e fazer a instalação dos pacotes utilizados pelos módulos com o comando `npm install`. Cada módulo precisa de seu próprio arquivo de configuração de variáveis de ambiente, e as instruções para a instalação de cada um se encontram em seus diretórios raizes.

## Arquitetura

Cada módulo vive em seu próprio diretório dentro deste repositório e a administração de cada um é feito de maneira independente. Esta é uma arquitetura **monorepo**. Este repositório está conectado ao Heroku, serviço de gestão de apps em nuvem. O Heroku foi configurado para reconhecer a arquitetura monorepo e fazer o *deploy* de cada módulo em sua respectiva máquina, ou **dyno**.

![Arquitetura de desenvolvimento e deploy da Ocara](/docs/ocara-1-architecture-design.png)

### Configuração do repositório

O arquivo `package.json` possui três scripts, responsáveis por informar ao Heroku qual módulo deve ser colocado em qual dyno:
- **postinstall**: executa um comando em shell script que verifica a existência de duas variáveis de ambiente, `$CLIENT_ENV` e `$SERVER_ENV` e, com base na existência de uma ou de outra, comanda a execução dos scripts de inicialização dos módulos nos dynos do Heroku, `postinstall-web` e `postinstall-app`;
- **postinstall-web**: entra na pasta web, faz a instalação dos pacotes necessários para o funcionamento do módulo e gera os arquivos para o ambiente de produção;
- **postinstall-app**: entra na pasta app e faz a instalação dos pacotes necessários para o funcionamento do módulo.

### Configuração do Heroku

O Heroku possui dois dynos criados, um para cada módulo:
- **ocara-api**: hospeda o módulo App;
- **ocara-app**: hospeda o módulo Web.

Cada módulo possui dois **buildpacks**, scripts que são executados logo após o *deploy* de um app:
- **heroku-buildpack-multi-procfile**: permite a configuração de múltiplos apps em um único repositório;
- **heroku/nodejs**: configura o ambiente da máquina como sendo um ambiente Node.

Dentro de raiz de cada módulo no repositório do Github existe um arquivo chamado `Procfile`, contendo comandos que são executados após a configuração dos dynos no Heroku. Cada dyno possui uma variável de ambiente chamada `PROCFILE` que referencia o diretório de localização do Procfile.

## Deploy e demonstração

A aplicação pode ser acessada por este endereço: [https://ocara-app.herokuapp.com](https://ocara-app.herokuapp.com/).

## E agora?

Acesse os repositórios dos módulos para acessar suas respectivas documentações.
- [Web](https://github.com/henriquefreitassouza/ocara-demo/tree/main/web)
- [App](https://github.com/henriquefreitassouza/ocara-demo/tree/main/app)
