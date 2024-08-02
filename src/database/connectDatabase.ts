import { SyncOptions } from "sequelize";
import AppError from "../errors/AppErrors.js";
import { sequelizeDatabase } from "./index.js";
import { syncModels } from "./syncModels.js";
import { defineAssociations } from "./defineAssociations.js";

export const connectDatabase = async (syncOptions: SyncOptions) => {
  try {
    await sequelizeDatabase.authenticate();

    defineAssociations();

    await syncModels(syncOptions);
  } catch (error) {
    console.error("Database connection failed:", error);
    throw new AppError(500, "Database connection failed");
  }
};
