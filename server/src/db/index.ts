import { config } from "../utils/config";
import mongoose from "mongoose";

export const connectToMongoDb = async () => {
  await mongoose.connect(config.MONGO_URI, {
    dbName: config.MONGO_DB_NAME,
  });

  mongoose.connection.on("connected", () => {
    console.log("MongoDb connected on port 27017");
  });
  mongoose.connection.on("error", (err: Error) => {
    console.log(`An error occurred. ERROR: ${err}`);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDb disconnected!");
  });
};

