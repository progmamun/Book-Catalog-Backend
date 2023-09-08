import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { UserController } from "./users.controller";

const router = express.Router();

router.get("/users", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUser);

router.get(
  "/users/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUser
);

router.patch(
  "/users/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateUser
);

router.delete(
  "/users/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteUser
);

router.get(
  "/profile",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  UserController.getProfile
);

export const UserRoutes = router;
