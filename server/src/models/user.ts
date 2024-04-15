import { Schema, model } from "mongoose";

enum Role {
  user = "user",
  admin = "admin",
  super_admin = "super_admin",
  sys_admin = "sys_admin",
}

interface IUser {
  _id: string;
  name: string;
  username: string;
  password: string;
  profilePic: string;
  email: string;
  roles: Array<string>;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    roles: {
      type: [String],
      enum: ["user", "admin", "super_admin", "sys_admin"],
      default: ["user"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("User", UserSchema);
