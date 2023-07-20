import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from "graphql";
import { FastifyInstanceType } from "../../types/FastifyInstanceType.js";
import { postObjectType } from "../../typedefs/postObjectType.js";

export const getAllUsers = async (fInstance: FastifyInstanceType) => {
  const { prisma } = fInstance;
  return await prisma.user.findMany();
};

export const users: GraphQLFieldConfig<FastifyInstanceType, null, null> = {
  type: new GraphQLNonNull(new GraphQLList(postObjectType)),
  resolve: getAllUsers,
};