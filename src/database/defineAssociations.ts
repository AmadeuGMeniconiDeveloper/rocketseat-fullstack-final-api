import CartItem from "../api/models/CartItem.js";
import Favorite from "../api/models/Favorite.js";
import Product from "../api/models/Product.js";
import User from "../api/models/User.js";

export const defineAssociations = () => {
  // User to Favorite
  User.hasMany(Favorite, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Favorite.belongsTo(User, { foreignKey: "userId" });

  // Product to Favorite
  Product.hasMany(Favorite, {
    foreignKey: "productId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Favorite.belongsTo(Product, { foreignKey: "productId" });

  // User to CartItem
  User.hasMany(CartItem, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  CartItem.belongsTo(User, { foreignKey: "userId" });

  // Product to CartItem
  Product.hasMany(CartItem, {
    foreignKey: "productId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  CartItem.belongsTo(Product, { foreignKey: "productId" });
};
