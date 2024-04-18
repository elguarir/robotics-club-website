import { client } from "./client";
import { AuthResponse, User } from "../hooks/types";
interface CreateUserProps {
  user: Omit<User, "_id" | "profilePic" | "roles">;
}

const createUser = async ({ user }: CreateUserProps) => {
  const { data } = await client.post<AuthResponse<User>>("/users", user);
  return data;
};

export const getUsers = async () => {
  const { data } = await client.get<AuthResponse<User>>("/users");
  return data;
};

export { createUser };
