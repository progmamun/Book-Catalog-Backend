import { User } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./users.service";

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getAllUser();

  sendResponse<User[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get all user successfully.",
    data: users,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getSingleUser(req.params.id);

  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get user successfully.",
    data: users,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.updateUser(req.params.id, req.body);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user updated successfully.",
    data: users,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.deleteUser(req.params.id);

  sendResponse<{}>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user deleted successfully.",
    data: {},
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user!;
  const result = await UserService.getSingleUser(userId);

  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile retrieved successfully",
    data: result,
  });
});

export const UserController = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  getProfile,
};
