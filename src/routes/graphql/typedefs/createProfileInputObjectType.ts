import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull } from "graphql";
import { UUIDType } from "../types/uuid.js";
import { memberTypeIdObjectType } from "./memberTypeObjectType.js";

export const createProfileInputObjectType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(memberTypeIdObjectType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
  },
});
