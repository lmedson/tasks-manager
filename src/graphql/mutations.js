const { GraphQLObjectType } = require('graphql');

const UsersMutations = require('./resolvers/mutations/UsersMutations');

const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    ...UsersMutations,
  },
});

module.exports = Mutations;
