import { Router } from "express";

import { UserController } from "../controllers/userController.js";
import { UserService } from "../services/userService.js";
import { UserRepository } from "../repositories/userRepository.js";
import jwtAuthenticator from "../middleware/jwtAuthenticator.js";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const userRoutes = Router();

userRoutes.post("/", userController.create);

userRoutes.delete("/:id", jwtAuthenticator, userController.delete);

export default userRoutes;
