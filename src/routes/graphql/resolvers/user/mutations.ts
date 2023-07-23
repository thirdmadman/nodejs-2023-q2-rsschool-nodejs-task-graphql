import { GraphQLBoolean, GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { FastifyInstanceType } from '../../types/FastifyInstanceType.js';
import { createUserInputObjectType } from '../../typedefs/createUserInputObjectType copy.js';
import { userObjectType } from '../../typedefs/userObjectType.js';
import { UUIDType } from '../../types/uuid.js';
import { changeUserInputObjectType } from '../../typedefs/changeUserInputObjectType.js';

type UserDTO = {
  name: string;
  balance: number;
};

const createUserByDTO = async (
  fInstance: FastifyInstanceType,
  { dto }: { dto: UserDTO },
) => {
  const { prisma } = fInstance;
  return prisma.user.create({
    data: dto,
  });
};

export const createUser: GraphQLFieldConfig<FastifyInstanceType, null, { dto: UserDTO }> =
  {
    type: new GraphQLNonNull(userObjectType),
    args: {
      dto: { type: createUserInputObjectType },
    },
    resolve: createUserByDTO,
  };

const deleteUserById = async (fInstance: FastifyInstanceType, { id }: { id: string }) => {
  const { prisma } = fInstance;
  await prisma.user.delete({
    where: {
      id,
    },
  });
};

export const deleteUser: GraphQLFieldConfig<FastifyInstanceType, null, { id: string }> = {
  type: GraphQLBoolean,
  args: { id: { type: new GraphQLNonNull(UUIDType) } },
  resolve: deleteUserById,
};

const changeUserByIdAndDTO = async (
  fInstance: FastifyInstanceType,
  { id, dto: { name } }: { id: string; dto: { name: string } },
) => {
  const { prisma } = fInstance;
  return await prisma.user.update({
    where: { id },
    data: {
      name,
    },
  });
};

export const changeUser: GraphQLFieldConfig<
  FastifyInstanceType,
  null,
  { id: string; dto: { name: string } }
> = {
  type: userObjectType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(changeUserInputObjectType) },
  },
  resolve: changeUserByIdAndDTO,
};

const subscribeToByUUID = async (fInstance: FastifyInstanceType, { userId, authorId }: { userId: string; authorId: string; }) => {
  const { prisma } = fInstance;
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      userSubscribedTo: {
        create: {
          authorId: authorId,
        },
      },
    },
  });
};

export const subscribeTo: GraphQLFieldConfig<
  FastifyInstanceType,
  null,
  { userId: string; authorId: string; }
> = {
  type: userObjectType,
  args: {
    userId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: subscribeToByUUID,
};

const unsubscribeFromByUUID = async (fInstance: FastifyInstanceType, { userId, authorId }: { userId: string; authorId: string; }) => {
  const { prisma } = fInstance;
  await prisma.subscribersOnAuthors.delete({
    where: {
      subscriberId_authorId: {
        subscriberId: userId,
        authorId: authorId,
      },
    },
  });
};

export const unsubscribeFrom: GraphQLFieldConfig<
  FastifyInstanceType,
  null,
  { userId: string; authorId: string; }
> = {
  type: GraphQLBoolean,
  args: {
    userId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: unsubscribeFromByUUID,
};
