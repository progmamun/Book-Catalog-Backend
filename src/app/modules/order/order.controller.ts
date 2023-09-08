import { Order } from "@prisma/client";
import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./order.service";

const createOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...orderData } = req.body;
    const { userId } = req.user!;
    const result = await OrderService.createOrder(orderData, userId);

    sendResponse<Order>(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Order created successfully",
      data: result,
    });
  }
);

const getAllOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrderService.getAllOrder();

    sendResponse<Order[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Get All Order successfully",
      data: result,
    });
  }
);

export const OrderController = {
  createOrder,
  getAllOrder,
};
