import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./users.service";

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getAllUser();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get all user successfully.",
    data: users,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getSingleUser(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get user successfully.",
    data: users,
  });
});

export const UserController = {
  getAllUser,
  getSingleUser,
};
