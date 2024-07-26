import { NextFunction, Request, Response } from "express";
import AppError from "../../utils/AppError.js";

function appErrorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("ENTERED appErrorHandler...");
  if (error instanceof AppError) {
    return res.status(error.status).json({ message: error.message });
  }
  console.log("EXITED appErrorHandler...");
  return res.status(500).json(error);
}

export default appErrorHandler;
