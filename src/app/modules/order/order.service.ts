import { Order } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";

const createOrder = async (
  order: Order,
  userId: string
): Promise<Order | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
    }

    const result = await prisma.order.create({
      data: {
        userId: user.id,
        orderedBooks: order.orderedBooks!,
      },
    });

    return result;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new ApiError(httpStatus.NOT_FOUND, "failed to create Order !");
  }
};

const getAllOrder = async (): Promise<Order[] | null> => {
  const result = await prisma.order.findMany({});
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrder,
};
