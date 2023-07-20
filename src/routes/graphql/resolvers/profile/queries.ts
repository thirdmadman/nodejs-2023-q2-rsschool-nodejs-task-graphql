import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from 'graphql';
import { FastifyInstanceType } from '../../types/FastifyInstanceType.js';
import { UUIDType } from '../../types/uuid.js';
import { profileObjectType } from '../../typedefs/profileObjectType.js';

export const getProfileById = async (
  fInstance: FastifyInstanceType,
  { id }: { id: string },
) => {
  const { prisma } = fInstance;

  return await prisma.profile.findUnique({
    where: {
      id,
    },
  });
};

export const getAllProfiles = async (fInstance: FastifyInstanceType) => {
  const { prisma } = fInstance;
  return await prisma.profile.findMany();
};

export const profile: GraphQLFieldConfig<FastifyInstanceType, null, { id: string }> = {
  type: profileObjectType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: getProfileById,
};

export const profiles: GraphQLFieldConfig<FastifyInstanceType, null, null> = {
  type: new GraphQLNonNull(new GraphQLList(profileObjectType)),
  resolve: getAllProfiles,
};
