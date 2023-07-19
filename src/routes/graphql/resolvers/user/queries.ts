import { FastifyInstanceType } from "../../types/FastifyInstanceType.js";

export const getAllUsers = async (fInstance: FastifyInstanceType) => {
  const { prisma } = fInstance;
  return await prisma.user.findMany();
};