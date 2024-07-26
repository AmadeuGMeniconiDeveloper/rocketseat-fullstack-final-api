import { CartItemtDTO } from "../dto.types.js";
import CartItem from "../models/CartItem.js";

export class CartItemRepository {
  private readonly cartItem = CartItem;

  add = async (
    productId: string,
    userId: string,
    quantity: number
  ): Promise<void> => {
    try {
      await this.cartItem.create({
        productId: Number(productId),
        userId: Number(userId),
        quantity,
      });
    } catch (error) {
      console.error(error);
    }
  };

  remove = async (productId: string, userId: string): Promise<void> => {
    try {
      await this.cartItem.destroy({
        where: { productId: Number(productId), userId: Number(userId) },
      });
    } catch (error) {
      console.error(error);
    }
  };

  removeByUserId = async (userId: string): Promise<void> => {
    try {
      await this.cartItem.destroy({
        where: { userId: Number(userId) },
      });
    } catch (error) {
      console.error(error);
    }
  };

  updateQuantity = async (
    userId: string,
    productId: string,
    quantity: number
  ): Promise<void> => {
    try {
      await this.cartItem.update(
        { quantity },
        { where: { productId: Number(productId), userId: Number(userId) } }
      );
    } catch (error) {
      console.error(error);
    }
  };

  findOne = async (
    productId: string,
    userId: string
  ): Promise<CartItem | null> => {
    const cartItem = await this.cartItem.findOne({
      where: { productId: Number(productId), userId: Number(userId) },
    });

    return cartItem;
  };

  findByUserId = async (userId: string): Promise<CartItem[]> => {
    const cartItems = await this.cartItem.findAll({
      where: { userId: Number(userId) },
    });
    return cartItems;
  };

  submitCartItems = async (userId: string): Promise<void> => {
    // DO: Implement submitCartItems
  };
}
