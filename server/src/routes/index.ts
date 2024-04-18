import { Router, Request, Response } from "express";
import { auth } from "./auth.route";
import { user } from "./user.route";


const routes = Router();
routes.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

routes.use("/auth", auth);
routes.use("/users", user);

export default routes;
