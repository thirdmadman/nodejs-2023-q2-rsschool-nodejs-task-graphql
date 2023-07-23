import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";

export const changePostInputObjectType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
  },
});