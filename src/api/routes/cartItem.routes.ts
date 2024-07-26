import { Router } from "express";

import { CartItemRepository } from "../repositories/cartItemRepository.js";
import { CartItemService } from "../services/cartItemService.js";
import { CartItemController } from "../controllers/cartItemController.js";
import jwtAuthenticator from "../middleware/jwtAuthenticator.js";

const cartItemRepository = new CartItemRepository();
const cartItemService = new CartItemService(cartItemRepository);
const cartItemController = new CartItemController(cartItemService);

const cartItemRoutes = Router();

cartItemRoutes.get("/", jwtAuthenticator, cartItemController.getCartItems);
cartItemRoutes.post("/", jwtAuthenticator, cartItemController.addCartItem);
cartItemRoutes.patch("/", jwtAuthenticator, cartItemController.updateQuantity);
cartItemRoutes.delete("/", jwtAuthenticator, cartItemController.removeCartItem);
cartItemRoutes.post(
  "/checkout",
  jwtAuthenticator,
  cartItemController.CheckoutCartItems
);

export default cartItemRoutes;
