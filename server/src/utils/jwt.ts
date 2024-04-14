import { SignJWT, jwtVerify, jwtDecrypt } from "jose";
import { config } from "./config";

const key = new TextEncoder().encode(config.JWT_SECRET);

interface EncryptProps {
  user: {
    _id: string;
    name: string;
    profilePic: string;
    username: string;
    email: string;
    roles: Array<string>;
  };
}

export const encrypt = async ({ user }: EncryptProps) => {
  return await new SignJWT({
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    profilePic: user.profilePic,
    roles: user.roles,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(config.JWT_EXPIRY)
    .sign(key);
};

interface DecryptProps {
  token: string;
}

export const decrypt = async ({ token }: DecryptProps) => {
  return await jwtDecrypt(token, key);
};


interface VerifyProps {
  token: string;
}

export const verify = async ({ token }: VerifyProps) => {
  return await jwtVerify(token, key, { algorithms: ["HS256"] });
};