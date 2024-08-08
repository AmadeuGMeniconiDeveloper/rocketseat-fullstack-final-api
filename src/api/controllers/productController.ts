import { Response } from "express";

import { ProductService } from "../services/productService.js";
import { AuthenticatedRequest } from "../types.js";

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  addProduct = async (req: AuthenticatedRequest, res: Response) => {
    const newProductDTO: {
      name: string;
      price: string;
      category: "Refeicao" | "Bebida" | "Sobremesa";
      ingredients: string[];
      description?: string;
    } = req.body;

    console.log("1.Step 1 - productDTO: ", newProductDTO);

    const newProduct = await this.productService.addProduct(newProductDTO);

    console.log("1.Step 2 - newProduct: ", newProduct?.dataValues);

    if (!newProduct) {
      return res.status(400).json({ message: "Product not created" });
    }

    return res.status(201).json({
      message: "Product created",
      newProductId: newProduct.dataValues.id,
    });
  };

  getProducts = async (req: AuthenticatedRequest, res: Response) => {
    const all = await this.productService.getProducts();

    const meals = all.filter(food => food.dataValues.category === "Refeicao");
    const desserts = all.filter(
      food => food.dataValues.category === "Sobremesa"
    );
    const drinks = all.filter(food => food.dataValues.category === "Bebida");

    console.log("products: ", all);
    console.log("meals: ", meals);
    console.log("desserts: ", desserts);
    console.log("drinks: ", drinks);
    return res.json({ meals, desserts, drinks, all });
  };

  getProductsByCategory = async (req: AuthenticatedRequest, res: Response) => {
    const products = await this.productService.getProductsByCategory();

    return res.json(products);
  };

  getProductById = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const product = await this.productService.getProductById(id);

    return res.json(product);
  };

  searchProduct = async (req: AuthenticatedRequest, res: Response) => {
    const { input } = req.params;

    const productList = await this.productService.searchProduct(input);

    return res.json(productList);
  };

  deleteProduct = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    await this.productService.deleteProduct(id);

    return res.status(201).json({ message: "Product deleted" });
  };

  updateProduct = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const editedProductDTO: {
      name: string;
      price: string;
      category: "Refeicao" | "Bebida" | "Sobremesa";
      ingredients: string[];
      description?: string;
    } = req.body;

    await this.productService.updateProduct(id, editedProductDTO);

    return res.status(201).json({ message: "Product updated" });
  };

  updateProductImage = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.file) {
      return res.json({ message: "No image sent" });
    }

    const { id } = req.params;
    const { filename } = req.file as Express.Multer.File;

    const updatedProduct = await this.productService.updateProductImage(
      id,
      filename
    );

    return res.status(201).json(updatedProduct);
  };
}
