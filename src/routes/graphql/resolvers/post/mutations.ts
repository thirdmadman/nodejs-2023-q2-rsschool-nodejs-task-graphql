import { GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import { FastifyInstanceType } from "../../types/FastifyInstanceType.js";
import { postObjectType } from "../../typedefs/postObjectType.js";
import { createPostInputObjectType } from "../../typedefs/createPostInputObjectType.js";

type PostDTO = {
  title: string,
  content: string,
  authorId: string,
}

const createPostByDTO = async (
  fInstance: FastifyInstanceType,
  { dto } : { dto: PostDTO },
) => {
  const { prisma } = fInstance;
  return prisma.post.create({
    data: dto,
  });
};

export const createPost: GraphQLFieldConfig<FastifyInstanceType, null, { dto: PostDTO }> = {
  type: new GraphQLNonNull(postObjectType),
  args: {
    dto: { type: createPostInputObjectType },
  },
  resolve: createPostByDTO,
};