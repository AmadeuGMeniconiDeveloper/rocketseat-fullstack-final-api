import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
const { verify } = jwt;
import authConfig from "../../config/authentication.js";
import AppError from "../../errors/AppErrors.js";

import { AuthenticatedRequest, CustomJwtPayload } from "../types.js";

function jwtAuthenticator(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader: typeof req.headers = req.headers;

  if (!authorizationHeader.cookie) {
    console.error("jwtAuthenticator Error: Token missing");
    throw new AppError(401, "Token missing");
  }

  // Authorization: Bearer <token>
  const [prefix, sessionToken] = authorizationHeader.cookie.split("token=");

  try {
    const payload = verify(sessionToken, authConfig.jwt.secret);

    console.log("jwtAuthenticator Payload: ", payload);
    req.sessionUser = payload as CustomJwtPayload;

    return next();
  } catch {
    console.error("jwtAuthenticator Error: Invalid token");
    throw new AppError(401, "Invalid token");
  }
}

export default jwtAuthenticator;
