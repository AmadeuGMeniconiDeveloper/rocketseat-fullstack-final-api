import { NextFunction, Response } from "express";
import AppError from "../../errors/AppErrors.js";

import { AuthenticatedRequest } from "../types.js";

function adminAuthorizor(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.sessionUser) {
      console.error("adminAuthorizor Error: Token missing");
      throw new AppError(401, "Token missing");
    }

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
