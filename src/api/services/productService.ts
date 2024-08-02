import fs from "fs";

import AppError from "../../errors/AppErrors.js";
import Product from "../models/Product.js";

import { ProductRepository } from "../repositories/productRepository.js";
import DiskStorage from "../../providers/DiskStorage.js";

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  addProduct = async (newProductDTO: {
    name: string;
    price: string;
    category: "Refeicao" | "Bebida" | "Sobremesa";
    ingredients: string[];
    description?: string;
  }): Promise<Product | null> => {
    const productWithSameName = await this.productRepository.findByExactName(
      newProductDTO.name
    );

    if (productWithSameName) {
      console.error("Product name already exists");
      throw new AppError(409, "Product already exists");
    }

    const product = await this.productRepository.add(
      newProductDTO.name,
      Number(newProductDTO.price),
      newProductDTO.category,
      newProductDTO.ingredients,
      newProductDTO.description
    );

    if (!product) {
      console.error("Product not created");
      throw new AppError(400, "Product not created");
    }

    return product;
  };

  getProducts = async (): Promise<Product[]> => {
    const products = await this.productRepository.findAll();
    return products;
  };

  getProductById = async (id: string): Promise<Product | null> => {
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

  searchProduct = async (input: string): Promise<Product[]> => {
    const productList = await this.productRepository.findByNameOrIngredients(
      input
    );

    return productList;
  };

  deleteProduct = async (id: string): Promise<void> => {
    const foundProduct = await this.productRepository.findById(Number(id));

    if (!foundProduct) {
      console.error("Product does't exist");
      throw new AppError(404, "Product does't exist");
    }

    if (foundProduct.dataValues.image) {
      const diskStorage = new DiskStorage();

      await diskStorage.deleteFile(foundProduct.dataValues.image);
    }

    await this.productRepository.remove(Number(id));
  };

  updateProduct = async (
    id: string,
    editProductDTO: {
      name: string;
      price: string;
      category: "Refeicao" | "Bebida" | "Sobremesa";
      ingredients: string[];
      description?: string;
    }
  ): Promise<void> => {
    const product = await this.productRepository.findById(Number(id));

    if (!product) {
      console.error("Product does't exist");
      throw new AppError(404, "Product does't exist");
    }

    product.setDataValue("name", editProductDTO.name);
    product.setDataValue("price", Number(editProductDTO.price));
    product.setDataValue("category", editProductDTO.category);
    product.setDataValue("ingredients", editProductDTO.ingredients);
    product.setDataValue("description", editProductDTO.description);

    await this.productRepository.update(product.dataValues);
  };

  updateProductImage = async (id: string, image?: string): Promise<void> => {
    if (!image) {
      return;
    }

    const product = await this.productRepository.findById(Number(id));

    if (!product) {
      console.error("Product does't exist");
      throw new AppError(404, "Product does't exist");
    }

    const diskStorage = new DiskStorage();

    if (product.dataValues.image) {
      console.log("deletando imagem");
      await diskStorage.deleteFile(product.dataValues.image);
    }

    const updatedFilename = await diskStorage.saveFile(image);

    product.setDataValue("image", updatedFilename);

    await this.productRepository.update(product.dataValues);
  };
}
