import { User } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";

const getAllUser = async (): Promise<any[] | null> => {
  const allUser = await prisma.user.findMany({});
  const result = allUser.map(({ password, ...rest }) => {
    return rest;
  });

  return result;
};

const getSingleUser = async (
  id: string
): Promise<Omit<User, "password"> | {}> => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  const { password, ...rest } = user || {};
  return rest;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const isExist = await getSingleUser(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteUser = async (userId: string): Promise<User | null> => {
  const existUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!existUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not found.");
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
