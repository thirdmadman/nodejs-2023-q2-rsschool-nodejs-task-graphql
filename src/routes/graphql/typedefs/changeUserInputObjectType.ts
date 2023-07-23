import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";

export const changeUserInputObjectType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});