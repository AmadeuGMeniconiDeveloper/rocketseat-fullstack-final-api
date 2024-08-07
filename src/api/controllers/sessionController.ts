import { response, Response } from "express";
import { UserService } from "../services/userService.js";
import { AuthenticatedRequest } from "../types.js";

export class SessionController {
  constructor(private readonly userService: UserService) {}

  signInUser = async (req: AuthenticatedRequest, res: Response) => {
    const signInDTO: { email: string; password: string } = req.body;
    const { user, token } = await this.userService.signInUser(signInDTO);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 15,
    });

    console.log("Cookie: ", response.cookie);

    return res.status(200).json({ user });
  };

  signOutUser = async (req: AuthenticatedRequest, res: Response) => {
    req.sessionUser = undefined;

    return res.status(200).json({ message: "User signed out" });
  };
}
