# TASK MANAGER - a simple api to set todo lists

Structure for system :open_file_folder: :octocat:

[![NPM](https://img.shields.io/badge/npm-v6.4.1-blue.svg?style=for-the-badge)](https://www.npmjs.com/) [![NODE](https://img.shields.io/badge/node-v10.15.1-blue.svg?style=for-the-badge)](https://nodejs.org/en//)

## 1 - Setup Manually

## 1.2 - Configurate enviroment variables

You should setup the enviroment vars in the folder `src/config/` in the the file `.env` like `.env.example`.

## 1.3 - Install

Make sure you have the recommended `node` and `npm` or `yarn` versions in this README. If everything is correct run this command in client and server folders, in your terminal:

`$ npm install` or `$ yarn`

## 1.4 - Make migrations

After install packages and setup enviroment variables, do the migration in database. You must be in folder `src/database`.

1. `knex migrate:latest`
2. `knex seed:run`

## 1.5 - Using

Make sure you have installed all the dependencies. In client and server roots :

`$ npm start` or `$ yarn start`

## 1.6 - Result

If everything goes well you will have this result in your terminal:

`Server is running on port 3000`.

And, you can access the graphql interface in your browser, by `http://localhost:3000/`

## 1.7 - Testing

- The tests can be done through the command `$ npm test` or `$ yarn test`, in folder of project.
- For coverage test, you should run with `$ npm test:coverage` or `yarn test:coverage`. After you can see coverage test in folder `/src/__tests__/coverage` opening in your browser the file index.html inside `/coverage`.

## 2 - Running all with docker :whale2:

- First, you should configurate `.env` like in the example file in path `src/config/.env.example`, set in all variables of db(`DB_NAME, DB_USER, DB_PASS, DB_CLIENT`) the value **postgres** and `DB_HOST` must be equal the name of the postgres docker service, which is **db**. Example:

```
PORT=<some-value>
DB_NAME=postgres
DB_USER=postgres
DB_PASS=postgres
DB_CLIENT=postgres
DB_HOST=db
```

- Second, after of enviroments configurations, and ports set, you can run the aplication with command, `$ docker-compose up`.

- Third, for tests in docker, after run the compose file, you can access the container with app service with `$ docker exec -i -t api /bin/bash`, and in the bash you can run the command for tests, `$ npm test`.

## 3 - Quering

```graphql

Creating a user
  mutation{
    createUser(input:{
      name:"Jane",
      age:32,
      gender: "Female",
      tasksTodo:["buy a aw", "buy a house","buy a house","buy a car"],
    }){
      id
      name
      age
      tasksTodo
      tasksDone
      createdAt
      updatedAt
    }
  }

Adding tasks into user todo list
  mutation{
   addTaskToUser(input:{
      id:2,
      tasksTodo:["go to class", "feed my cat"],
  }){
    tasksTodo
    tasksDone
    ...
  }
}

Moving tasks into user done list
  mutation{
      moveTask(input:{
        id:2,
        tasksDone:["wake up at 6h"],
      }){
        tasksTodo
        tasksDone
        ...
      }
    }

Getting all users
  query{
    getUsers{
      id
      name
      tasksDone
      tasksTodo
      gender
      ...
    }
  }

Getting user by id
  query{
    getUserById(id:1){
      name
      gender
      id
      ...
    }
  }
```
