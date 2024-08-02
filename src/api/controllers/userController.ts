import { Request, Response, NextFunction } from "express";

import { UserService } from "../services/userService.js";

import { AuthenticatedRequest } from "../types.js";
import AppError from "../../errors/AppErrors.js";

export class UserController {
  constructor(private readonly userService: UserService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    const SignUpDTO: {
      name: string;
      email: string;
      password: string;
      role: "customer" | "admin";
    } = req.body;

    await this.userService.signUpUser(SignUpDTO);

    return res.status(201).json({ message: "User created" });
  };

  delete = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const sessionUser: typeof req.sessionUser = req.sessionUser;
    if (!sessionUser) {
      throw new AppError(401, "Unauthorized");
      // return res.status(401).json({ message: "Unauthorized" });
    }

    await this.userService.deleteUser(sessionUser.sub);

    req.sessionUser = undefined;

    return res.status(201).json({ message: "User deleted" });
  };
}
