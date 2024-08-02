import { SyncOptions } from "sequelize";

import { sequelizeDatabase } from "./index.js";

import { defineAssociations } from "./defineAssociations.js";

export const syncModels = async (syncOptions: SyncOptions) => {
  try {
    // defineAssociations();
    await sequelizeDatabase.sync(syncOptions);
  } catch (error) {
    console.error("Unable to sync database tables:", error);
  }
};
