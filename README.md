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

#### Configurando TypeORM
- Instalar a biblioteca `typeorm` e `pg`, onde
  - `typeorm`: é a lib responsável pelo mapeamento das tabelas do banco de dados em formato JSON
  - `pg`: é o driver do banco de dados, no nosso caso, Postgres. Dependendo do banco de dados utilizado, devemos acessar a documentação para saber qual driver utilizar
```
$ yarn add typeorm pg
```
- Configurar o TypeORM
  - Para maiores detalhes, acessar o site [TypeORM](https://typeorm.io/#/)
  - No menu `Connection > Using ormconfig.json` contém detalhes de como configurar essa lib.
  - Como já informado anteriormente, essa biblioteca tem como objetivo fazer o mapeamento das tabelas de um banco de dados relacional em forma de objeto JavaScript, ou seja, JSON.
  - Na raiz do projeto, crie o arquivo `ormconfig.json` com a seguinte configuração:
    - `type`: nome do driver do banco de dados, no nosso caso, `postgres`
    - `host`: nome do nosso servidor de banco de dados, em geral é parametrizado `localhost`. Se não funcionar, utilize o IP do docker onde o banco de dados está configurado, no meu caso `192.168.99.100`
    - `port`: número da porta para acesso à imagem iniciada dentro do container do docker, no nosso caso, `5432`
    - `username`: nome de usuário para acesso ao banco de dados, no nosso caso, `postgres`
    - `password`: senha para acesso ao banco de dados, no nosso caso, `docker`
    - `database`: nome do nosso banco de dados. Iremos criar o banco no próximo tópico, mas pra adiantar vamos deixar configurado como `gostack_gobarber`
```json
{
  "type": "postgres",
  "host": "192.168.99.100",
  "port": 5432,
  "username": "postgres",
  "password": "docker",
  "database": "gostack_gobarber"
}
```
- Configurar uma estrutura de conexão com o banco de dados
  - Na raiz da pasta `src` crie a pasta `database` e dentro dessa pasta o arquivo `index.ts`
    - `./src/database/index.ts`
```typescript
import { createConnection } from 'typeorm';

createConnection();
```
- Criar o banco de dados `gostack_gobarber`
  - Abra a ferramenta `DBeaver`
  - Acesse o menu lateral esquerdo e clique com o botão direito do mouse sobre a conexão recentemente criada e selecione a opção `Create > Database`
  - Na próxima janela, informe no campo `Database name` o nome do banco de dados, no nosso caso `gostack_gobarber` e clique em `OK`
- Implementar a chamada do banco de dados no arquivo `./src/server.ts`
```typescript
...
import './database';
...
```
- Iniciar o serviço para testar conexão
```
$ yarn dev:server
```

#### Criando tabela de agendamentos
- Configurar as `migrations`
  - As `migrations` servem para criar as estruturas de tabelas dentro do banco de dados, sem precisar criar scripts SQL nativos. No caso, a biblioteca `typeorm` se encarrega disso levando em consideração o driver do banco de dado configurado previamente.
  - Dentro do arquivo `./ormconfig.json`, criar uma propriedade chamada `migrations` com a seguinte configuração:
```json
  "migrations": [
    "./src/database/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
```
- Criar um script para criar as `migrations`
  - Abrir o arquivo `./package.json` e na sessão `scripts` criar a propriedade `typeorm` abaixo das demais propriedades
  - Configurar o seguinte comando
```json
    "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"
```
- Criar uma `migration`
  - Para criar a migration `CreateAppointments`, digite o seguinte comando:
    - Nessa migration será configurada a estrutura da nossa tabela `appointments` quer será criada diretamento no nosso banco de dados.
```
$ yarn typeorm migration:create -n CreateAppointments
```
- Configurar a `migration` de criação
  - Ao executar o comando para criação da migration, a lib criou um arquivo dinamicamente com um prefixo numérico utilizado para versionar o arquivo e assim mantermos o controle de versão de tudo que foi criado ou modificado no banco de dados
  - No nosso caso, foi criado o seguinte arquivo `./src/database/migrations/1596771464635-CreateAppointments.ts`
  - Segue o conteúdo do arquivo, onde:
    - o método `up` serve para subir as alterações no nosso banco de dados. Neste caso, vamos criar uma tabela `appointments`
    - o método `down` serve para desfazer o comando `up`. Nesse caso, vamos excluir a tabela `appointments`
```typescript
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1596771464635
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
```
- Executar a `migration`
  - Para executar todas as migrations que estiverem pendentes, digite o seguite comando:
```
$ yarn typeorm migration:run
```
- Reverter uma migration
  - Se a migration criada ainda não foi commitada para o controle de versão onde outros devs tem acesso, é possível reverter a migration utilizando o seguinte comando:
```
$ yarn typeorm migration:revert
```
- Visualizar migrations executadas
  - Para visualizar as migration executadas, utilize o seguinte comando:
```
$ yarn typeorm migration:show
```

#### Criando model de agendamento
- Referenciar o model `Appointment` à tabela `appointments` do banco de dados
  - No arquivo `./src/models/Appointment.ts` importar a função `Entity`
```typescript
import { Entity } from 'typeorm';
```
- Habilitar novas configurações no arquivo `./tsconfig.json`
  - Estas opções habilitam a utilização de `decorators` no typescript
```json
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
```
- Adicionar decorators para fazer a referencia entre o model `Appointment` e a tabela `appointments` do banco de dados
  - Quando adicionamos decorators nas nossas classes e nas propriedades, não há necessidade do construtor, pois os decorator já fazem o papel de inicializar as propriedades.
  - Abaixo serão citados os três decorators utilizados e qual o impacto na nossa rotina:
    - `@Entity`: transforma a classe `Appointment` em uma referência da tabela `appointments`
    - `@PrimaryGeneratedColumn`: referencia a coluna `id` como chave primária
    - `@Column`: referencia as colunas `provider` e `date` com os seus respectivos tipos
  - Segue copia do arquivo `./src/models/Appointment.ts`:
```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;
```
- Desabilitar a propriedade `strictPropertyInitialization` do arquivo `./tsconfig.json` para não exigir a criação de construtores nas classes dos models, visto que estamos utilizados os decorators que já são responsáveis por isso.

#### Repositório do TypeORM
- Reestruturar todo o back-end para obter os repositórios diretamente do banco de dados
  - Substituiremos a variável contendo um Array de repositórios em memória, por um Array de repositórios obtidos diretamente da base de dados
- Instalar a biblioteca `reflect-metadata`
```
$ yarn add reflect-metadata
```
- Referenciar essa biblioteca recém instalada, no arquivo `./src/server.ts`
```typescript
import 'reflect-metadata';
```
- Adicionar referencia às models no arquivo de configuração `./ormconfig.json`
```json
  "entities": [
    "./src/models/*.ts"
  ],
```
- Refatorar a classe `./src/repositories/AppointmentsRepository.ts`
  - Importar da lib `typorm` a função `EntityRepository` e a classe `Repository`
```typescript
import { EntityRepository, Repository } from 'typeorm';
```
- Excluir funções manuais
  - Manter na classe `AppointmentsRepository` apenas a função `findByDate`
  - As demais funções para criação e pesquisa de um `Appointment` serão herdadas da classe `Repository`
- Estender a classe e inserir decorator
    - Utilizar a classe `Repository` da lib `typeorm` para estender funcionalidades para a classe `AppointmentsRepository`
    - O decorator `@EntityRepository(Appointment)` deverá ser colocado acima da classe `AppointmentsRepository`
```typescript
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>
```
- Refatorar a classe `./src/services/CreateAppointmentService.ts`
  - Importar da lib `typeorm`, a função `getCustomRepository`
```typescript
import { getCustomRepository } from 'typeorm';
```
- Referenciar o nosso repositório dentro do serviço
  - Apagar o construtor do serviço
  - No início do método `execute`, referenciar o repositório
```typescript
const appointmentsRepository = getCustomRepository(AppointmentsRepository);
```
- Implementar o método para salvar o registro no banco de dados
```typescript
await appointmentsRepository.save(appointment);
```
- Refatorar o módulo de rota `./src/routes/appointments.routes.ts`
  - Importar da lib `typeorm`, a função `getCustomRepository`
```typescript
import { getCustomRepository } from 'typeorm';
```
- Ajustar os metodos `get` e `post` da rota de forma a referenciar o nosso repositório.
- Observação
  - Não esquecer `async` e `await` durante a refatoração do código, pois como as funções de acesso ao banco de dados retornam uma promise, e as chamadas são assíncronas, precisamos aguardar a resposta para tomar uma decisão.

---

## Tecnologias utilizadas

#### Dependências de Projeto
- [date-fns](https://yarnpkg.com/package/date-fns)
- [express](https://yarnpkg.com/package/express)
- [pg](https://yarnpkg.com/package/pg)
- [reflect-metadata](https://yarnpkg.com/package/reflect-metadata)
- [typeorm](https://yarnpkg.com/package/typeorm)
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
  - Este comando é utilizado apenas para gerar o pacote para publicação no ambiente de produção.
  - Durante o desevolvimento, para iniciar o serviço, utilize o próximo comando
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
