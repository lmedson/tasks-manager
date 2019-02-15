const { UserType } = require('../../types/');
const { UsersInput, TasksInput } = require('../inputs/');
const db = require('../../../database/connection');

module.exports = {
  createUser: {
    type: UserType,
    args: {
      input: {
        type: UsersInput,
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

  addTaskToUser: {
    type: UserType,
    args: {
      input: {
        type: TasksInput,
      },
    },
    resolve: async (_, { input }) => {
      const { id, tasksTodo } = input;

      const [user] = await db('users')
        .where({
          id,
        })
        .returning('*');

      if (!user) {
        throw new Error('User does not exists.');
      }

      tasksTodo.map((td) => {
        if (user.tasksTodo.includes(td)) {
          throw new Error(`Task ${td} already is registered.`);
        }
        user.tasksTodo.push(td);

        return td;
      });

      await db('users')
        .where({ id })
        .update({ tasksTodo: user.tasksTodo })
        .returning('*');

      return user;
    },
  },

  moveTask: {
    type: UserType,
    args: {
      input: {
        type: TasksInput,
      },
    },
    resolve: async (_, { input }) => {
      const { id, tasksDone } = input;
      const [user] = await db('users')
        .where({
          id,
        })
        .returning('*');

      if (!user) {
        throw new Error('User does not exists.');
      }

      tasksDone.map((td) => {
        if (user.tasksTodo.includes(td)) {
          const tsk = user.tasksTodo.indexOf(td);
          user.tasksTodo.splice(tsk, 1);
        }

        user.tasksDone.push(td);
        return td;
      });

      await db('users')
        .where({ id })
        .update({ tasksDone: user.tasksDone })
        .returning('*');

      return user;
    },
  },
};
