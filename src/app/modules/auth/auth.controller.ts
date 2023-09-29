import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse, { responseAuthFormat } from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const user = await AuthService.createUser(userData);
  const { password, ...newUserWithoutPassword } = user;

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully!",
    data: newUserWithoutPassword,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const userToken = await AuthService.loginUser(userData);

  responseAuthFormat(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Login successfully!",
    token: userToken,
  });
});

export const AuthController = {
  createUser,
  loginUser,
};
