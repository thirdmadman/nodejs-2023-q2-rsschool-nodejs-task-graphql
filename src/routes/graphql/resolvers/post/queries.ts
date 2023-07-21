import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull, GraphQLResolveInfo } from 'graphql';
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

type UserType = {
  id: string,
  name: string,
  balance: number,
}

export const getPostsField: GraphQLFieldConfig<UserType, null> = {
  type: new GraphQLNonNull(new GraphQLList(postObjectType)),
  resolve: async (source: UserType, args: any, ctx: any, graphQLResolveInfo: GraphQLResolveInfo ) => {
    const res = graphQLResolveInfo.rootValue as FastifyInstanceType;
    const { prisma } = res;
    return await prisma.post.findMany({
      where: {
        authorId: source.id,
      },
    });
  }
};

export const posts: GraphQLFieldConfig<FastifyInstanceType, null, null> = {
  type: new GraphQLNonNull(new GraphQLList(postObjectType)),
  resolve: getAllPosts,
};
