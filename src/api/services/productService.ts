import AppError from "../../utils/AppError.js";
import Product from "../models/Product.js";
import { ProductRepository } from "../repositories/productRepository.js";
import { ProductDTO } from "../dto.types.js";

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  addProduct = async (product: ProductDTO): Promise<void> => {
    const productWithSameName = await this.productRepository.findByName(
      product.name
    );

    if (productWithSameName) {
      console.error("Product name already exists");
      throw new AppError(409, "Product already exists");
    }

    return await this.productRepository.add(
      product.name,
      Number(product.price),
      product.category,
      product.ingredients,
      product.description
    );
  };

  getProducts = async (): Promise<Product[]> => {
    const products = await this.productRepository.findAll();
    return products;
  };

  getProductById = async (id: ProductDTO["id"]): Promise<Product | null> => {
    const product = await this.productRepository.findById(Number(id));
    if (!product) {
      console.error("Product does't exist");
      throw new AppError(404, "Product does't exist");
    }
    return product;
  };

  getProductsByCategory = async (): Promise<{
    meals: Product[];
    drinks: Product[];
    desserts: Product[];
  }> => {
    const meals = await this.productRepository.findByCategory("Refeicao");

    const drinks = await this.productRepository.findByCategory("Bebida");

    const desserts = await this.productRepository.findByCategory("Sobremesa");

    const productsByType = {
      meals: meals,
      drinks: drinks,
      desserts: desserts,
    };

    return productsByType;
  };

  deleteProduct = async (id: ProductDTO["id"]): Promise<void> => {
    const foundProduct = await this.productRepository.findById(Number(id));

    if (!foundProduct) {
      console.error("Product does't exist");
      throw new AppError(404, "Product does't exist");
    }

    await this.productRepository.remove(Number(id));
  };
}
