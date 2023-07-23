import { changePostInputObjectType } from './../../typedefs/changePostInputObjectType.js';
import { GraphQLBoolean, GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { FastifyInstanceType } from '../../types/FastifyInstanceType.js';
import { postObjectType } from '../../typedefs/postObjectType.js';
import { createPostInputObjectType } from '../../typedefs/createPostInputObjectType.js';
import { UUIDType } from '../../types/uuid.js';

type PostDTO = {
  title: string;
  content: string;
  authorId: string;
};

const createPostByDTO = async (
  fInstance: FastifyInstanceType,
  { dto }: { dto: PostDTO },
) => {
  const { prisma } = fInstance;
  return prisma.post.create({
    data: dto,
  });
};

export const createPost: GraphQLFieldConfig<FastifyInstanceType, null, { dto: PostDTO }> =
  {
    type: new GraphQLNonNull(postObjectType),
    args: {
      dto: { type: createPostInputObjectType },
    },
    resolve: createPostByDTO,
  };

const deletePostById = async (fInstance: FastifyInstanceType, { id }: { id: string }) => {
  const { prisma } = fInstance;
  await prisma.post.delete({
    where: {
      id,
    },
  });
};

export const deletePost: GraphQLFieldConfig<FastifyInstanceType, null, { id: string }> = {
  type: GraphQLBoolean,
  args: { id: { type: new GraphQLNonNull(UUIDType) } },
  resolve: deletePostById,
};

const changePostByIdAndDTO = async (
  fInstance: FastifyInstanceType,
  { id, dto: { title } }: { id: string; dto: { title: string } },
) => {
  const { prisma } = fInstance;
  return await prisma.post.update({
    where: { id },
    data: {
      title,
    },
  });
};

export const changePost: GraphQLFieldConfig<
  FastifyInstanceType,
  null,
  { id: string; dto: { title: string } }
> = {
  type: postObjectType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: changePostInputObjectType },
  },
  resolve: changePostByIdAndDTO,
};
