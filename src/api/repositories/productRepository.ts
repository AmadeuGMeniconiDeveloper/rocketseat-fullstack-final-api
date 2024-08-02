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
  ): Promise<Product | null> => {
    const newProduct: Product["dataValues"] = {
      name,
      price,
      description,
      category,
      ingredients,
      image,
    };

    try {
      const product = await this.product.create(newProduct);
      return product;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  remove = async (id: number): Promise<void> => {
    await this.product.destroy({
      where: { id },
    });
  };

  findByIdList = async (idList: number[]): Promise<Product[]> => {
    const products = await this.product.findAll({
      where: {
        id: { [Op.in]: idList },
      },
      order: [["name", "ASC"]],
    });

    return products;
  };

  findByExactName = async (name: string): Promise<Product | null> => {
    const product = await this.product.findOne({
      where: { name: name },
    });

    return product;
  };

  findByName = async (name: string): Promise<Product[]> => {
    const product = await this.product.findAll({
      where: {
        name: { [Op.iLike]: `${name}%` },
      },
      order: [["name", "ASC"]],
    });

    return product;
  };

  findByNameOrIngredients = async (input: string): Promise<Product[]> => {
    const product = await this.product.findAll({
      where: {
        [Op.or]: [
          { ingredients: { [Op.overlap]: [input] } },
          {
            name: { [Op.iLike]: `${input}%` },
          },
        ],
      },
      order: [["name", "ASC"]],
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
      order: [["name", "ASC"]],
    });

    return products;
  };

  findAll = async (): Promise<Product[]> => {
    const products = await this.product.findAll({ order: [["name", "ASC"]] });
    return products;
  };

  //#CHECK/LOGIC: This method is too crude. Can be improved.
  update = async (product: Product["dataValues"]): Promise<Product[]> => {
    const [affectedCount, affectedRows] = await this.product.update(product, {
      where: { id: product.id },
      returning: true,
    });

    return affectedRows;
  };
}
