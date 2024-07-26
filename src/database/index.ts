import { Sequelize } from "sequelize";
import databaseDefinition from "../config/database.js";

const sequelizeDatabase: Sequelize = new Sequelize(databaseDefinition);

export { sequelizeDatabase };
