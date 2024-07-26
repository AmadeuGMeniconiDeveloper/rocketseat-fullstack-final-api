import { SyncOptions } from "sequelize";

import { sequelizeDatabase } from "./index.js";

import { defineAssociations } from "./defineAssociations.js";

export const syncModels = async (syncOptions: SyncOptions) => {
  try {
    defineAssociations(); // Ensure associations are defined before syncing
    await sequelizeDatabase.sync(syncOptions); // Use { alter: true } for production
    console.log("Database synced.");
  } catch (error) {
    console.error("Unable to sync database tables:", error);
  }
};
