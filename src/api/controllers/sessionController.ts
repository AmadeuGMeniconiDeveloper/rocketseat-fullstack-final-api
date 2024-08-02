import { Response } from "express";
import { UserService } from "../services/userService.js";
import { AuthenticatedRequest } from "../types.js";

export class SessionController {
  constructor(private readonly userService: UserService) {}

  signInUser = async (req: AuthenticatedRequest, res: Response) => {
    const signInDTO: { email: string; password: string } = req.body;
    const { user, token } = await this.userService.signInUser(signInDTO);

    return res.status(200).json({ user, token });
  };

  signOutUser = async (req: AuthenticatedRequest, res: Response) => {
    req.sessionUser = undefined;

    return res.status(200).json(null);
  };
}
