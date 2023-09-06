import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
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

export const AuthService = {
  createUser,
};
