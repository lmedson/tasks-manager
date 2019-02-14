const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const { GraphQLDateTime } = require('graphql-iso-date');

const Usuario = new GraphQLObjectType({
  name: 'Usuario',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: parent => parent.id,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: parent => parent.name,
    },
    age: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: parent => parent.age,
    },
    gender: {
      type: GraphQLString,
      resolve: parent => parent.gender,
    },
    tasksTodo: {
      type: new GraphQLList(GraphQLString),
      resolve: parent => parent.tasksTodo,
    },
    tasksDone: {
      type: new GraphQLList(GraphQLString),
      resolve: parent => parent.tasksDone,
    },
    created_at: {
      type: new GraphQLNonNull(GraphQLDateTime),
      resolve: obj => obj.created_at,
    },
    updated_at: {
      type: new GraphQLNonNull(GraphQLDateTime),
      resolve: obj => obj.updated_at,
    },
  }),
});

module.exports = Usuario;
