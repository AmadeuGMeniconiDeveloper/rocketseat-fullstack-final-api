import "express-async-errors";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import apiRoutes from "./api/routes/index.js";

import resolveEnvironmentPath from "./utils/resolveEnvironmentPath.js";
import errorHandler from "./api/middleware/appErrorHandler.js";
import { connectDatabase } from "./database/connectDatabase.js";

dotenv.config({ path: resolveEnvironmentPath(import.meta.url) });

const app = express();

const startServer = async () => {
  connectDatabase({});

  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use(
    cors({
      origin: [
        "https://main--foodexplorer-final.netlify.app",
        "https://foodexplorer-final.netlify.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
      ],
      credentials: true,
    })
  );

  app.use("/files", express.static("temp/uploads"));
  app.use("/", apiRoutes);

  app.use(errorHandler);

  const PORT = process.env.PORT || 9000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
