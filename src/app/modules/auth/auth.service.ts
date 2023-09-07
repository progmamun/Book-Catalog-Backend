import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";

export const createUser = async (userData: User): Promise<User> => {
  // Check if the email is already registered
  const existingUser = await prisma.user.findUnique({
    where: {
      email: userData?.email,
    },
  });

  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is already in used");
  }

  // Hash the user password
  const hashedPassword = await bcrypt.hash(userData?.password, 10);

  const newUser = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
    },
  });

  return newUser;
};

export const loginUser = async (userCredential: {
  email: string;
  password: string;
}): Promise<string> => {
  // check user
  const existUser = await prisma.user.findUnique({
    where: {
      email: userCredential?.email,
    },
  });

  if (!existUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email does not exist!");
  }

  const isPasswordMatched = await bcrypt.compare(
    userCredential?.password,
    existUser?.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Password is incorrect! try again."
    );
  }

  // create token
  const Token = jwtHelpers.createToken(
    { role: existUser?.role, userId: existUser?.id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return Token;
};

export const AuthService = {
  createUser,
  loginUser,
};
