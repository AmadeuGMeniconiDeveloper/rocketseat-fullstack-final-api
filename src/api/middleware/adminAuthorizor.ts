import { NextFunction, Response } from "express";
import AppError from "../../utils/AppError.js";
import authConfig from "../../config/authentication.js";
import jwt from "jsonwebtoken";
const { verify } = jwt;

import { AuthenticationHeaderDTO } from "../dto.types.js";
import { AuthenticatedRequest, CustomJwtPayload } from "./types.js";

function adminAuthorizor(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  console.log("ENTERED roleAuthorizor...");
  const authorizationHeader: AuthenticationHeaderDTO["authorizationHeader"] =
    req.headers.authorization;

  if (!authorizationHeader) {
    console.error("jwtAuthenticator Error: Token missing");
    throw new AppError(401, "Token missing");
  }

  // Authorization: Bearer <token>
  const [prefix, sessionToken] = authorizationHeader.split(" ");

  try {
    const payload = verify(sessionToken, authConfig.jwt.secret);

    req.sessionUser = payload as CustomJwtPayload;

    // Authentication by role
    if (req.sessionUser.role !== "admin") {
      console.error("roleAuthorizor Error: Admin privilage only");
      throw new AppError(401, "Admin privilage only");
    }

    console.log("EXITED roleAuthorizor...");
    return next();
  } catch {
    console.error("roleAuthorizor Error: Invalid token");
    throw new AppError(401, "Invalid token");
  }
}

export default adminAuthorizor;
