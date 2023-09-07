import { Book } from "@prisma/client";
import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { bookFilterableFields } from "./book.constant";
import { BookService } from "./book.service";

const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...bookData } = req.body;

    const result = await BookService.createBook(bookData);

    sendResponse<Book>(res, {
      success: true,
      statusCode: 200,
      message: "Book created successfully",
      data: result,
    });
  }
);

const getAllBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const filters = pick(req.query, bookFilterableFields);

    const result = await BookService.getAllBook(filters, options);

    sendResponse<Book[]>(res, {
      statusCode: 200,
      success: true,
      message: "Books fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getBooksByCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const options = pick(req.query, ["limit", "page"]);
    const result = await BookService.getBooksByCategory(categoryId, options);

    sendResponse<Book[]>(res, {
      statusCode: 200,
      success: true,
      message: "Books with associated category data fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const BookController = {
  createBook,
  getAllBook,
  getBooksByCategory,
};
