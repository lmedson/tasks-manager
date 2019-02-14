const { GraphQLObjectType } = require('graphql');
const { UsersQueries } = require('./resolvers/queries');

const Queries = new GraphQLObjectType({
  name: 'Queries',
  fields: {
    ...UsersQueries,
  },
});

module.exports = Queries;
