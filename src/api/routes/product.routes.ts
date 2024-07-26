import { Router } from "express";

import { ProductRepository } from "../repositories/productRepository.js";
import { ProductService } from "../services/productService.js";
import { ProductController } from "../controllers/productController.js";

import jwtAuthenticator from "../middleware/jwtAuthenticator.js";
import adminAuthorizor from "../middleware/adminAuthorizor.js";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const productRoutes = Router();

productRoutes.post(
  "/",
  jwtAuthenticator,
  adminAuthorizor,
  productController.addProduct
);

productRoutes.delete(
  "/",
  jwtAuthenticator,
  adminAuthorizor,
  productController.deleteProduct
);

productRoutes.get("/all", productController.getProductsByCategory);

// productRoutes.patch("/", upload.single("image"), productController.updateProductImage);

export default productRoutes;
