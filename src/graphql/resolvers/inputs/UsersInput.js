const {
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

const NewUserInput = new GraphQLInputObjectType({
  name: 'NewUserInput',
  description: 'Input of newUser',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    age: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    gender: {
      type: new GraphQLNonNull(GraphQLString),
    },
    tasksTodo: {
      type: new GraphQLList(GraphQLString),
    },
    tasksDone: {
      type: new GraphQLList(GraphQLString),
    },
  }),
});

module.exports = NewUserInput;
