# Koa Server

Node.js service using Koa.


## Prerequisites & Requirements

For local
* Node.js 8+

For docker
* Docker & Docker Compose


## Getting Started

Rename `.env.sample` to `.env` and update the values accordingly. (the default values should suffice for development using docker)

## Local

### Setup

Run `npm install` to install dependencies.

### Run

Run `npm start` to start, or `npm run watch` to start the server on development mode.

### Testing

Currently the service has http integration tests.

## Docker
### Setup and Run

Simply run `docker-compose up app` and the server will automatically be setup and be served on localhost:3030.

### Testing

To run all tests simply run `docker-compose run test`. If you want to manually execute tests you can run `docker-compose run --rm test bash` to start everything and bash yourself into the app in the test environment. There you can manually run commands like `npm run test` (full scripts list on package.json) or even start mocha by yourself.

## Debugging
Whenever you start the app on watch mode (local or docker) a debugger server will be available on port 9229 for you to attach your preffered debugging client.
