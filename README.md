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

## Installation

```bash
$ npm install
```

## Configuration

The application accepts environment variables. You can pass enviroment variables directly or via `.env` file. (__DO NOT CHECK .env FILES INTO SOURCE CONTROL__)
Environment variables are provided to the app via the `ConfigService` located at `app/src/common/services/config.service.ts`.

Environment variables are grouped via config providers, such as the `AppConfigProvider` and `DBConfigProvider` class. Additional providers may added as necessary. The application should avoid using `process.env` directly.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running in a container
```bash
# building dev container
$ docker build -t door3/starter-nodejs -f Dockerfile.dev .

# running dev container
$ docker run -p 3000:3000 door3/starter-nodejs

# building debug container
$ docker build -t door3/starter-nodejs:debug -f Dockerfile.debug .

#running debug container
$ docker run -p 3000:3000 -p 9229:9229 door3/starter-nodejs:debug
```

Once the debug container is running you can launch the debugger from either Chrome or VSCode.

__Chrome:__
navigate to [chrome://inspect](chrome://inspect) and click `inspect` under REMOTE TARGET.

__VSCode:__
Click the debug panel and select `Docker: Attach to Node` config and then click run.

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

