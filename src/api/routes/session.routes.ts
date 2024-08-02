import { Router } from "express";

import { SessionController } from "../controllers/sessionController.js";
import { UserService } from "../services/userService.js";
import { UserRepository } from "../repositories/userRepository.js";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const sessionController = new SessionController(userService);

const SessionRoutes = Router();

SessionRoutes.post("/signin", sessionController.signInUser);

SessionRoutes.post("/signout", sessionController.signOutUser);

export default SessionRoutes;
