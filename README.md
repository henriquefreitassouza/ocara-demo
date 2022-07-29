# Ocara - A praça da Taba

## Introdução

A Ocara é uma rede social que promove encontros entre pessoas com uma paixão em comum: **a leitura**. Este projeto é a materialização de uma *spinoff* fictícea da [A Taba](https://www.ataba.com.br), empresa que faz curadoria de livros infanto juvenis e que possui um clube de livros por assinatura.

A Taba é uma palavra do Tupi que significa **aldeia**. A empresa possui este nome pois acredita que, para formar leitores, é necessário uma aldeia de pessoas que leem.

Ocara também é uma palavra do Tupi, que significa centro da taba, ou centro da aldeia. Se a aldeia é o ambiente de incentivo a formação de leitores, o centro da aldeia é o centro deste ambiente estimulante. É neste local, ou **praça**, que se encontram o que A Taba acredita serem os três agentes necessários para formar leitores: o **livro**, o **leitor** e a **leitura**.

A Ocara é um espaço que traz as emoções de uma feira literária para dentro do mundo digital. Nesta feira digital, pessoas leitoras são convidadas a ingressarem em clubes de leitura e a compartilharem suas experiências com os livros que estão lendo, ou a descobrirem novas paixões literárias.

A Ocara existe para estimular conversas sobre livros, pois são estas conversas que estimulam o nascimento de novos leitores.

## Sobre este repositório

O projeto está organizado em dois grandes módulos:
- [Web](https://github.com/henriquefreitassouza/ocara-demo/tree/main/web): é a interface da Ocara. Este módulo serve o conteúdo do site para os visitantes e faz a gestão da comunicação com o App.
- [App](https://github.com/henriquefreitassouza/ocara-demo/tree/main/app): é o controlador de dados da Ocara. Este módulo administra os pedidos de acesso a dados e faz as entregas conforme cada pedido.

Cada módulo vive em seu próprio repositório e a administração de cada um é feito de maneira independente. Esta é uma arquitetura **monorepo**.

Para iniciar o projeto em sua máquina local, é necessário que você tenha instalado em sua máquina os seguintes softwares:
- Node.js 16+
- NPM 8+
- Git

Com as ferramentas instaladas, basta clonar este repositório com `git clone`, entrar nas pastas de cada módulo e fazer a instalação dos pacotes utilizados pelos módulos com o comando `npm install`. Cada módulo precisa de seu próprio arquivo de configuração de variáveis, e as instruções para a instalação de cada um se encontram em seus diretórios raizes.

## Deploy e demonstração

Cada módulo possui um dyno no Heroku, e o módulo web da aplicação pode ser acessado pelo endereço [https://ocara-app.herokuapp.com](https://ocara-app.herokuapp.com/). O Heroku foi configurado para acessar e publicar cada módulo em um dyno diferente a partir deste repositório.

## E agora?

Acesse os repositórios dos módulos para acessar suas respectivas documentações.
- [Web](https://github.com/henriquefreitassouza/ocara-demo/tree/main/web)
- [App](https://github.com/henriquefreitassouza/ocara-demo/tree/main/app)
