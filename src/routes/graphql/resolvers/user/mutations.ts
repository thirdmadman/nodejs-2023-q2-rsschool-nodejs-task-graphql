import { GraphQLBoolean, GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import { FastifyInstanceType } from "../../types/FastifyInstanceType.js";
import { createUserInputObjectType } from "../../typedefs/createUserInputObjectType copy.js";
import { userObjectType } from "../../typedefs/userObjectType.js";
import { UUIDType } from "../../types/uuid.js";

type UserDTO = {
  name: string,
  balance: number,
}

const createUserByDTO = async (
  fInstance: FastifyInstanceType,
  { dto } : { dto: UserDTO},
) => {
  const { prisma } = fInstance;
  return prisma.user.create({
    data: dto,
  });
};

export const createUser: GraphQLFieldConfig<FastifyInstanceType, null, { dto: UserDTO}> = {
  type: new GraphQLNonNull(userObjectType),
  args: {
    dto: { type: createUserInputObjectType },
  },
  resolve: createUserByDTO,
};


const deleteUserById = async (fInstance: FastifyInstanceType, {id} : { id: string }) => {
  const { prisma } = fInstance;
  await prisma.user.delete({
    where: {
      id,
    },
  });
};

export const deleteUser: GraphQLFieldConfig<FastifyInstanceType, null, { id: string }> = {
  type: GraphQLBoolean,
  args: { id: { type: new GraphQLNonNull(UUIDType)}},
  resolve: deleteUserById,
};