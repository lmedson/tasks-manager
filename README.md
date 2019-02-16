# TASK MANAGER - a simple api to set todo lists

Structure for system :open_file_folder: :octocat:

[![NPM](https://img.shields.io/badge/npm-v6.4.1-blue.svg?style=for-the-badge)](https://www.npmjs.com/) [![NODE](https://img.shields.io/badge/node-v10.15.1-blue.svg?style=for-the-badge)](https://nodejs.org/en//)

## Configurate enviroment variables

You should setup the enviroment vars in the folder `src/config/` in the the file `.env` like `.env.example`. If you are going to use docker, remember to put the service name of the docker database in the variable DB_HOST, `DB_HOST=db`.

## Install

Make sure you have the recommended `node` and `npm` or `yarn` versions in this README. If everything is correct run this command in client and server folders, in your terminal:

`$ npm install` or `$ yarn`

## Make migrations

After install packages and setup enviroment variables, do the migration in database. You must be in folder `src/database`.

1. `knex migrate:latest`
2. `knex seed:run`

## Using

Make sure you have installed all the dependencies. In client and server roots :

`$ npm start` or `$ yarn start`

## Result

If everything goes well you will have this result in your terminal:

`Server is running on port 3000`.

And, you can access the graphql interface in your browser, by `http://localhost:3000/`

## Testing

- The tests can be done through the command `$ npm test` or `$ yarn test`, in folder of project.
- For coverage test, you should run with `$ npm test:coverage` or `yarn test:coverage`. After you can see coverage test in folder `/src/__tests__/coverage` opening in your browser the file index.html inside `/coverage`.

## Running all with docker :whale2:

- First, you should configurate .env like in the example file `.env.example`, and the `DB_HOST` must be equal the name of the postgres docker service, which is `db`. The variable DB_HOST should look like`DB_HOST=postgres`.

- Second, after of enviroments configurations, and ports set, you can run the aplication with command, `$ docker-compose up`.

- Third, for tests in docker, after run the compose file, you can access the container with app service with `$ docker exec -i -t api /bin/bash`, and in the bash you can run the command for tests, `$ npm test`.
