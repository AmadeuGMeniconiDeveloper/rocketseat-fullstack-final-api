import { Model, DataTypes } from "sequelize";
import { sequelizeDatabase } from "../../database/index.js";

interface ProductAttributes {
  id?: number;
  name: string;
  price: number;
  category: "Refeicao" | "Bebida" | "Sobremesa";
  ingredients: string[];
  description?: string;
  image?: string;
  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class Product extends Model<ProductAttributes> {
  public id!: number;
  public name!: string;
  public price!: number;
  public description!: string;
  public ingredients!: string[];
  public image!: string;
  public category!: "Refeicao" | "Bebida" | "Sobremesa";
  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

Product.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    category: {
      allowNull: false,
      type: DataTypes.ENUM("Refeicao", "Bebida", "Sobremesa"),
    },
    ingredients: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: sequelizeDatabase,
    modelName: "Product",
  }
);

export default Product;
