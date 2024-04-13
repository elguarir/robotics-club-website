import { Router, Request, Response } from "express";
import { auth } from "./auth.route";
const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

routes.use("/auth", auth);

export default routes;
