import { Category } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createCategory = async (userData: Category): Promise<Category> => {
  const newData = await prisma.category.create({
    data: {
      ...userData,
    },
  });

  return newData;
};

const getAllCategory = async (): Promise<Category[] | null> => {
  const result = await prisma.category.findMany({});
  return result;
};

const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: { id: id },
    include: {
      books: true,
    },
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategory,
  getSingleCategory,
};
