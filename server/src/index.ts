import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import { config } from "./utils/config";
import { connectToMongoDb } from "./db";
dotenv.config();

const app = express();
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
}));
app.use(helmet());
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);

connectToMongoDb()
  .then(() => {
    app.listen(config.PORT, () => {
      console.log("Server running at PORT: ", config.PORT);
    });
  })
  .catch((error) => {
    console.error(error);
  });
