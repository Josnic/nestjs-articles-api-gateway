<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript Api Gateway. This Api works with Mysql using ```TYPEORM``` and implements ```JWT``` Authorization for protect one endpoint (articles list). Of course, the api has a login endpoint. 

The credentials to use are:

```bash
username: admin
password: admin
```
These credentials will be loaded by migrations.
## Installation

Engine: ```NodeJS v14.19.3``` and ```NPM 6.14.17```. 

To install dependecies the command is:

```bash
$ npm install
```
NOTE: If you have a issue with that, please remove ```package-lock.json``` and try again.

## Migration

The Api already has the migration, just need to run it. Before run it, it´s necesary to create the environment file ```.env``` taking ```env.example``` as template for database configuration. So, you must modify the ```ormconfig.ts``` localized in the path ```database/ormconfig.ts```:

```typescript
export const connection : DataSourceOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST || "localhost", //here
    port: parseInt(process.env.DATABASE_PORT) || 3306,//here
    username: process.env.DATABASE_USER || "root",//here
    password: process.env.DATABASE_PASSWORD || "",//here
    database: process.env.DATABASE_NAME || "test",//here
    entities: [join(__dirname, '../api/**/*.entity{.ts,.js}')],

    synchronize: false,

    migrationsRun: false,
    logging: true,
    migrations: [
      join(__dirname, 'migrations/*{.ts,.js}')
    ]
}
```
That´s necesary because ```TYPEORM``` doesn´t support environment variables (sorry).

Now, to create the tables and insert the credentials in user table, only run:

```bash
$ npm run typeorm:run
```

## Running the app

The Api uses the PORT: 4000

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

When the Api is working, the documentation is [http://localhost:4000/docs](http://localhost:4000/docs)

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
