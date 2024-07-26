import { configDotenv } from "dotenv";
import { SequelizeOptions } from "sequelize-typescript";

import resolveEnvironmentPath from "../utils/resolveEnvironmentPath.js";

// Sets the path and access to environment variables based on .env's NODE_ENV
configDotenv({
  path: resolveEnvironmentPath(import.meta.url),
});

const databaseDefinition: SequelizeOptions = {
  dialect: "postgres",
  models: ["/src/api/models"],
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default databaseDefinition;
