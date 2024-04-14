import { NextFunction } from "express";
import type { Request, Response } from "express";
import { verify } from "@/utils/jwt";
import { LoggedInUser } from "@/types/user";

export const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, please login to access this resource",
      });
    }

    const verifiedToken = await verify({ token });
    if (!verifiedToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, please login to access this resource",
      });
    }

    req.user = verifiedToken.payload as LoggedInUser;
    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({
        success: false,
        message:
          error.name === "JWTExpired"
            ? "Session expired, please login to continue"
            : "Invalid token provided.",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An unknown error occurred",
      });
    }
  }
};
