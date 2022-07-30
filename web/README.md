# Ocara - Web

## Introdução

O módulo Web é o que os visitantes do site enxergam. É o conjunto de telas e transições que entregam a experiência proposta. Este módulo consome dados entregues pelo módulo App e os disponibiliza aos visitantes.

Ele foi criado usando [React](https://reactjs.org/) 18.0.0 e estilizado com a biblioteca [Tailwind](https://tailwindcss.com/) 3.0.24.

## Arquitetura

### Estrutura de pastas e arquivos

```
web
├── .env
├── .gitignore
├── jsconfig.json
├── package.json
├── package-lock.json
├── postcss.config.js
├── Procfile
├── public
│   ├── favicon.png
│   ├── images
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   ├── components
│   ├── contexts
│   ├── hooks
│   ├── index.jsx
│   ├── pages
│   ├── routes
│   └── utils
└── tailwind.config.js
```

Além da estrutura básica do React, com as pastas `src` e `public`, os seguintes arquivos foram criados:
- **.env**: guarda variáveis de ambiente;
- **.jsconfig.json**: possui uma configuração para utilizar o diretório `src` como padrão ao referenciar arquivos;
- **postcss.config.js**: informa ao pacote PostCSS os plugins que deve carregar;
- **Procfile**: informa ao Heroku como inicializar este módulo;
- **README.md**: este arquivo de documentação;
- **tailwind.config.js**: informa ao Tailwind onde estão os arquivos com estilos CSS e configura o tema do módulo.

Dentro da pasta `src` vive a aplicação, que está organizada da seguinte maneira:
- **index.jsx**: inicia o app;
- **App.jsx**: inicia o orquestrador de rotas e os contextos;
- **assets**: guarda fontes e imagens estáticas;
- **components**: guarda os componentes;
- **contexts**: guarda os contextos;
- **hooks**: guarda os hooks;
- **pages**: guarda as páginas, compostas por seções, que são combinações de componentes em layouts específicos;
- **routes**: guarda as rotas e o orquestrador de rotas;
- **utils**: guarda funções utilitárias.

### Relacionamento entre as partes do módulo

![Arquitetura de desenvolvimento e deploy da Ocara](/docs/ocara-2-react-app-design.png)

Ao iniciar, o app chama o **orquestrador de rotas**, que serve as páginas conforme os endereços requisitados. Cada página é representada por uma rota, que fica dentro da pasta `routes`. Cada rota serve uma **página** do diretório `pages`. Páginas são formadas por **seções** e cada seção possui um diretório dentro da página a qual pertence. Uma seção faz uso de um ou mais **componentes**, que ficam dentro do diretório `components`.

Componentes e seções podem fazer uso de **hooks** e **contextos** para terem acesso a dados externos. Hooks e contextos ficam nos diretórios `hooks` e `contexts`, respectivamente.

Por fim, funções utilitárias são usadas por quaisquer arquivos que precisem realizar operações fora de seu escopo. Os utilitários ficam no diretório `utils` e estão divididos nas seguintes funções:
- **generate**: utilitários que geram ou transformam alguma entrada em alguma saída;
- **handle**: utilitários que recebem e tratam dados;
- **sanitize**: utilitários que formatam dados;
- **validate**: utilitários que validam dados.

## Instalação

Para utilizar este módulo, clone este repositório com o comando `git clone`, faça a instalação das dependências utilizando o comando `npm install` e configure as variáveis de ambiente descritas na seção [Configurações](#configurações).

Este módulo depende do módulo App para exibir dados do banco. Faça a instalação e a configuração dele seguindo as instruções descritas na página do módulo.

Com os dois módulos instalados e configurados na máquina local, abra um terminal, navegue até a pasta do módulo Web e digite `npm start` para iniciar o módulo no servidor local. Abra um novo terminal e repita o procedimento para o módulo App, o que dará início ao servidor da API.

## Configurações

Este módulo depende da existência de algumas variáveis de ambiente. Aqui estão descritas as variáveis e em qual(ais) ambiente(s) elas devem existir:
- **CLIENT_ENV** [produção]: Deve receber o valor `true`. Informa ao Heroku que este módulo é o módulo do lado cliente da aplicação;
- **NODE_OPTIONS** [produção]: Opcional, apenas para algumas versões do Node. Deve receber o valor `--max-old-space-size=[size]`, sendo [size] o volume de memória RAM alocado para o ambiente. Esta variável está configurada no Heroku;
- **PORT** [produção]: Informa qual a porta que deve receber solicitações de clientes. No ambiente de desenvolvimento, a porta padrão é a 3000, mas pode ser modificada também em desenvolvimento utlizando esta mesma variável;
- **PROCFILE** [produção]: Informa onde está o arquivo Procfile com as instruções de inicialização da aplicação no dyno Heroku. Esta variável é setada no dyno ao utilizar o utilitário de linha de comando do Heroku para informar onde está o Procfile.
- **REACT_APP_API_ADDRESS**: [desenvolvimento / produção]: Informa qual é o endereço base da API que contém os dados utilizados por este módulo.
