const { UserType } = require('../../types/');
const NewUserInput = require('../inputs/UsersInput');
const db = require('../../../database/connection');

module.exports = {
  createUser: {
    type: UserType,
    args: {
      input: {
        type: NewUserInput,
      },
    },
    resolve: async (_, { input }) => {
      const [user] = await db('users')
        .insert({
          name: input.name,
          age: input.age,
          gender: input.gender,
          tasksTodo: input.tasksTodo,
          tasksDone: input.tasksDone,
        })
        .returning('*');

      return user;
    },
  },

  // addTaskToUser: {
  // },

  // updateTaskFromUser: {
  // },

  // removeTaskFromUser: {
  // },
};
