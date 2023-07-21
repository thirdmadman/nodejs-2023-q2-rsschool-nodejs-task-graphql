import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull, GraphQLResolveInfo, GraphQLString } from 'graphql';
import { FastifyInstanceType } from '../../types/FastifyInstanceType.js';
import { memberTypeIdObjectType, memberTypeObjectType } from '../../typedefs/memberTypeObjectType.js';

export const getMemberTypeById = async (
  fInstance: FastifyInstanceType,
  { id }: { id: string },
) => {
  const { prisma } = fInstance;

  return await prisma.memberType.findUnique({
    where: {
      id,
    },
  });
};

export const getAllMemberTypes = async (fInstance: FastifyInstanceType) => {
  const { prisma } = fInstance;
  return await prisma.memberType.findMany();
};

export const memberType: GraphQLFieldConfig<FastifyInstanceType, null, { id: string }> = {
  type: memberTypeObjectType,
  args: {
    id: { type: new GraphQLNonNull(memberTypeIdObjectType) },
  },
  resolve: getMemberTypeById,
};

type ProfileType = {
  id: string,
  isMale: boolean,
  yearOfBirth: number,
  userId: string,
  memberTypeId: string,
}

export const getMemberTypeField: GraphQLFieldConfig<ProfileType, null> = {
  type: memberTypeObjectType,
  resolve: async (source: ProfileType, args: any, ctx: any, graphQLResolveInfo: GraphQLResolveInfo ) => {
    const res = graphQLResolveInfo.rootValue as FastifyInstanceType;
    const { prisma } = res;
    return await prisma.memberType.findUnique({
      where: {
        id: source.memberTypeId,
      },
    });
  },
};

export const memberTypes: GraphQLFieldConfig<FastifyInstanceType, null, null> = {
  type: new GraphQLNonNull(new GraphQLList(memberTypeObjectType)),
  resolve: getAllMemberTypes,
};
