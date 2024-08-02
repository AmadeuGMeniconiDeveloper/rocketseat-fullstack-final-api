import CartItem from "../models/CartItem.js";

import { CartItemRepository } from "../repositories/cartItemRepository.js";

export class CartItemService {
  constructor(private readonly cartItemRepository: CartItemRepository) {}

  addCartItem = async (
    cartItemDTO: {
      productId: string;
      quantity: string;
    },
    userId: string
  ): Promise<void> => {
    const existingCartItem = await this.cartItemRepository.findOne(
      Number(cartItemDTO.productId),
      Number(userId)
    );

    if (existingCartItem) {
      await this.cartItemRepository.updateQuantity(
        Number(userId),
        Number(cartItemDTO.productId),
        existingCartItem.dataValues.quantity + Number(cartItemDTO.quantity)
      );
      return;
    }

    await this.cartItemRepository.add(
      Number(cartItemDTO.productId),
      Number(userId),
      Number(cartItemDTO.quantity)
    );
  };

  getCartItems = async (userId: string): Promise<CartItem[]> => {
    const cartItemList = await this.cartItemRepository.findByUserId(
      Number(userId)
    );

    if (!cartItemList) {
      return [];
    }

    return cartItemList;
  };

  updateQuantity = async (
    cartItemDTO: {
      productId: string;
      quantity: string;
    },
    userId: string
  ): Promise<void> => {
    await this.cartItemRepository.updateQuantity(
      Number(userId),
      Number(cartItemDTO.productId),
      Number(cartItemDTO.quantity)
    );
  };

  removeCartItem = async (id: string, userId: string): Promise<void> => {
    const existingCartItem = await this.cartItemRepository.findOne(
      Number(id),
      Number(userId)
    );

    if (!existingCartItem) {
      return;
    }

    await this.cartItemRepository.remove(Number(id), Number(userId));
  };

  CheckoutCartItems = async (userId: string): Promise<void> => {
    const userCartItemList = await this.cartItemRepository.findByUserId(
      Number(userId)
    );

    if (userCartItemList.length === 0) {
      return;
    }

    await this.cartItemRepository.removeByUserId(Number(userId));
  };
}
