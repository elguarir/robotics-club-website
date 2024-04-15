import { Router } from "express";
import * as controller from "../controllers/auth.controller";
import * as authMiddleware from "../middlewares/AuthMiddleware";
export const auth = Router();

auth.post("/signup", controller.signup);
auth.get("/me", authMiddleware.authenticated, controller.profile);
auth.put("/me", authMiddleware.authenticatedOnly, controller.updateProfile);
auth.post("/login", controller.login);
auth.get("/logout", controller.logout);
auth.post("/refresh", controller.refresh);
auth.post("/validate", controller.validate);
