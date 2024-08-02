import { Model, DataTypes } from "sequelize";
import { sequelizeDatabase } from "../../database/index.js";

interface CartItemAttributes {
  productId: number;
  userId: number;
  quantity: number;
  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class CartItem extends Model<CartItemAttributes> {
  public productId!: number;
  public userId!: number;
  public quantity!: number;
  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

CartItem.init(
  {
    productId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
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
    modelName: "CartItem",
  }
);

export default CartItem;
