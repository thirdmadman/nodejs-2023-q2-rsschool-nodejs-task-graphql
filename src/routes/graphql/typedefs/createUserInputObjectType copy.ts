import { GraphQLFloat, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";

export const createUserInputObjectType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});
