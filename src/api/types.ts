import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  sessionUser?: {
    role: "customer" | "admin";
    sub: string;
  };
}

export interface CustomJwtPayload extends JwtPayload {
  role: "customer" | "admin";
  sub: string;
}

export interface FileRequest extends AuthenticatedRequest {
  file: Express.Multer.File;
}
