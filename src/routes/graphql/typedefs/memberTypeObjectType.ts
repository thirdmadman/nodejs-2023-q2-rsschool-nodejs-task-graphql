import { GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const memberTypeObjectType = new GraphQLObjectType({
  name: "MemberType",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
  }),
})