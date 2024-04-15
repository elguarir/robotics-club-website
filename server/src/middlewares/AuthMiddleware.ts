import { NextFunction } from "express";
import type { Request, Response } from "express";
import { verify } from "../utils/jwt";
import { LoggedInUser } from "../types/user";

export const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next();
    }
    const verifiedToken = await verify({ token });

    if (!verifiedToken) {
      res.clearCookie("token");
      return next();
    }

    req.user = verifiedToken.payload as LoggedInUser;
    next();
  } catch (error) {
    res.clearCookie("token");
    return next();
  }
};

export const authenticatedOnly = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as LoggedInUser;
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized, please login to access this resource",
    });
  }
  next();
};
