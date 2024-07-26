import { Request, Response, NextFunction } from "express";

import { UserService } from "../services/userService.js";

import { SignUpDTO } from "../dto.types.js";
import { AuthenticatedRequest } from "../middleware/types.js";

export class UserController {
  constructor(private readonly userService: UserService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    const SignUpDTO: SignUpDTO = { ...req.body };
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
      return res.status(401).json({ message: "Unauthorized" });
    }

    await this.userService.deleteUser(sessionUser.sub);

    return res.status(201).json({ message: "User deleted" });
  };
}
