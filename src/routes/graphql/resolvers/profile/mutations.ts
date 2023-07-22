import { GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import { FastifyInstanceType } from "../../types/FastifyInstanceType.js";

import { profileObjectType } from "../../typedefs/profileObjectType.js";
import { createProfileInputObjectType } from "../../typedefs/createProfileInputObjectType.js";

type ProfileDTO = {
  userId: string,
  memberTypeId: string,
  isMale: boolean,
  yearOfBirth: number,
}

const createProfileByDTO = async (
  fInstance: FastifyInstanceType,
  { dto } : { dto: ProfileDTO},
) => {
  const { prisma } = fInstance;
  return prisma.profile.create({
    data: dto,
  });
};

export const createProfile: GraphQLFieldConfig<FastifyInstanceType, null, { dto: ProfileDTO}> = {
  type: new GraphQLNonNull(profileObjectType),
  args: {
    dto: { type: createProfileInputObjectType },
  },
  resolve: createProfileByDTO,
};