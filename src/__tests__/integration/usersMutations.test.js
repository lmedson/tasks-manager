const chai = require('chai');
const faker = require('faker');
const chaiHttp = require('chai-http');

const { expect } = chai;

const server = require('../../index');

chai.use(chaiHttp);

describe('Mutations tests', () => {
  it('it should be able to create a new user', async () => {
    const body = {
      query: `
          mutation($input: NewUserInput!){
            createUser(input:$input) {
                id
                name
                age
                gender
                tasksTodo
                tasksDone
                createdAt
                updatedAt
              }
          }`,
      variables: {
        input: {
          name: 'Luke',
          age: 27,
          gender: 'Male',
          tasksTodo: ['wake up at 6h', 'go jogging at the night'],
          tasksDone: ['to visit my friends'],
        },
      },
    };

    const response = await chai
      .request(server)
      .post('/')
      .set('content-type', 'application/json')
      .send(JSON.stringify(body));

    const responseData = response.body.data.createUser;
    expect(response).to.have.status(200);
    expect(responseData)
      .to.have.property('name')
      .and.be.equal('Luke');
    expect(responseData)
      .to.have.property('age')
      .and.be.equal(27);
    expect(responseData)
      .to.have.property('tasksTodo')
      .and.be.a('array');
    expect(responseData)
      .to.have.property('tasksDone')
      .and.be.a('array');
  });

  it('it should be able to add a task for a user', async () => {
    const body = {
      query: `
          mutation($input: TasksInput!){
            addTaskToUser(input:$input) {
                id
                name
                age
                gender
                tasksTodo
                tasksDone
                createdAt
                updatedAt
              }
          }`,
      variables: {
        input: {
          id: 1,
          tasksTodo: [faker.hacker.phrase(), faker.hacker.phrase()],
          tasksDone: ['to visit my parents'],
        },
      },
    };

    const response = await chai
      .request(server)
      .post('/')
      .set('content-type', 'application/json')
      .send(JSON.stringify(body));

    const responseData = response.body.data.addTaskToUser;

    expect(response).to.have.status(200);
    expect(responseData)
      .to.have.property('name')
      .and.be.equal('Leia');
    expect(responseData)
      .to.have.property('age')
      .and.be.equal(25);
    expect(responseData)
      .to.have.property('gender')
      .and.be.equal('Female');
    expect(responseData)
      .to.have.property('tasksTodo')
      .and.be.a('array');
    expect(responseData)
      .to.have.property('tasksDone')
      .and.be.a('array');
  });

  it('it should not be able to add a task for a non existent user', async () => {
    const body = {
      query: `
          mutation($input: TasksInput!){
            addTaskToUser(input:$input) {
                id
                name
                age
                gender
                tasksTodo
                tasksDone
                createdAt
                updatedAt
              }
          }`,
      variables: {
        input: {
          id: 500,
          tasksTodo: [faker.hacker.phrase(), faker.hacker.phrase()],
        },
      },
    };

    const response = await chai
      .request(server)
      .post('/')
      .set('content-type', 'application/json')
      .send(JSON.stringify(body));

    expect(response).to.have.status(200);
    expect(response.body.errors[0])
      .to.have.property('message')
      .and.have.to.be.equal('User does not exists.');
  });

  it('it should not be able to add duplicated tasks in todoList', async () => {
    const body = {
      query: `
          mutation($input: TasksInput!){
            addTaskToUser(input:$input) {
                id
                name
                age
                gender
                tasksTodo
                tasksDone
                createdAt
                updatedAt
              }
          }`,
      variables: {
        input: {
          id: 1,
          tasksTodo: ['wake up at 6h'],
        },
      },
    };

    const response = await chai
      .request(server)
      .post('/')
      .set('content-type', 'application/json')
      .send(JSON.stringify(body));

    expect(response).to.have.status(200);
    expect(response.body.errors[0])
      .to.have.property('message')
      .and.have.to.be.equal('Task wake up at 6h already is registered.');
  });

  it('it should be able to move a task to doneList', async () => {
    const body = {
      query: `
          mutation($input: TasksInput!){
            moveTask(input:$input) {
                id
                name
                age
                gender
                tasksTodo
                tasksDone
                createdAt
                updatedAt
              }
          }`,
      variables: {
        input: {
          id: 1,
          tasksDone: [faker.hacker.phrase()],
        },
      },
    };

    const response = await chai
      .request(server)
      .post('/')
      .set('content-type', 'application/json')
      .send(JSON.stringify(body));

    const responseData = response.body.data.moveTask;

    expect(response).to.have.status(200);
    expect(responseData)
      .to.have.property('name')
      .and.be.equal('Leia');
    expect(responseData)
      .to.have.property('tasksTodo')
      .and.be.a('array');
    expect(responseData)
      .to.have.property('tasksDone')
      .and.be.a('array');
  });

  it('it should not be able to move a task to doneList with a non existent user', async () => {
    const body = {
      query: `
          mutation($input: TasksInput!){
            moveTask(input:$input) {
                id
                name
                age
                gender
                tasksTodo
                tasksDone
                createdAt
                updatedAt
              }
          }`,
      variables: {
        input: {
          id: 500,
          tasksDone: [faker.hacker.phrase()],
        },
      },
    };

    const response = await chai
      .request(server)
      .post('/')
      .set('content-type', 'application/json')
      .send(JSON.stringify(body));

    expect(response).to.have.status(200);
    expect(response.body.errors[0])
      .to.have.property('message')
      .and.have.to.be.equal('User does not exists.');
  });

  // it('it should not be able to move a duplicated tasks in done list', async () => {
  //   const body = {
  //     query: `
  //         mutation($input: TasksInput!){
  //           moveTask(input:$input) {
  //               id
  //               name
  //               age
  //               gender
  //               tasksTodo
  //               tasksDone
  //               createdAt
  //               updatedAt
  //             }
  //         }`,
  //     variables: {
  //       input: {
  //         id: 1,
  //         tasksDone: ['to visit my friends '],
  //       },
  //     },
  //   };

  //   const response = await chai
  //     .request(server)
  //     .post('/')
  //     .set('content-type', 'application/json')
  //     .send(JSON.stringify(body));
  //   console.log(response.body);
  //   expect(response).to.have.status(200);
  //   expect(response.body.errors[0])
  //     .to.have.property('message')
  //     .and.have.to.be.equal('Task to visit my friends already moved to Done list.');
  // });
});
