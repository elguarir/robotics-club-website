import { Schema, model, HydratedDocument } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

enum Role {
  user = "user",
  admin = "admin",
  super_admin = "super_admin",
  sys_admin = "sys_admin",
}

interface IUser {
  username: string;
  password: string;
  email: string;
  roles: Array<string>;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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

UserSchema.plugin(uniqueValidator, { type: "mongoose-unique-validator" });
export const User = model<IUser>("User", UserSchema);

export type TUser = HydratedDocument<IUser>;
