import {
  GraphQLFieldConfig,
  GraphQLList,
  GraphQLNonNull,
  GraphQLResolveInfo,
} from 'graphql';
import { FastifyInstanceType } from '../../types/FastifyInstanceType.js';
import { UUIDType } from '../../types/uuid.js';
import { userObjectType } from '../../typedefs/userObjectType.js';

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

type UserType = {
  id: string;
  name: string;
  balance: number;
};

export const getUserSubscribedToField: GraphQLFieldConfig<UserType, null> = {
  type: new GraphQLNonNull(new GraphQLList(userObjectType)),
  resolve: async (
    source: UserType,
    args: any,
    ctx: any,
    graphQLResolveInfo: GraphQLResolveInfo,
  ) => {
    const res = graphQLResolveInfo.rootValue as FastifyInstanceType;
    const { prisma } = res;
    return prisma.user.findMany({
      where: {
        subscribedToUser: {
          some: {
            subscriberId: source.id,
          },
        },
      },
    });
  },
};

export const getUsersSubscribedToUserField: GraphQLFieldConfig<UserType, null> = {
  type: new GraphQLNonNull(new GraphQLList(userObjectType)),
  resolve: async (
    source: UserType,
    args: any,
    ctx: any,
    graphQLResolveInfo: GraphQLResolveInfo,
  ) => {
    const res = graphQLResolveInfo.rootValue as FastifyInstanceType;
    const { prisma } = res;
    return prisma.user.findMany({
      where: {
        userSubscribedTo: {
          some: {
            authorId: source.id,
          },
        },
      },
    });
  },
};