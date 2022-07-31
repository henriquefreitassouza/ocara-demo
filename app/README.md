# Ocara API

## Introdução

O módulo App é o gestor de dados da Ocara. Ele recebe as requisições do módulo [Web](../web), faz a gestão destas requisições, busca os dados solicitados no banco e os retorna para o solicitante. Este módulo segue o padrão de desenvolvimento *Backend for Frontend*.

Este módulo foi criado com [Express](https://expressjs.com/) 4.17.3 e faz uso de diversos pacotes que adicionam funcionalidades ao módulos:
- [AWS SDK](https://www.npmjs.com/package/aws-sdk): Utilitário da AWS para manipulação dos serviços em nuvem da empresa. O SDK é utilizado para acessar o S3, serviços de armazenamento de arquivos, e guardar ou recuperar imagens salvas pelos usuários. Utiliza a versão 2.1181.0;
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

Ao iniciar, o app carrega as **rotas** e os **middlewares** das pastas `routes` e `middlewares`, respectivamente, e abre uma porta para escuta de solicitações. Cada rota é associada a um dos **controladores** presentes na pasta `controllers`. Os controladores acessam **dados** que estão hospedados em uma instância do MongoDB na plataforma de dados [Atlas](https://www.mongodb.com/atlas) utilizando os recursos da pasta `db`, que manipulam os **modelos** de dados definidos na pasta `models`. Os controladores também armazenam e recuperam imagens hospedadas em um bucket do [S3](https://aws.amazon.com/s3/), serviço de armazenamento de dados da [Amazon Web Services (AWS)](https://aws.amazon.com/).

Para utilizar as rotas que dependem do S3, é necessário criar uma conta na AWS e obter as credenciais para acesso aos serviços de forma remota.

Requisições para cadastro e atualização de dados passam por **validadores**, que garantem a presença dos dados necessários no corpo ou URL da requisição para que a requisição ao banco de dados possa ser feita. Os validadores ficam na pasta `validators`.

Quaisquer recursos do módulo podem fazer uso das funções utilitárias presentes no diretório `utils`. Estas funções utilitárias estão organizadas da seguinte maneira:
- **generate**: utilitários que geram ou transformam alguma entrada em alguma saída;
- **sanitize**: utilitários que formatam dados;
- **validate**: utilitários que validam dados.

## Organização do banco de dados

![Diagrama de entidades e relacionamentos do banco de dados](/docs/ocara-4-database-design.png)

### Entidades

O banco de dados escolhido para montar a aplicação foi o **MongoDB**. Este banco possui as seguintes entidades:

- **Api**: Armazena dados de usuários da API. No momento, não está em uso;
- **Account**: Armazena as credenciais de usuários;
- **User**: Armazena dados de perfil de usuário;
- **Book**: Armazena dados de resenhas de livros;
- **Topic**: Armazena dados de tópicos em discussão nos clubes de leitura. No momento, não está em uso;
- **Event**: Armazena dados de eventos criados nos clubes de leitura;
- **Community**: Armazena dados de clubes de leitura;
- **Member**: Armazena dados de membros cadastrados nos clubes de leitura.

As entidades são modeladas como `collections` no MongoDB, e os documentos destas collections possuem a seguinte estrutura:

#### Api

```
{
  schema_version: Number,
  _id: ObjectId,
  email: String,
  password: String,
  created_at: Date,
  last_active_at: Date
}
```

#### Account
```
{
  schema_version: Number,
  _id: ObjectId,
  email: String,
  password: String,
  created_at: Date,
  last_active_at: Date,
  verified: Boolean,
  active: Boolean,
  suspended: Boolean,
  stats: {
    total_accesses: Number,
  }
}
```

#### User
```
{
  schema_version: Number,
  _id: ObjectId,
  name: String,
  surname: String,
  picture: String,
  cover: String,
  bio: String,
  created_at: Date,
  account: ObjectId,
  stats: {
    total_comments: Number,
    total_rsvp: Number,
    total_events: Number
  }
}
```

#### Book
```
{
  schema_version: Number,
  _id: ObjectId,
  title: String,
  isbn: String,
  publisher: String,
  author: [{
    name: String,
    role: String
  }],
  genre: String,
  edition: String,
  year_published: Number,
  taxonomies: [{
    type: String,
    name: String
  }],
  excerpt: String,
  namespace: String,
  cover: String,
  user: ObjectId,
  stats: {
    total_views: Number
  }
}
```

#### Topic
```
{
  schema_version: Number,
  _id: ObjectId,
  title: String,
  description: String,
  member: ObjectId,
  open: Boolean,
  created_at: Date,
  community: String,
  comments: [{
    description: String,
    member: ObjectId,
    stats: {
      total_likes: Number
    }
  }],
  stats: {
    total_comments: Number
  },
}
```

#### Event
```
{
  schema_version: Number,
  _id: ObjectId,
  title: String,
  date: Date,
  online: Boolean,
  cover: String,
  place: {
    address: String,
    number: String,
    reference: String,
    neighborhood: String,
    city: String,
    state: String,
    country: String,
    postal_code: String
  },
  member: ObjectId,
  community: String,
  namespace: String,
  description: String,
  user: ObjectId,
  rsvp_list: [{
    member: ObjectId,
    status: String,
    confirmed: Boolean
  }],
  stats: {
    total_rsvp: Number,
    total_participants: Number
  }
}
```

#### Community
```
{
  schema_version: Number,
  _id: ObjectId,
  name: String,
  excerpt: String,
  description: String,
  namespace: String,
  picture: String,
  cover: String,
  member_list: [{
    member: ObjectId
  }],
  created_at: Date,
  user: ObjectId,
  stats: {
    total_members: Number,
    total_active_members: Number,
    total_suspended_members: Number
  }
}
```

#### Member
```
{
  schema_version: Number,
  _id: ObjectId,
  user: ObjectId,
  name: String,
  surname: String,
  bio: String,
  picture: String,
  badge: String,
  role: String,
  community: String,
  active: Boolean,
  suspended: Boolean,
  stats: {
    total_comments: Number,
    total_rsvp: Number,
    total_events: Number
  }
}
```

### Relacionamentos

Os relacionamentos entre as entidades são:

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

Ao habilitar a autenticação das rotas, será necessário criar um sistema de renovação ou geração de tokens, que hoje não existe neste módulo.

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

## Usando a API

### Requisição

A API está configurada para receber e retornar objetos JSON. O seguinte cabeçalho deve ser enviado a cada requisição:

```
Content-Type: application/json
```

Quando a rota solicitar um *payload*, envie-o da seguinte maneira:

```
JSON.stringify({
  field1: value1,
  field2: value1
});
```

### Retorno

Todas as rotas têm como retorno um objeto JSON com a seguinte estrutura:

```
{
  "result": "[result]",
  "body": "[body]"
}
```

A propriedade `result` pode receber um de dois valores: `success` ou `error`. O retorno `success` acontece quando a requisição foi atendida **e há dados de retorno**. A API retorna `error` quando houve falha na requisição ou **não há dados de retorno**.

A propriedade `body` recebe um de três possíveis tipos de valores: `string`, `object` ou `array`. Quando `result` é `error`, `body` recebe um texto com o motivo do erro. Quando `result` é `success`, `body` recebe um objeto ou lista a depender da rota chamada. Algumas rotas retornam um objeto com apenas um resultado, enquanto outras retornam uma lista de objetos.

Mensagens de erro por validação chegam em uma lista de objetos, e cada objeto da lista possui a seguinte estrutura:

```
{
    "msg": "[mensagem]",
    "param": "[parâmetro]",
    "location": "body"
}
```

Os retornos `msg` e `param` contém a mensagem de erro e qual o campo do *payload* da requisição chegaram com erros, respectivamente.

### Códigos de retorno

| Código | Retorno |
| --- | --- |
| 200 | Requisição e retorno feitos com sucesso |
| 400 | Requisição não autorizada ou inválida |
| 500 | Requisição com erro do lado do servidor |

### Rotas

Todas as rotas possuem, após o domínio, a versão da api. A versão atual é a `v1`, então o endereço base da rota é `[host]:[port]/v1`, sendo host e port o domínio e a porta. Cada entidade do banco possui um endereço próprio, além de um endereço para o serviço S3. Por fim, dentro dos endereços de cada entidade, cada ação possível de ser realizada é mapeada a um dos controladores.

As rotas das entidades são:
- `/v1/account`
- `/v1/api`
- `/v1/book`
- `/v1/community`
- `/v1/event`
- `/v1/member`
- `/v1/s3`
- `/v1/topic`
- `/v1/user`

#### Account

##### Buscar conta pelo ID

Rota: `/v1/account/:id`

Método: `GET`

Parâmetros:
- `id`: O id da conta no banco de dados

Cabeçalhos:
- `Content-Type: application/json`

Corpo: Não tem

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 400 | `error` | ID inválido |

Exemplo de retorno:

```
{
    "result": "success",
    "body": {
        "_id": "",
        "schema_version": 1,
        "email": "",
        "password": "",
        "verified": true,
        "active": true,
        "suspended": false,
        "created_at": "",
        "last_active_at": "",
        "__v": 0
    }
}
```

##### Buscar conta pelo endereço de e-mail

Rota: `/v1/account/email/:email`

Método: `GET`

Parâmetros:
- `email`: O e-mail do usuário

Cabeçalhos:
- `Content-Type: application/json`

Corpo: Não tem

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 200 | `error` | E-mail não encontrado |
| 400 | `error` | E-mail inválido |

Exemplo de retorno:

```
{
  result: success,
  body: {

  }
}
```

##### Validar credenciais

Rota: `/v1/account/validate`

Método: `POST`

Parâmetros: Não tem

Cabeçalhos:
- `Content-Type: application/json`

Corpo:
- `email`: e-mail de acesso a conta
- `password`: senha de acesso a conta

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 200 | `error` | E-mail ou senha inválido(s) |
| 400 | `error` | Informe o e-mail e a senha |

Exemplo de retorno:

```
{
  result: success,
  body: {
    account: "",
    user: "",
    email: "",
    name: "",
    accessToken: ""
  }
}
```

##### Criar nova conta

Rota: `/v1/account`

Método: `POST`

Parâmetros: Não tem

Cabeçalhos:
- `Content-Type: application/json`

Corpo:
- `email`: e-mail de acesso a conta
- `password`: senha de acesso a conta

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 400 | `error` | Lista de erros |
| 500 | `error` | Falha ao cadastrar nova conta |

Exemplo de retorno:

```
{
  result: success,
  body: {

  }
}
```

##### Atualizar uma conta pelo ID

Rota: `/v1/account/:id`

Método: `PATCH`

Parâmetros:
- `id`: O id da conta no banco de dados

Cabeçalhos:
- `Content-Type: application/json`

Corpo:
- `email`: e-mail de acesso a conta
- `password`: senha de acesso a conta

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 400 | `error` | Lista de erros |
| 400 | `error` | ID inválido |
| 500 | `error` | Falha ao atualizar a conta |

Exemplo de retorno:

```
{
  result: success,
  body: {

  }
}
```

##### Excluir uma conta pelo ID

Rota: `/v1/account/:id`

Método: `DELETE`

Parâmetros:
- `id`: O id da conta no banco de dados

Cabeçalhos:
- `Content-Type: application/json`

Corpo: Não tem

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 400 | `error` | ID inválido |
| 500 | `error` | Falha ao deletar a conta |

Exemplo de retorno:

```
{
  result: success,
  body: {

  }
}
```

#### Api

##### Validar as credenciais de uma conta de API

Rota: `/v1/api/validate`

Método: `POST`

Parâmetros: Não tem

Cabeçalhos:
- `Content-Type: application/json`

Corpo:
- `email`: e-mail de acesso a conta de api
- `password`: senha de acesso a conta de api

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 200 | `error` | E-mail ou senha inválido(s) |
| 400 | `error` | Informe o e-mail e a senha |

Exemplo de retorno:

```
{
  result: success,
  body: {

  }
}
```

##### Criar uma nova conta de API

Rota: `/v1/api`

Método: `POST`

Parâmetros: Não tem

Cabeçalhos:
- `Content-Type: application/json`

Corpo:
- `email`: e-mail de acesso a conta de api
- `password`: senha de acesso a conta de api

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 400 | `error` | Lista de erros |
| 500 | `error` | Falha ao cadastrar nova conta |

Exemplo de retorno:

```
{
  result: success,
  body: {

  }
}
```

##### Atualizar uma conta de API

Rota: `/v1/api/:id`

Método: `PATCH`

Parâmetros:
- `id`: O id da conta de API no banco de dados

Cabeçalhos:
- `Content-Type: application/json`

Corpo:
- `email`: e-mail de acesso a conta de api
- `password`: senha de acesso a conta de api

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 400 | `error` | Lista de erros |
| 400 | `error` | ID inválido |
| 500 | `error` | Falha ao atualizar a conta |

Exemplo de retorno:

```
{
  result: success,
  body: {

  }
}
```

##### Excluir uma conta de API

Rota: `/v1/api/:id`

Método: `DELETE`

Parâmetros:
- `id`: O id da conta de API no banco de dados

Cabeçalhos:
- `Content-Type: application/json`

Corpo: Não tem

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 400 | `error` | ID inválido |
| 500 | `error` | Falha ao deletar a conta |

Exemplo de retorno:

```
{
  result: success,
  body: {

  }
}
```

#### Book

##### Listar todas as resenhas

Rota: `/v1/book/list`

Método: `GET`

Parâmetros: Não tem

Cabeçalhos:
- `Content-Type: application/json`

Corpo: Não tem

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 200 | `error` | Não há livros cadastrados |

Exemplo de retorno:

```
{
  result: success,
  body: {

  }
}
```

##### Listar resenhas por termo de busca

Rota: `/v1/book/list/term/:term`

Método: `GET`

Parâmetros:
- `term`: palavra chave para a busca de livros por título

Cabeçalhos:
- `Content-Type: application/json`

Corpo: Não tem

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 200 | `error` | Não há livros cadastrados com o termo informado |
| 400 | `error` | Informe o termo para busca de livros |

Exemplo de retorno:

```
{
  result: success,
  body: {

  }
}
```

##### Listar resenhas por gênero literário

Rota: `/v1/book/list/genre/:genre`

Método: `GET`

Parâmetros:
- `genre`: palavra chave para a busca de livros por gênero literário

Cabeçalhos:
- `Content-Type: application/json`

Corpo: Não tem

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 200 | `error` | Não há livros cadastrados com o gênero literário informado |
| 400 | `error` | Informe o gênero literário para busca de livros |

Exemplo de retorno:

```
{
  result: success,
  body: {

  }
}
```

##### Listar gêneros literários

Rota: `/v1/book/list/genre`

Método: `GET`

Parâmetros: Não tem

Cabeçalhos:
- `Content-Type: application/json`

Corpo: Não tem

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 200 | `error` | Não há gêneros literários cadastrados |

Exemplo de retorno:

```
{
  result: success,
  body: {

  }
}
```

##### Buscar livro pelo namespace

Rota: `/v1/book/list/namespace/:namespace`

Método: `GET`

Parâmetros:
- `namespace`: o identificador do tipo namespace do livro

Cabeçalhos:
- `Content-Type: application/json`

Corpo: Não tem

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 200 | `error` | Não há livros com o identificador informado |
| 400 | `error` | Informe o identificador do livro |

Exemplo de retorno:

```
{
  result: success,
  body: {

  }
}
```

##### Buscar livros cadastrados por um usuário

Rota: `/v1/book/list/user/:user`

Método: `GET`

Parâmetros:
- `user`: ID do usuário que cadastrou o livro

Cabeçalhos:
- `Content-Type: application/json`

Corpo: Não tem

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 200 | `error` | Não há livros resenhados pelo usuário informado |
| 400 | `error` | Informe o identificador do usuário |

Exemplo de retorno:

```
{
  result: success,
  body: {

  }
}
```

##### Buscar livro pelo ID

Rota: `/v1/book/:id`

Método: `GET`

Parâmetros:
- `id`: O id do livro

Cabeçalhos:
- `Content-Type: application/json`

Corpo: Não tem

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 200 | `error` | Não há livros com o ID informado |
| 400 | `error` | ID inválido |

Exemplo de retorno:

```
{
  result: success,
  body: {

  }
}
```

##### Validar existência de gênero literário no banco

Rota: `/v1/book/validate/genre`

Método: `POST`

Parâmetros: Não tem

Cabeçalhos:
- `Content-Type: application/json`

Corpo:
- `genre`: palavra chave para a busca de livros por gênero literário

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 200 | `error` | Não há gêneros literários cadastrados com o termo informado |
| 400 | `error` | Informe o gênero literário |

Exemplo de retorno:

```
{
  result: success,
  body: ""
}
```

##### Validar existência de namespace

Rota: `/v1/book/validate`

Método: `POST`

Parâmetros: Não tem

Cabeçalhos:
- `Content-Type: application/json`

Corpo:
- `namespace`: o identificador do tipo namespace do livro

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 200 | `error` | Não há livros com o identificador informado |
| 400 | `error` | Informe o identificador do livro |

Exemplo de retorno:

```
{
  result: success,
  body: ""
}
```

##### Criar novo livro

Rota: `/v1/book`

Método: `POST`

Parâmetros: Não tem

Cabeçalhos:
- `Content-Type: application/json`

Corpo:
- `title`: O título do livro
- `isbn`: O código ISBN do livro
- `publisher`: A editora que publicou o livro
- `author`: Uma lista de autores contendo objetos com as propriedades `name` e `role`
- `genre`: Gênero literário
- `edition`: Edição do livro
- `year_published`: Ano de publicação
- `excerpt`: Resenha do livro
- `cover`: Endereço da imagem de capa do livro
- `user`: ID do usuário que cadastrou o livro

O parâmetro `namespace` não precisa ser informado, ele é gerado automaticamente com base no título do livro e em uma sequência alfanumérica aleatória de caracteres.

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 400 | `error` | ID de usuário inválido |
| 400 | `error` | Lista de erros |
| 500 | `error` | Falha ao cadastrar novo livro |

Exemplo de retorno:

```
{
  result: success,
  body: {

  }
}
```

##### Atualizar livro pelo ID

Rota: `/v1/book/:id`

Método: `PATCH`

Parâmetros:
- `id`: O id do livro

Cabeçalhos:
- `Content-Type: application/json`

Corpo:
- `title`: O título do livro
- `isbn`: O código ISBN do livro
- `publisher`: A editora que publicou o livro
- `author`: Uma lista de autores contendo objetos com as propriedades `name` e `role`
- `genre`: Gênero literário
- `edition`: Edição do livro
- `year_published`: Ano de publicação
- `excerpt`: Resenha do livro
- `cover`: Endereço da imagem de capa do livro

O `namespace` não é atualizado ao atualizar o título do livro. Ele permanece com o valor de quando foi criado.

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 400 | `error` | ID inválido |
| 400 | `error` | Lista de erros |
| 500 | `error` | Falha ao atualizar o livro |

Exemplo de retorno:

```
{
  result: success,
  body: {

  }
}
```

##### Excluir um livro

Rota: `/v1/book/:id`

Método: `DELETE`

Parâmetros:
- `id`: O id do livro

Cabeçalhos:
- `Content-Type: application/json`

Corpo: Não tem

Códigos de retorno:

| Código | Status | Retorno |
| --- | --- | --- |
| 200 | `success` | Ok |
| 400 | `error` | ID inválido |
| 500 | `error` | Falha ao deletar o livro |

Exemplo de retorno:

```
{
  result: success,
  body: {

  }
}
```

#### Community

##### Listar todas as comunidades

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Buscar comunidade pelo namespace

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Listar comunidades criadas por um usuário

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Buscar comunidade por ID

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Validar existência de namespace no banco

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Validar existência de membro na comunidade

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Criar nova comunidade

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Adicionar membro a uma comunidade

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Excluir membro de uma comunidade

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Atualizar comunidade pelo ID

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Excluir uma comunidade

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

#### Event

##### Listar todos os eventos

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Listar o próximo evento de uma comunidade

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Listar eventos passados de uma comunidade

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Listar eventos de uma comunidade

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Buscar evento pelo namespace

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Listar eventos criados por um usuário

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Buscar evento por ID

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Listar participantes de um evento

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Validar existência de namespace do evento no banco

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Cadastrar participante em evento

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Criar novo evento

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Atualizar evento pelo ID

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Excluir evento pelo ID

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Excluir participante de evento

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

#### Member

##### Listar membros de uma comunidade

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Buscar membro pelo ID

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Buscar membro pelo ID de usuário

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Cadastrar novo membro

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Atualizar membro pelo ID

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Excluir membro pelo ID

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

#### s3

##### Listar URL temporária para manipulação de bucket no S3

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

#### Topic

##### Listar todos os tópicos

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Listar tópicos por comunidade

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Buscar tópicos por palavra chave

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Buscar tópico por ID

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Criar novo tópico

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Atualizar tópico pelo ID

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Excluir tópico pelo ID

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

#### User

##### Buscar usuário pelo ID

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Buscar usuário pelo ID da conta

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Criar novo usuário

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Atualizar usuário pelo ID

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Atualizar usuário pelo ID da conta

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:

##### Excluir usuário pelo ID

Rota:

Método:

Parâmetros:
-

Cabeçalhos:
-

Corpo:

Códigos de retorno:

Exemplo de retorno:
