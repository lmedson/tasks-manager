const {
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');

const AddTasksInput = new GraphQLInputObjectType({
  name: 'TasksInput',
  description: 'Input of tasks actions into user',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    tasksTodo: {
      type: new GraphQLList(GraphQLString),
    },
    tasksDone: {
      type: new GraphQLList(GraphQLString),
    },
  }),
});

module.exports = AddTasksInput;
