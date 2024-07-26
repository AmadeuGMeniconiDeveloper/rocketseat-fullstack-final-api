import { Response } from "express";
import { ProductDTO } from "../dto.types.js";
import { ProductService } from "../services/productService.js";
import { AuthenticatedRequest } from "../middleware/types.js";

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  addProduct = async (req: AuthenticatedRequest, res: Response) => {
    const productDTO: ProductDTO = { ...req.body };

    await this.productService.addProduct(productDTO);

    return res.status(201).json({ message: "Product created" });
  };

  getProducts = async (req: AuthenticatedRequest, res: Response) => {
    const products = await this.productService.getProducts();

    return res.json({ products });
  };

  getProductsByCategory = async (req: AuthenticatedRequest, res: Response) => {
    const products = await this.productService.getProductsByCategory();

    return res.json({ products });
  };

  deleteProduct = async (req: AuthenticatedRequest, res: Response) => {
    const id: string = { ...req.body };
    await this.productService.deleteProduct(id);

    return res.status(201).json({ message: "Product deleted" });
  };
}
