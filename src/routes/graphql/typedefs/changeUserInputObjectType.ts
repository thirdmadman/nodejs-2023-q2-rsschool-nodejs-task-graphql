import { GraphQLInputObjectType, GraphQLString } from "graphql";

export const changeUserInputObjectType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
  },
});