import { Router } from "express";

import { FavoriteRepository } from "../repositories/favoriteRepository.js";
import { FavoriteService } from "../services/favoriteService.js";
import { FavoriteController } from "../controllers/favoriteController.js";
import { ProductRepository } from "../repositories/productRepository.js";
import { UserRepository } from "../repositories/userRepository.js";
import jwtAuthenticator from "../middleware/jwtAuthenticator.js";

const favoriteRepository = new FavoriteRepository();
const productRepository = new ProductRepository();
const userRepository = new UserRepository();
const favoriteService = new FavoriteService(
  favoriteRepository,
  productRepository,
  userRepository
);
const favoriteController = new FavoriteController(favoriteService);

const favoriteRoutes = Router();

favoriteRoutes.get("/", jwtAuthenticator, favoriteController.getFavorites);
favoriteRoutes.patch("/", jwtAuthenticator, favoriteController.toggleFavorite);
favoriteRoutes.put("/", jwtAuthenticator, favoriteController.updateFavorites);

export default favoriteRoutes;
