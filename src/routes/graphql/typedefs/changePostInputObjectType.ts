import { GraphQLInputObjectType, GraphQLString } from "graphql";

export const changePostInputObjectType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    title: { type: GraphQLString },
  },
});