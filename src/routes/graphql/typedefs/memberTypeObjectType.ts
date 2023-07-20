import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";

export const memberTypeIdObjectType = new GraphQLEnumType({
  name: "MemberTypeId",
  values: {
    basic: { value: "basic" },
    business: {value: "business" },
  },
})

export const memberTypeObjectType = new GraphQLObjectType({
  name: "MemberType",
  fields: () => ({
    id: { type: new GraphQLNonNull(memberTypeIdObjectType) },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
  }),
})