import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
const { verify } = jwt;
import authConfig from "../../config/authentication.js";
import AppError from "../../utils/AppError.js";

import { AuthenticationHeaderDTO } from "../dto.types.js";
import { AuthenticatedRequest, CustomJwtPayload } from "./types.js";

function jwtAuthenticator(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  console.log("ENTERED jwtAuthenticator...");
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

    console.log("jwtAuthenticator: ", payload);
    req.sessionUser = payload as CustomJwtPayload;

    console.log("jwtAuthenticator: ", req.sessionUser.sub);

    console.log("EXITED jwtAuthenticator...");
    return next();
  } catch {
    console.error("jwtAuthenticator Error: Invalid token");
    throw new AppError(401, "Invalid token");
  }
}

export default jwtAuthenticator;
