import AppError from "../../utils/AppError.js";

import { UserRepository } from "../repositories/userRepository.js";

import User from "../models/User.js";

import { UserDTO, SignUpDTO, SignInDTO } from "../dto.types.js";
import { compare, hash } from "bcrypt";

import authConfig from "../../config/authentication.js";
import jwt from "jsonwebtoken";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  signUpUser = async (userSignUpData: SignUpDTO): Promise<void> => {
    if (!userSignUpData.name) {
      console.error("Missing name field");
      throw new AppError(400, "Missing name field");
    }
    if (!userSignUpData.email) {
      console.error("Missing email field");
      throw new AppError(400, "Missing email field");
    }
    if (!userSignUpData.password) {
      console.error("Missing password field");
      throw new AppError(400, "Missing password field");
    }
    if (!userSignUpData.role) {
      console.error("Missing role field");
      throw new AppError(400, "Missing role field");
    }

    const existingUser = await this.userRepository.findByEmail(
      userSignUpData.email
    );

    if (existingUser) {
      console.error("User already exists");
      throw new AppError(409, "User already exists");
    }

    const hashedPassword = await hash(userSignUpData.password, 8);

    const newUser: User["dataValues"] = {
      name: userSignUpData.name,
      email: userSignUpData.email,
      password: hashedPassword,
      role: userSignUpData.role,
    };

    return await this.userRepository.add(newUser);
  };

  deleteUser = async (email: UserDTO["email"]): Promise<void> => {
    const foundUser = await this.userRepository.findByEmail(email);

    if (!foundUser) {
      console.error("User does't exist");
      throw new AppError(404, "User does't exist");
    }

    return await this.userRepository.remove(foundUser.dataValues.id);
  };

  signInUser = async (
    signInDTO: SignInDTO
  ): Promise<{
    user: { name: string; email: string; role: string };
    token: string;
  }> => {
    const foundUser = await this.userRepository.findByEmail(signInDTO.email);

    if (!foundUser) {
      console.error("User does't exist");
      throw new AppError(404, "User does't exist");
    }

    const checkPassword = await compare(
      signInDTO.password,
      foundUser.dataValues.password
    );

    if (!checkPassword) {
      console.error("Wrong password");
      throw new AppError(401, "Wrong password");
    }

    const { secret, expiresIn } = authConfig.jwt;

    const { sign } = jwt;
    const token = sign({ role: foundUser.dataValues.role }, secret, {
      subject: String(foundUser.dataValues.id),
      expiresIn,
    });

    if (!token) {
      console.error("Token not generated");
      throw new AppError(500, "Token not generated");
    }

    const userResponseDTO = {
      name: foundUser.dataValues.name,
      email: foundUser.dataValues.email,
      role: foundUser.dataValues.role,
    };

    return { user: userResponseDTO, token };
  };
}
