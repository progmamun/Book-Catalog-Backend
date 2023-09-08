import express from "express";
import { BookRoutes } from "../modules/Book/book.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { CategoryRoutes } from "../modules/category/category.routes";
import { OrderRoutes } from "../modules/order/order.routes";
import { UserRoutes } from "../modules/users/users.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/",
    route: UserRoutes,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
  {
    path: "/books",
    route: BookRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
