import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { UserController } from "./users.controller";

const router = express.Router();

router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUser);

export const UserRoutes = router;
