import { Router } from "express";

import { ProductRepository } from "../repositories/productRepository.js";
import { ProductService } from "../services/productService.js";
import { ProductController } from "../controllers/productController.js";

import jwtAuthenticator from "../middleware/jwtAuthenticator.js";
import adminAuthorizor from "../middleware/adminAuthorizor.js";

import upload from "../../config/uploads.js";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const productRoutes = Router();

productRoutes.get("/all", productController.getProducts);

productRoutes.get("/:id", productController.getProductById);

productRoutes.get("/search/:input", productController.searchProduct);

productRoutes.post(
  "/",
  jwtAuthenticator,
  adminAuthorizor,
  productController.addProduct
);

productRoutes.delete(
  "/:id",
  jwtAuthenticator,
  adminAuthorizor,
  productController.deleteProduct
);

productRoutes.patch(
  "/:id",
  jwtAuthenticator,
  adminAuthorizor,
  productController.updateProduct
);

productRoutes.post(
  "/:id/images",
  jwtAuthenticator,
  adminAuthorizor,
  upload.single("image"),
  productController.updateProductImage
);

export default productRoutes;
