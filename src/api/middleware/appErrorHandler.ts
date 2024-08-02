import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/AppErrors.js";

function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("ENTERED errorHandler() ...");
  if (error instanceof AppError) {
    return res.status(error.status).json({ message: error.message });
  }
  console.error(error);
  console.log("EXITED errorHandler() ...");
  return res.status(500).json(error);
}

export default errorHandler;
