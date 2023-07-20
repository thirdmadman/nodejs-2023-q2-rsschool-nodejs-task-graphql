import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from 'graphql';
import { FastifyInstanceType } from '../../types/FastifyInstanceType.js';
import { postObjectType } from '../../typedefs/postObjectType.js';
import { UUIDType } from '../../types/uuid.js';

export const getPostById = async (
  fInstance: FastifyInstanceType,
  { id }: { id: string },
) => {
  const { prisma } = fInstance;

  return await prisma.post.findUnique({
    where: {
      id,
    },
  });
};

export const getAllPosts = async (fInstance: FastifyInstanceType) => {
  const { prisma } = fInstance;
  return await prisma.post.findMany();
};

export const post: GraphQLFieldConfig<FastifyInstanceType, null, { id: string }> = {
  type: postObjectType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: getPostById,
};

export const posts: GraphQLFieldConfig<FastifyInstanceType, null, null> = {
  type: new GraphQLNonNull(new GraphQLList(postObjectType)),
  resolve: getAllPosts,
};
