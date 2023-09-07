import { User } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";

const getAllUser = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  return users;
};

const getSingleUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return user;
};

const updateUser = async (
  userId: string,
  userUpdateData: Partial<User>
): Promise<User> => {
  const isExistUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!isExistUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found!");
  }

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: userUpdateData,
  });

  return user;
};

const deleteUser = async (userId: string) => {
  const existUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!existUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User does not found. 404");
  }

  const deleteUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return deleteUser;
};

export const UserService = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
