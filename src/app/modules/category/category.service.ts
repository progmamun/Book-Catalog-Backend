import { Category } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
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
  const isExist = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "category not found!");
  }

  const result = await prisma.category.findUnique({
    where: { id: id },
    include: {
      books: true,
    },
  });
  return result;
};

const updateCategory = async (
  id: string,
  payload: Category
): Promise<Category | null> => {
  const isExist = await getSingleCategory(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found !");
  }

  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteCategory = async (id: string): Promise<Category | null> => {
  const isExist = await getSingleCategory(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found !");
  }

  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
