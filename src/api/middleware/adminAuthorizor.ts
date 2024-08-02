import { NextFunction, Response } from "express";
import AppError from "../../errors/AppErrors.js";
import authConfig from "../../config/authentication.js";
import jwt from "jsonwebtoken";
const { verify } = jwt;

import { AuthenticatedRequest, CustomJwtPayload } from "../types.js";

function adminAuthorizor(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader: string | undefined = req.headers.authorization;

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
      console.error("adminAuthorizor Error: Unauthorized");
      throw new AppError(401, "Unauthorized");
    }

    return next();
  } catch {
    console.error("adminAuthorizor Error: Invalid token");
    throw new AppError(401, "Invalid token");
  }
}

export default adminAuthorizor;
