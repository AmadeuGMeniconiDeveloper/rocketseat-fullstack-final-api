import { Model, DataTypes } from "sequelize";
import { sequelizeDatabase } from "../../database/index.js";

interface FavoriteAttributes {
  userId: number;
  productId: number;
  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class Favorite extends Model<FavoriteAttributes> {
  public productId!: number;
  public userId!: number;
  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

Favorite.init(
  {
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
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
    modelName: "Favorite",
  }
);

export default Favorite;
