# Ocara API

## Introdução

O módulo App é o gestor de dados da Ocara. Ele recebe as requisições do módulo [Web](../web), faz a gestão destas requisições, busca os dados solicitados no banco e os retorna para o solicitante. Este módulo segue o padrão de desenvolvimento *Backend for Frontend*.

Este módulo foi criado com [Express](https://expressjs.com/) 4.17.3 e faz uso de diversos pacotes que adicionam funcionalidades ao módulos:
- [AWS SDK](https://www.npmjs.com/package/aws-sdk): Utilitário da Amazon Web Services para manipulação dos serviços em nuvem da empresa. O SDK é utilizado para acessar o S3, serviços de armazenamento de arquivos, e guardar ou recuperar imagens salvas pelos usuários. Utiliza a versão 2.1181.0;
- [Bcrypt](https://www.npmjs.com/package/bcrypt): Gera e valida hashes a partir de dados passados. Usado para gravar e validar senhas. Utiliza a versão 5.0.1;
- [Cors](https://www.npmjs.com/package/cors): Gera os cabeçalhos com as regras de acesso a dados entre domínios. Utiliza a versão 2.8.5;
- [Dotenv](https://www.npmjs.com/package/dotenv): Acrescenta as variáveis de ambiente aquelas definidas em arquivos `.env`. Utiliza a versão 16.0.0;
- [Express Validator](https://www.npmjs.com/package/express-validator): Middleware que faz a validação de requisições no Express. Utiliza a versão 6.14.1;
- [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken): Cria e valida tokens JSON. Utiliza a versão 8.5.1;
- [MondoDB](https://www.npmjs.com/package/mongodb): Driver de acesso ao banco de dados MongoDB. Utiliza a versão 4.7.0;
- [Mongoose](https://www.npmjs.com/package/mongoose): Criador de schemas para o MongoDB. Utiliza a versão 6.2.9.

## Arquitetura

### Estrutura de pastas e arquivos

```
app
├── controllers
├── db
├── .env
├── index.js
├── middlewares
├── models
├── package.json
├── package-lock.json
├── Procfile
├── README.md
├── routes
├── src
├── utils
└── validators
```

Os arquivos da estrutura são:
- **index.js**: inicializa o servidor;
- **Procfile**: informa ao Heroku como inicializar o módulo quando ele for instalado no dyno;
- **.env**: guarda variáveis de ambiente;

E os diretórios:
- **controllers**: guarda os controladores, responsáveis por orquestrar os demais recursos do módulo;
- **db**: guarda os objetos de conexão e manipulação do banco de dados MongoDB;
- **middlewares**: guarda os *middlewares* criados para a aplicação;
- **models**: guarda os *schemas* do banco de dados;
- **routes**: guarda as rotas;
- **src**: guarda o objeto de inicialização do servidor, chamado em `index.js`;
- **utils**: guarda funções utilitárias;
- **validators**: guarda os schemas de validação das requisições nas rotas.

### Relacionamento entre as partes do módulo

![Organização do módulo app](/docs/ocara-3-api-design.png)

Ao iniciar, o app carrega as **rotas** e os **middlewares** das pastas `routes` e `middlewares`, respectivamente, e abre uma porta para escuta de solicitações. Cada rota é associada a um dos **controladores** presentes na pasta `controllers`. Os controladores acessam **dados** que estão hospedados em uma instância do MongoDB na plataforma de dados [Atlas](https://www.mongodb.com/atlas) utilizando os recursos da pasta `db`, que manipulam os **modelos** de dados definidos na pasta `models`. Os controladores também armazenam e recuperam imagens hospedadas em um bucket do [S3](https://aws.amazon.com/s3/), serviço de armazenamento de dados da [Amazon Web Services](https://aws.amazon.com/).

Requisições para cadastro e atualização de dados passam por **validadores**, que garantem a presença dos dados necessários no corpo ou URL da requisição para que a requisição ao banco de dados possa ser feita. Os validadores ficam na pasta `validators`.

Quaisquer recursos do módulo podem fazer uso das funções utilitárias presentes no diretório `utils`. Estas funções utilitárias estão organizadas da seguinte maneira:
- **generate**: utilitários que geram ou transformam alguma entrada em alguma saída;
- **sanitize**: utilitários que formatam dados;
- **validate**: utilitários que validam dados.

## Organização do banco de dados

![Diagrama de entidades e relacionamentos do banco de dados](/docs/ocara-4-database-design.png)

O banco de dados escolhido para montar a aplicação foi o **MongoDB**. Este banco possui as seguintes entidades:

- **Api**: Armazena dados de usuários da API. No momento, não está em uso;
- **Account**: Armazena as credenciais de usuários;
- **User**: Armazena dados de perfil de usuário;
- **Book**: Armazena dados de resenhas de livros;
- **Topic**: Armazena dados de tópicos em discussão nos clubes de leitura. No momento, não está em uso;
- **Event**: Armazena dados de eventos criados nos clubes de leitura;
- **Community**: Armazena dados de clubes de leitura;
- **Member**: Armazena dados de membros cadastrados nos clubes de leitura.

E os relacionamentos entre as entidades são:

- Cada usuário (User) está associado a uma conta (Account), e cada conta está associada a um usuário;
- Cada usuário (User) pode escrever zero, uma ou mais resenhas de livros (Book), e cada resenha é escrita por um usuário;
- Cada usuário (User) pode criar zero, um ou mais clubes de leitura (Community), e cada clube de leitura é criado por um usuário;
- Cada usuário (User) pode estar associado a zero, um ou mais membros (Member), e cada membro está associado a um usuário;
- Cada usuário (User) criador de um clube de leitura pode criar zero, um ou mais eventos (Event), e cada evento é criado por um usuário;
- Cada clube de leitura (Community) pode ter zero, um ou mais eventos (Event), e cada evento está associado a um clube de leitura;
- Cada clube de leitura (Community) pode ter zero, um ou mais membros (Member), e cada membro pertence a um clube de leitura;
- Cada clube de leitura (Community) pode ter zero, um ou mais tópicos (Topic), e cada tópico pertence a um clube de leitura;
- Cada membro (Member) pode abrir zero, um ou mais tópicos (Topic), e cada tópico é aberto por um membro.

## Instalação

Para utilizar este módulo, clone este repositório com o comando `git clone`, faça a instalação das dependências utilizando o comando `npm install` e configure as variáveis de ambiente descritas na seção [Configurações](#configurações).

Com a instalação e a configuração feitas, abra um terminal, navegue até a pasta do módulo App e digite `npm start` para iniciar o módulo no servidor local. Abra um novo terminal e repita o procedimento para o módulo App, o que dará início ao servidor da API.

Dica: caso tenha instalado o pacote [nodemon](https://www.npmjs.com/package/nodemon), você pode utilizar o comando `nodemon` dentro da pasta `app`, no lugar de `npm start` para iniciar o app e garantir que ele reinicie automaticamente sempre que algum arquivo ou diretório mudar. Você pode ainda criar um script no `package.json` para chamar automaticamente o `nodemon`.

## Autenticação

Este módulo possui implementado o sistema de autenticação por tokens JSON, mas ele está desativado nas rotas. É necessário, no entanto, fornecer uma chave de API para gerar o token ao fazer login na aplicação, mesmo a validação estando desabilitada nas rotas. Essa chave é adicionada na variável de ambiente `API_SECRET` e pode ser qualquer valor de texto.

Para habilitar a autenticação nas rotas, basta incluir o *middleware* `tokenMiddleware` como parâmetro em cada rota que precisa de autenticação ou chamar o *middleware* dentro de `src/App.js` para forçar a validação de token em todas as rotas.

Ao habilitar a autenticação das rotas, será necessário criar um sistema de renovação de tokens, que hoje não existe neste módulo.

## Configurações

Este módulo depende da existência de algumas variáveis de ambiente. Aqui estão descritas as variáveis e em qual(ais) ambiente(s) elas devem existir:

- **API_SECRET** [desenvolvimento / produção]: Recebe como valor algum texto que será usado para autenticar o token JSON;
- **AWS_ACCESS_KEY_ID** [desenvolvimento / produção]: Recebe o ID da chave de acesso aos recursos da AWS pelo SDK;
- **AWS_SECRET_ACCESS_KEY** [desenvolvimento / produção]: Recebe a chave de acesso aos recursos da AWS pelo SDK;
- **AWS_BUCKET** [desenvolvimento / produção]: Recebe o nome do bucket configurado no S3 para manipular as imagens salvas pelos usuários;
- **AWS_REGION** [desenvolvimento / produção]: Recebe o nome da região onde o bucket configurado no S3 está localizado;
- **DB_HOST** [desenvolvimento / produção]: Recebe o endereço de acesso ao banco de dados;
- **DB_NAME** [desenvolvimento / produção]: Recebe o nome do banco de dados que será usado;
- **DB_PASSWORD** [desenvolvimento / produção]: Recebe a senha de acesso ao banco de dados;
- **NODE_OPTIONS** [produção]: Opcional, apenas para algumas versões do Node. Deve receber o valor `--max-old-space-size=[size]`, sendo [size] o volume de memória RAM alocado para o ambiente;
- **PORT** [produção]: Informa qual a porta que deve receber solicitações de clientes. No ambiente de desenvolvimento, a porta padrão é a 8080, mas pode ser modificada também em desenvolvimento utlizando esta mesma variável;
- **PROCFILE** [produção]: Informa onde está o arquivo Procfile com as instruções de inicialização da aplicação no dyno Heroku. Esta variável é setada no dyno ao utilizar o utilitário de linha de comando do Heroku para informar onde está o Procfile;
- **SERVER_ENV** [produção]: Deve receber o valor `true`. Informa ao Heroku que este módulo é o módulo do lado servidor da aplicação;

## Rotas

Em breve algo incrível será escrito aqui :)
