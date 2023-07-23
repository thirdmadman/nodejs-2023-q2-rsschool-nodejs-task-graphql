import { GraphQLBoolean, GraphQLInputObjectType, GraphQLNonNull } from "graphql";

export const changeProfileInputObjectType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});