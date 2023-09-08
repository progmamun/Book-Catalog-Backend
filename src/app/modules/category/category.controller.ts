import { Category } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CategoryService } from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "category created successfully!",
    data: result,
  });
});

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategory();

  sendResponse<Category[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "categories fetched successfully!",
    data: result,
  });
});

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getSingleCategory(req.params.id);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "categories fetched successfully!",
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.updateCategory(req.params.id, req.body);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "categories updated successfully!",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.deleteCategory(req.params.id);

  sendResponse<{}>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "categories deleted successfully!",
    data: {},
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
