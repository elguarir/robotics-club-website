import { jwtVerify } from "jose";
import { cookies } from "next/headers";
const key = new TextEncoder().encode(process.env.JWT_SECRET!);

export type VerifyProps = {
  token: string;
};

export type LoggedInUser = {
  _id: string;
  username: string;
  email: string;
  name: string;
  profilePic: string;
  roles: string[];
  iat: number;
  exp: number;
};

export const verify = async ({ token }: VerifyProps) => {
  return await jwtVerify(token, key, { algorithms: ["HS256"] });
};

export const getSession = async () => {
  const token = cookies().get("token");
  if (!token || !token.value) {
    return null;
  }
  try {
    const verifiedToken = await verify({ token: token.value });
    if (!verifiedToken) {
      return null;
    }
    return verifiedToken.payload as LoggedInUser;
  } catch (error) {
    return null;
  }
};
