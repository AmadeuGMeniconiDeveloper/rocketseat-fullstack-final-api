import "express-async-errors";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import apiRoutes from "./api/routes/index.js";

import resolveEnvironmentPath from "./utils/resolveEnvironmentPath.js";
import errorHandler from "./api/middleware/appErrorHandler.js";
import { connectDatabase } from "./database/connectDatabase.js";

dotenv.config({ path: resolveEnvironmentPath(import.meta.url) });

const app = express();

const startServer = async () => {
  connectDatabase({});

  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  app.use("/files", express.static("temp/uploads"));
  app.use("/", apiRoutes);

  app.use(errorHandler);

  const PORT = process.env.PORT || 9000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
