import { Router } from "express";

import { FavoriteRepository } from "../repositories/favoriteRepository.js";
import { FavoriteService } from "../services/favoriteService.js";
import { FavoriteController } from "../controllers/favoriteController.js";
import { ProductRepository } from "../repositories/productRepository.js";
import jwtAuthenticator from "../middleware/jwtAuthenticator.js";

const favoriteRepository = new FavoriteRepository();
const productRepository = new ProductRepository();
const favoriteService = new FavoriteService(
  favoriteRepository,
  productRepository
);
const favoriteController = new FavoriteController(favoriteService);

const favoriteRoutes = Router();

favoriteRoutes.get("/all", jwtAuthenticator, favoriteController.getFavorites);

favoriteRoutes.put(
  "/:favoriteProductId",
  jwtAuthenticator,
  favoriteController.toggleFavorite
);

// favoriteRoutes.put("/", jwtAuthenticator, favoriteController.updateFavorites);

export default favoriteRoutes;
