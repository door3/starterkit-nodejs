<p align="center">
  <a href="https://door3.com/" target="blank">
    <img src="https://www.door3.com/sites/all/themes/custom/door3/logo.png" />
  </a>
  <br/>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="160" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This starter project comes preconfigured with the following features:

* Docker support
* Dockerized databases postgres, mysql, and mssql (up to you)
* Debugging locally or within a container
* Typescript support
* Typeorm for database objects and schema migrations
* Configuration management
* Logging

And more to come...

## Installation

```bash
$ npm install
```

## Configuration

The application accepts environment variables. You can pass enviroment variables directly or via `.env` file. (__DO NOT CHECK .env FILES INTO SOURCE CONTROL__)
Environment variables are provided to the app via the `ConfigService` located at `app/src/common/services/config.service.ts`.

Environment variables are grouped via config providers, such as the `AppConfigProvider` class. Additional providers may added as necessary. The application should try to avoid using `process.env` when possible.

## Running the app locally

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Debugging locally
To debug the application locally you can use one of two methods.

__VSCode__
* Click the debug panel and select `Local: Attach to Node` config and then click run.

__Chrome__

1) run `npm run start:debug`
2) navigate to [chrome://inspect](chrome://inspect) and click `inspect` under REMOTE TARGET.

## Running in a container
```bash
# building dev container
$ docker-compose -f ./docker-compose.dev.yml up --build

# building debug container
$ docker-compose -f ./docker-compose.debug.yml up --build
```

## Debugging in a container
Once the debug container is running you can launch the debugger from either Chrome or VSCode.

__VSCode:__
Click the debug panel and select `Docker: Attach to Node` config and then click run.

__Chrome:__
navigate to [chrome://inspect](chrome://inspect) and click `inspect` under REMOTE TARGET.


## Databases in a container

This starter project comes pre-configured with three databases. Click on each for instructions on how to get started. Feel free to remove whichever ones your application does not need. To remove the unnecessary databases just delete their configurations from all docker-compose files.

* [postgres](./database/postgres/README.md)
* [mysql](./database/mysql/README.md)
* [mssql](./database/mssql/README.md)


### Connecting to databases

Once you have the containers up, run the following command to choose the database you wish to connect to.
```bash
$ docker-compose -f docker-compose.dev.yml ps
```
Using the Name of the container output above, connect using the appropriate command listed below:

__Postgresql__
```bash
$ docker exec -it [NAME] psql -U admin development
```

__MySQL__
```bash
$ docker exec -it [NAME] mysql -u root -p development
```

__MSSQL__
```bash
$ docker exec -it [NAME] /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "[SA_PASSWORD]"
```

## ORM
This starter project supports an orm called [TypeORM](https://typeorm.io/) in the `Data` module located at `app/src/modules/Data`. This ORM will work with any of the above databases.

### Database connection
The connection to the database is controlled by `db.config.ts` file located at the root of the `Data` module.
This configuration also tells the cli where it can find migrations and entity classes.

### Entities
This project comes with a sample entity called `user` located `app/src/modules/Data/entities/user.entity.ts`. There is also a sample repository class for `users`.
Entities will map to a database table and are classes decorated with `@Entity()` decorator.
Entities will be used by the `TypeORM` cli to generate migrations.

### Migrations
This starter project comes configured with a npm script to generate, run, and revert migrations scripts, `typeorm:data`. To learn how migrations work see [here](https://typeorm.io/#/migrations).

__NOTE__: Be sure the database is running before generating, running, or reverting any migration script.

__NOTE__: Due to the differences between database types (postgres, mysql, mssql) migrations scripts are database specific. A migration script for postgres will not work on mssql for example.

To create an empty migration use the following command:
```bash
$ npm run typeorm:data migration:create -- -n [MigrationName]
```

To generate a migration for new entities or entity changes
```bash
$ npm run typeorm:data migration:generate -- -n [MigrationName]
```

To apply the latest migrations to the database
```bash
$ npm run typeorm:data migration:run
```

To revert the last migration applied to the database
```bash
$ npm run typeorm:data migration:revert
```

__NOTE__: When the application runs it will automatically apply any new migrations to the database.

### Multiple databases

If your application requires multiple databases you are in luck, this project can be easily modified to support it.
Duplicate the `Data` module and update the new `db.config.ts` file to work with the new database env variables and entities/migrations directory.
You must also duplicate the npm `typeorm:data` script (i.e. `typeorm:newdb`), update it to point to the new `db.config.ts` file.

This will allow you to maintain two databases keeping their migrations and entities separate. You may repeat this process for each additional database.


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

