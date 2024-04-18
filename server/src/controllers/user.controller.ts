import type { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import * as z from "zod";
import { generateProfilePic } from "../utils/generateProfilePic";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find(
      {},
      {
        password: 0,
      }
    );
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getOneUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id, {
      password: 0,
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const userSchema = z.object({
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
  });

  try {
    const validatedData = await userSchema.safeParseAsync(req.body);
    if (validatedData.success) {
      let { email, username, name } = validatedData.data;

      let defaultPassword = "ESTE" + new Date().getFullYear();
      let password = await bcrypt.hash(defaultPassword, 10);

      const user = new User({
        name,
        email,
        profilePic: generateProfilePic(name), // generate a profile pic
        username,
        password,
      });

      await user.save();

      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name,
          username,
          email,
          profilePic: user.profilePic,
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateUser = async (req: Request, res: Response) => {};
export const deleteUser = async (req: Request, res: Response) => {};
