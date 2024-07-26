import { Model, DataTypes } from "sequelize";
import { sequelizeDatabase } from "../../database/index.js";

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  updatedAt?: Date;
  createdAt?: Date;
}

class User extends Model<UserAttributes> {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: "customer" | "admin";
  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

User.init(
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
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM("customer", "admin"),
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
    modelName: "User",
  }
);

export default User;
