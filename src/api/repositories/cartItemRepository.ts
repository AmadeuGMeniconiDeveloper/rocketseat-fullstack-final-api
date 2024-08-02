import CartItem from "../models/CartItem.js";

export class CartItemRepository {
  private readonly cartItem = CartItem;

  add = async (
    productId: number,
    userId: number,
    quantity: number
  ): Promise<void> => {
    try {
      await this.cartItem.create({
        productId: productId,
        userId: userId,
        quantity,
      });
    } catch (error) {
      console.error(error);
    }
  };

  remove = async (productId: number, userId: number): Promise<void> => {
    try {
      await this.cartItem.destroy({
        where: { productId: productId, userId: userId },
      });
    } catch (error) {
      console.error(error);
    }
  };

  removeByUserId = async (userId: number): Promise<void> => {
    try {
      await this.cartItem.destroy({
        where: { userId: userId },
      });
    } catch (error) {
      console.error(error);
    }
  };

  updateQuantity = async (
    userId: number,
    productId: number,
    quantity: number
  ): Promise<void> => {
    console.log(quantity);
    try {
      await this.cartItem.update(
        { quantity },
        { where: { productId: productId, userId: userId } }
      );
    } catch (error) {
      console.error("Error updating quantity: ", error);
    }
  };

  findOne = async (
    productId: number,
    userId: number
  ): Promise<CartItem | null> => {
    const cartItem = await this.cartItem.findOne({
      where: { productId: productId, userId: userId },
    });

    return cartItem;
  };

  findByUserId = async (userId: number): Promise<CartItem[]> => {
    const cartItems = await this.cartItem.findAll({
      where: { userId: userId },
      order: [["createdAt", "DESC"]],
    });
    return cartItems;
  };

  submitCartItems = async (userId: number): Promise<void> => {
    // DO: Implement submitCartItems
  };
}
