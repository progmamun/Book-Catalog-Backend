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

export const CategoryService = {
  createCategory,
};
