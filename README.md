####  Bootcamp - GoStack 11
# 🚀 Nível 02 - Iniciando back-end do app

## Sobre

- Esta API contém o back-end do Projeto GoBarber, continuação do projeto [Primeiro Projeto com Node.js](https://github.com/fabiosvf/bootcamp-gostack-11-nivel-02-primeiro-projeto-com-node-js).
- Neste projeto será utilizado Node.js com TypeScript, além de trabalhar com conceitos de banco de dados, autenticação, autorização, etc.

---

## Roteiro

- Nesta seção será descrito o roteiro com todos os passos para a continuidade na criação do projeto em Node.js com TypeScript que irá acessar banco de dados instalado no Docker e outras ferramentas.

### Banco de Dados

#### Estratégias de abstração
- Existem algumas formas de acessar o banco de dados
  - Forma Nativa
    - [Node Postgres](http://node-postgres.com)
    - Utiliza a linguagem SQL nativa
  - Query Builder
    - [Knex.js](http://knexjs.org)
    - Utiliza a linguagem javascript para criar as queries para acessar o banco de dados relacional Postgres
  - ORM - Object Relational Mapping (JavaScript)
    - [Sequelize](http://sequelize.org)
    - Utiliza o JavaScript para fazer o mapeamento dos objetos
  - ORM - Object Relational Mapping (TypeScript)
    - [TypeORM](http://typeorm.io)
    - Utiliza o TypeScript para fazer o mapeamento dos objetos

#### Conceitos Docker
- Como funciona?
  - O Docker serve para criar  ambientes isolados (containers) para armazenar serviços, bancos de dados, APIs, etc
  - Os containers expões portas para comunicação com os serviços armazenados
- Principais conceitos
  - O Docker trabalha com o conceito de imagem
  - Uma image pode representar um banco de dados ou serviço
  - Um container pode ter mais de uma imagem, cada uma exposta para fora do container a partir de uma porta específica
  - As imagens dos serviços ficam armazenados e registrados em um ambiente chamado Docker Registry (Docker Hub)
  - Nós podemos registrar nossas próprias imagens nesse ambiente
  - Para criar nossas próprias imagens, utilizamos o Dockerfile
  - É possível configurarmos nossa API para funcionar dentro de um container do Docker
- Manual de Instalação
  - [Instalando Docker](docs/Instalando%20Docker.pdf)
  - [Docker Desktop + WSL 2](docs/Docker%20Desktop%20%2B%20WSL%202.pdf)
  - [Instalação do Docker Desktop](https://www.docker.com/products/docker-desktop)

#### Criando container do banco
- Informações Oficiais da imagem do banco de dados Postgres no Docker
  - [Imagem Oficial do Postgres para Docker](https://hub.docker.com/_/postgres)
- Verificar se a porta está em uso
  - O Postgres utiliza a porta 5432. No terminal, verifique se a porta está disponível. Caso esteja, o Postgres deverá ser configurado em outra porta
```
$ netstat -an|findstr 5432
```
- Abrir o terminal do Docker para iniciar a ferramenta
  - Para que o Docker possa habilitar os recursos para instalação e acessos aos serviços, será necessário iniciar o `Docker Quickstart Terminal`
  - O Docker irá habilitar o IP/Porta `192.168.99.100:2376`
- Instalar a imagem do banco de dados Postgres no Docker
  - Para instalar uma imagem da ultima versão do Postgres, digite o código abaixo, onde:
    - `--name gostack11_postgres` cria uma base chamada **gostack11_postgres**
    - `-e POSTGRES_PASSWORD=docker` cria a senha **docker**
    - `-p 5432:5432` habilita a porta 5432 tanto no container do Docker quanto no sistema operacional que irá se comunicar com essa instância
    - `-d postgres` obtém a última versão do banco de dados relacional Postgres
```
$ docker run --name gostack11_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```
- Verificar se o banco de dados criado foi iniciado
  - Para listar os serviços que estão em execução, digite o códigoa abaixo
```
$ docker ps
```
- Verficar todos os serviços disponíveis
  - Caso o comando anterior não liste nenhum banco de dados ativo, então utilizar o comando abaixo para verificar todos os serviços disponíveis no container
```
$ docker ps -a
```
- Consultar o log de ima instância
  - Para consultar o log de uma determinada imagem, a partir do comando `docker ps -a`, localize o campo `CONTAINER ID` em seguida digite o camando abaixo
  - Onde `CONTAINER_ID` é a chave obtida
```
$ docker logs CONTAINER_ID
```
- Iniciar uma imagem
  - Quando desligamos o computador, automaticamente, o Docker pára todas as imagens em execução
  - Desta forma, ao ligar o computador novamente, será necessário digitar o comando para listar as imagens disponíveis, localizar o nome da base ou o CONTAINER_ID e startar a imagem. Para isso digite
```
$ docker start CONTAINER_ID
ou
$ docker start DATABASE_NAME
```
- Ferramenta de Administração de Banco de Dados
  - Para visualizarmos e manipularmos os dados dentro do banco de dados Postgree utilizaremos uma ferramenta chamada `DBeaver`
  - Ela pode ser encontrada no seguinte endereço:
    - [DBeaver](https://dbeaver.io/download/)
  - Efetue a instalação da ferramenta
  - Outra ferramenta que também funciona é o `Postbird`
    - Ele pode ser encontrado no seguinte endereço:
      [Postbird](https://www.electronjs.org/apps/postbird)
- Acessar o banco de dados utilizando o `DBeaver`
  - Criar a conexão com os seguintes parâmetros:
    - `Host`: 192.168.99.100
    - `Database`: postgres
    - `Port`: 5432
    - `Username`: postgres
    - `Password`: docker

---

## Tecnologias utilizadas

#### Dependências de Projeto
- [date-fns](https://yarnpkg.com/package/date-fns)
- [express](https://yarnpkg.com/package/express)
- [uuidv4](https://yarnpkg.com/package/uuidv4)

#### Dependências de Desenvolvimento
- [@types/express](https://yarnpkg.com/package/@types/express)
- [@typescript-eslint/eslint-plugin](https://yarnpkg.com/package/@typescript-eslint/eslint-plugin)
- [@typescript-eslint/parser](https://yarnpkg.com/package/@typescript-eslint/parser)
- [eslint](https://yarnpkg.com/package/eslint)
- [eslint-config-airbnb-base](https://yarnpkg.com/package/eslint-config-airbnb-base)
- [eslint-config-prettier](https://yarnpkg.com/package/eslint-config-prettier)
- [eslint-import-resolver-typescript](https://yarnpkg.com/package/eslint-import-resolver-typescript)
- [eslint-plugin-import](https://yarnpkg.com/package/eslint-plugin-import)
- [eslint-plugin-prettier](https://yarnpkg.com/package/eslint-plugin-prettier)
- [prettier](https://yarnpkg.com/package/prettier)
- [ts-node-dev](https://yarnpkg.com/package/ts-node-dev)
- [typescript](https://yarnpkg.com/package/typescript)

---

## Como executar
- Crie uma pasta para o projeto
- Acesse a pasta
- Faça o clone do projeto
```
$ git clone https://github.com/fabiosvf/bootcamp-gostack-11-nivel-02-iniciando-back-end-do-app.git .
```
- Atualize as bibliotecas
```
$ yarn
```
- Converta TypeScript em JavaScript
```
$ yarn tsc
ou
$ yarn build
```
- Inicie o serviço
```
$ ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts
ou
$ yarn dev:server
```
