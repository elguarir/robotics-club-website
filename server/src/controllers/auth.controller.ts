import bcrypt from "bcrypt";
import * as z from "zod";
import type { Request, Response } from "express";
import { User } from "../models/user";
import { encrypt } from "../utils/jwt";

export const signup = async (req: Request, res: Response) => {
  const registerSchema = z.object({
    name: z
      .string()
      .min(3, { message: "name must be at least 3 characters long" }),
    email: z
      .string()
      .email("This must be a valid email address")
      .refine(
        async (email) => {
          let existingUser = await User.findOne({ email });
          return !existingUser;
        },
        { message: "a user with this email already exists" }
      ),
    username: z
      .string()
      .min(3, { message: "username must be at least 3 characters long" })
      .refine(
        async (username) => {
          let existingUser = await User.findOne({ username });
          return !existingUser;
        },
        { message: "a user with this username already exists" }
      ),
    password: z
      .string()
      .min(6, { message: "password must be at least 6 characters long" }),
  });

  try {
    const validatedData = await registerSchema.safeParseAsync(req.body);
    if (validatedData.success) {
      let { email, password, username, name } = validatedData.data;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        username,
        profilePic: new URL(
          "https://api.dicebear.com/8.x/initials/svg?fontSize=40&seed=" + name
        ).toString(),
      });
      await user.save();

      // generate a jwt token
      const token = await encrypt({
        user: {
          _id: user._id.toString(),
          name: user.name,
          profilePic: user.profilePic,
          username: user.username,
          email: user.email,
          roles: user.roles,
        },
      });
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24,
      });

      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          profilePic: user.profilePic,
          username: user.username,
          email: user.email,
          roles: user.roles,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        errors: validatedData.error.errors.map((error) => {
          return {
            path: error.path.join("."),
            message: error.message,
          };
        }),
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        errors: [{ path: "unknown", message: "An unknown error occurred" }],
      });
    }
  }
};
export const login = async (req: Request, res: Response) => {
  const loginSchema = z.object({
    email: z.string().email("This must be a valid email address"),
    password: z.string().min(6, {
      message: "password must be at least 6 characters long",
    }),
  });

  try {
    const validatedData = await loginSchema.safeParseAsync(req.body);
    if (validatedData.success) {
      let { email, password } = validatedData.data;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("a user with this email does not exist");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = await encrypt({
          user: {
            _id: user._id.toString(),
            name: user.name,
            profilePic: user.profilePic,
            username: user.username,
            email: user.email,
            roles: user.roles,
          },
        });
        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24,
        });
        res.status(200).json({
          success: true,
          data: {
            _id: user._id,
            name: user.name,
            profilePic: user.profilePic,
            username: user.username,
            email: user.email,
            roles: user.roles,
          },
        });
      } else {
        res.status(401).json({
          success: false,
          message: "the credentials provided are incorrect",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        errors: validatedData.error.errors.map((error) => {
          return {
            path: error.path.join("."),
            message: error.message,
          };
        }),
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An unknown error occurred",
      });
    }
  }
};
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

export const profile = async (req: Request, res: Response) => {
  res.status(200).json({
    success: req.user ? true : false,
    data: req.user ?? null,
  });
};

export const updateProfile = async (req: Request, res: Response) => {
  const updateProfileSchema = z.object({
    name: z
      .string()
      .min(3, { message: "name must be at least 3 characters long" }),
    username: z.string().min(3, {
      message: "username must be at least 3 characters long",
    }),
    profilePic: z.string().url({ message: "profilePic must be a valid url" }),
  });

  try {
    const validatedData = await updateProfileSchema.safeParseAsync(req.body);
    if (validatedData.success) {
      let { name, username, profilePic } = validatedData.data;
      let user = await User.findOneAndUpdate(
        { _id: req.user!._id },
        { name, username, profilePic },
        { new: true }
      );
      if (!user) {
        throw new Error("User not found");
      }
      res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          profilePic: user.profilePic,
          username: user.username,
          email: user.email,
          roles: user.roles,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        errors: validatedData.error.errors.map((error) => {
          return {
            path: error.path.join("."),
            message: error.message,
          };
        }),
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An unknown error occurred",
      });
    }
  }
};

export const refresh = async (req: Request, res: Response) => {};
export const validate = async (req: Request, res: Response) => {};
