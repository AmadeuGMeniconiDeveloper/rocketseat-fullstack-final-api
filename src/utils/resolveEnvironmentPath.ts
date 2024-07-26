import path from "path";
import { configDotenv } from "dotenv";
import { fileURLToPath } from "url";

configDotenv();

function resolveEnvironmentPath(metaUrl: string) {
  // Get absolute path of the file that calls this function
  const __filename = fileURLToPath(metaUrl);

  // Edits the file path so resulting path is "/absolute/path/to/<project-root>" (where .env files are located)
  const __dirname = path.dirname(__filename).split("/src")[0];

  return path.resolve(__dirname, `.env.${process.env.NODE_ENV}`);
}

export default resolveEnvironmentPath;
