const graphqlHTTP = require('express-graphql');

/**
 * Routes
 */
const routes = ('/graphqli',
graphqlHTTP({
  schema: {},
  graphiql: true,
}));

module.exports = routes;
