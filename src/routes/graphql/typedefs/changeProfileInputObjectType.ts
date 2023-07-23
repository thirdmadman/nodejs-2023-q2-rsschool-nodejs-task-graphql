import { GraphQLBoolean, GraphQLInputObjectType } from "graphql";

export const changeProfileInputObjectType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
  },
});