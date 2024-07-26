import { Op } from "sequelize";
import Product from "../models/Product.js";

export class ProductRepository {
  private readonly product = Product;

  add = async (
    name: string,
    price: number,
    category: "Refeicao" | "Bebida" | "Sobremesa",
    ingredients: string[],
    description?: string,
    image?: string
  ): Promise<void> => {
    const newProduct: Product["dataValues"] = {
      name,
      price,
      description,
      category: category,
      ingredients,
      image,
    };

    try {
      await this.product.create(newProduct);
    } catch (error) {
      console.error(error);
    }
  };

  remove = async (id: number): Promise<void> => {
    await this.product.destroy({
      where: { id },
    });
  };

  findByFavoriteIds = async (
    favoritesProductIdList: number[]
  ): Promise<Product[]> => {
    const products = await this.product.findAll({
      where: {
        id: { [Op.in]: favoritesProductIdList },
      },
    });

    return products;
  };

  findByName = async (name: string): Promise<Product | null> => {
    const product = await this.product.findOne({
      where: { name },
    });

    return product;
  };

  findById = async (id: number): Promise<Product | null> => {
    const product = await this.product.findOne({
      where: { id: id },
    });

    return product;
  };

  findByCategory = async (
    category: "Refeicao" | "Bebida" | "Sobremesa"
  ): Promise<Product[]> => {
    const products = await this.product.findAll({
      where: { category },
    });

    return products;
  };

  findAll = async (): Promise<Product[]> => {
    const products = await this.product.findAll();
    return products;
  };
}
