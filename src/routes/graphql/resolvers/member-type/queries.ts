import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
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

export const memberTypes: GraphQLFieldConfig<FastifyInstanceType, null, null> = {
  type: new GraphQLNonNull(new GraphQLList(memberTypeObjectType)),
  resolve: getAllMemberTypes,
};
