import { Router } from "express";
import * as controller from "../controllers/user.controller";
import * as authMiddleware from "../middlewares/AuthMiddleware";

export const user = Router();

user.get("/", authMiddleware.authenticated, controller.getAllUsers);
user.get("/:id", authMiddleware.authenticated, controller.getOneUser);
user.put("/:id", authMiddleware.authenticated, controller.updateUser);
user.delete("/:id", authMiddleware.authenticated, controller.deleteUser);
user.post("/", controller.createUser);