const chai = require('chai');
const chaiHttp = require('chai-http');
const { GraphQLID } = require('graphql');

const { expect } = chai;

const server = require('../../index');

chai.use(chaiHttp);

describe('Queries tests', () => {
  it('it should be able to get all users', async () => {
    const body = {
      query: `
          query getUser{
            getUsers{
                name
              }
          }`,
    };

    const response = await chai
      .request(server)
      .post('/')
      .set('content-type', 'application/json')
      .send(JSON.stringify(body));

    expect(response).to.have.status(200);
    expect(response.body.data.getUsers[0])
      .to.have.property('name')
      .and.be.equal('Leia');
  });

  it('it should be able to get all users', async () => {
    const body = {
      query: `
          query GetUser($id: ID!){
            getUserById(id: $id) {
              name
              id
              gender
            }
          }`,
      variables: {
        id: 1,
      },
    };

    const response = await chai
      .request(server)
      .post('/')
      .set('content-type', 'application/json')
      .send(JSON.stringify(body));

    const responseData = response.body.data.getUserById;

    expect(response).to.have.status(200);
    expect(responseData)
      .to.have.property('name')
      .and.be.equal('Leia');
    expect(responseData)
      .to.have.property('id')
      .and.be.equal('1');
    expect(responseData)
      .to.have.property('gender')
      .and.be.equal('Female');
  });
});
