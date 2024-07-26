import { Response } from "express";
import { SignInDTO } from "../dto.types.js";
import { UserService } from "../services/userService.js";
import { AuthenticatedRequest } from "../middleware/types.js";

export class SessionController {
  constructor(private readonly userService: UserService) {}

  signInUser = async (req: AuthenticatedRequest, res: Response) => {
    const signInDTO: SignInDTO = { ...req.body };

    console.log("signInUser: ", signInDTO);

    const { user, token } = await this.userService.signInUser(signInDTO);

    return res.status(200).json({ user, token });
  };
}
