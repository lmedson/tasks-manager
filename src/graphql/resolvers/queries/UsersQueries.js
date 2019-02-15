const { GraphQLID, GraphQLNonNull, GraphQLList } = require('graphql');
const { UserType } = require('../../types/');
const db = require('../../../database/connection');

module.exports = {
  getUsers: {
    type: GraphQLList(UserType),
    resolve: async () => {
      const users = await db('users')
        .select('*')
        .orderBy('id')
        .returning('*');
      return users;
    },
  },
  getUserById: {
    type: UserType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_, args) => {
      const { id } = args;
      const [user] = await db('users')
        .where({ id })
        .returning('*');

      return user;
    },
  },
};
