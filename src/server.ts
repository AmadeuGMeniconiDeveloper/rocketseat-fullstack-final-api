import "express-async-errors";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import apiRoutes from "./api/routes/index.js";

import resolveEnvironmentPath from "./utils/resolveEnvironmentPath.js";
import { sequelizeDatabase } from "./database/index.js";
import { syncModels } from "./database/syncModels.js";
import appErrorHandler from "./api/middleware/appErrorHandler.js";

dotenv.config({ path: resolveEnvironmentPath(import.meta.url) });

const app = express();

const startServer = async () => {
  // Connect to database
  try {
    await sequelizeDatabase.authenticate();
    console.log("Database connection established.");
    await syncModels({ alter: true }); // Sync models after authentication
    console.log("Database synced.");
  } catch (error) {
    console.error("Database connection or sync failed:", error);
  }

  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  app.use("/", apiRoutes);

  // Error handler
  app.use(appErrorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
