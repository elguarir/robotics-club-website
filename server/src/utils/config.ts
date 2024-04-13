import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT!,
  MONGO_URI: process.env.MONGO_URI!,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRY: process.env.JWT_EXPIRY!,
  NODE_ENV: process.env.NODE_ENV!,
};
