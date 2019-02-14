const { UserType } = require('../../types/');
const db = require('../../../database/connection');

module.exports = {
  createUser: {
    type: UserType,
    resolve: async (_, args, ctx) => {
      const e = await db('users')
        .select('*')
        .returning('*');

      return e[0];
    },
  },
};
