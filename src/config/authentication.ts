import { configDotenv } from "dotenv";
import { Secret } from "jsonwebtoken";

import resolveEnvironmentPath from "../utils/resolveEnvironmentPath.js";

// Sets the path and access to environment variables based on .env's NODE_ENV
configDotenv({
  path: resolveEnvironmentPath(import.meta.url),
});

export default {
  jwt: {
    secret: process.env.JWT_SECRET as Secret,
    expiresIn: "1d",
  },
};
