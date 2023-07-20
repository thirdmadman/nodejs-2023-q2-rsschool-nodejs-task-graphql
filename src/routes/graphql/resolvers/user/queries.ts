import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from "graphql";
import { FastifyInstanceType } from "../../types/FastifyInstanceType.js";
import { UUIDType } from "../../types/uuid.js";
import { userObjectType } from "../../typedefs/userObjectType.js";

export const getAllUsers = async (fInstance: FastifyInstanceType) => {
  const { prisma } = fInstance;
  return await prisma.user.findMany();
};

export const getUserById = async (
  fInstance: FastifyInstanceType,
  { id }: { id: string },
) => {
  const { prisma } = fInstance;

  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const users: GraphQLFieldConfig<FastifyInstanceType, null, null> = {
  type: new GraphQLNonNull(new GraphQLList(userObjectType)),
  resolve: getAllUsers,
};

export const user: GraphQLFieldConfig<FastifyInstanceType, null, { id: string }> = {
  type: userObjectType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: getUserById,
}; 