import { Router } from "express";
import * as controller from "../controllers/auth.controller";

export const auth = Router();

auth.post("/signup", controller.signup);
auth.post("/login", controller.login);
auth.get("/logout", controller.logout);
auth.post("/refresh", controller.refresh);
auth.post("/validate", controller.validate);
