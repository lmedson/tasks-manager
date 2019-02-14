const graphqlHTTP = require('express-graphql');

/**
 * Routes
 */
const routes = ('/',
graphqlHTTP({
  schema: {},
  graphiql: true,
}));

module.exports = routes;
