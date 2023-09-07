import { Book, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import {
  IBookFilterRequest,
  bookRelationalFields,
  bookRelationalFieldsMapper,
  bookSearchableFields,
} from "./book.constant";

const createBook = async (book: Book): Promise<Book | null> => {
  const result = await prisma.book.create({
    data: book,
    include: {
      category: true,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "failed to create book");
  }
  return result;
};

const getAllBook = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { search, maxPrice, minPrice, category, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  if (minPrice !== undefined) {
    andConditions.push({
      price: {
        gte: parseFloat(minPrice.toString()),
      },
    });
  }

  if (maxPrice !== undefined) {
    andConditions.push({
      price: {
        lte: parseFloat(maxPrice.toString()),
      },
    });
  }

  if (category) {
    andConditions.push({
      categoryId: category,
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (bookRelationalFields.includes(key)) {
          return {
            [bookRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else if (bookSearchableFields.includes(key)) {
          return {
            [key]: {
              contains: (filterData as any)[key],
              mode: "insensitive",
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
    skip,
    take: Number(limit),
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereConditions,
  });

  const total = await prisma.book.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / Number(limit));

  return {
    meta: {
      total,
      page,
      limit,
      totalPage,
    },
    data: result,
  };
};

const getBooksByCategory = async (
  id: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const andConditions = [];

  if (id) {
    andConditions.push({
      categoryId: id,
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
    skip,
    take: Number(limit),

    where: whereConditions,
  });

  const total = await prisma.book.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / Number(limit));
  return {
    meta: {
      total,
      page,
      limit,
      totalPage,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const updateBookById = async (
  id: string,
  payload: Book
): Promise<Book | null> => {
  const isExist = await getSingleBook(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found !");
  }

  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteBookById = async (id: string): Promise<Book | null> => {
  const isExist = await getSingleBook(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found !");
  }

  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BookService = {
  createBook,
  getAllBook,
  getBooksByCategory,
  getSingleBook,
  updateBookById,
  deleteBookById,
};
