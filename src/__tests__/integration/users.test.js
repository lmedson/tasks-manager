const chai = require('chai');
const chaiHttp = require('chai-http');
require('dotenv').config({ path: '../../config/.env' });
const knex = require('knex')({
  client: 'postgres',
  connection: {
    user: 'postgres',
    password: 'postgres',
    database: 'test-task',
  },
});

const { expect } = chai;

const server = require('../../index');

chai.use(chaiHttp);

describe('', () => {
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
                created_at
                updated_at
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

  // it('it should be able to add a task for a user', async () => {
  //   const [user] = await knex('users')
  //     .insert({
  //       name: 'Leia',
  //       age: 25,
  //       tasksTodo: ['wake up at 6h', 'go jogging at the night'],
  //       tasksDone: ['to visit my friends'],
  //     })
  //     .returning('*');

  //   const body = {
  //     query: `
  //         mutation($input: TasksInput!){
  //           addTaskToUser(input:$input) {
  //               id
  //               name
  //               age
  //               gender
  //               tasksTodo
  //               tasksDone
  //               created_at
  //               updated_at
  //             }
  //         }`,
  //     variables: {
  //       input: {
  //         id: user.id,
  //         tasksTodo: ['wake up at 13h', 'go jogging at the afternoon'],
  //         tasksDone: ['to visit my parents'],
  //       },
  //     },
  //   };

  //   const response = await chai
  //     .request(server)
  //     .post('/')
  //     .set('content-type', 'application/json')
  //     .send(JSON.stringify(body));
  //   console.log(response.body);

  //   const responseData = response.body.data.addTaskToUser;

  //   expect(response).to.have.status(200);
  //   expect(responseData)
  //     .to.have.property('name')
  //     .and.be.equal('Leia');
  //   expect(responseData)
  //     .to.have.property('age')
  //     .and.be.equal(25);
  //   expect(responseData)
  //     .to.have.property('gender')
  //     .and.be.equal('Female');
  //   expect(responseData)
  //     .to.have.property('tasksTodo')
  //     .and.be.a('array');
  //   expect(responseData)
  //     .to.have.property('tasksDone')
  //     .and.be.a('array');
  // });
});
