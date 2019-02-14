const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');

const queries = require('./graphql/queries');
const mutations = require('./graphql/mutations');

/**
 * Routes
 */
const routes = ('/',
graphqlHTTP({
  schema: new GraphQLSchema({ query: queries, mutation: mutations }),
  graphiql: true,
}));

module.exports = routes;
