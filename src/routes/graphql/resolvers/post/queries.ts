import { FastifyInstanceType } from "../../types/FastifyInstanceType.js";

export const getPostById = async (fInstance: FastifyInstanceType, { id }: { id: string }) => {
  const { prisma } = fInstance;

  return await prisma.post.findUnique({
    where: {
      id,
    },
  })
};

export const getAllPosts = async (fInstance: FastifyInstanceType) => {
  const { prisma } = fInstance;
  return await prisma.post.findMany();
};