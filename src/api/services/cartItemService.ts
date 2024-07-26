import CartItem from "../models/CartItem.js";

import { CartItemRepository } from "../repositories/cartItemRepository.js";

import { CartItemtDTO } from "../dto.types.js";

export class CartItemService {
  constructor(private readonly cartItemRepository: CartItemRepository) {}

  addCartItem = async (
    cartItemDTO: CartItemtDTO,
    userId: string
  ): Promise<void> => {
    const existingCartItem = await this.cartItemRepository.findOne(
      cartItemDTO.productId,
      userId
    );

    if (existingCartItem) {
      await this.cartItemRepository.updateQuantity(
        cartItemDTO.productId,
        cartItemDTO.productId,
        existingCartItem.quantity + 1
      );
      return;
    }

    await this.cartItemRepository.add(
      cartItemDTO.productId,
      userId,
      Number(cartItemDTO.quantity)
    );
  };

  getCartItems = async (userId: string): Promise<CartItem[]> => {
    const cartItems = await this.cartItemRepository.findByUserId(userId);

    if (!cartItems) {
      return [];
    }

    return cartItems;
  };

  updateQuantity = async (
    cartItemDTO: CartItemtDTO,
    userId: string
  ): Promise<void> => {
    await this.cartItemRepository.updateQuantity(
      userId,
      cartItemDTO.productId,
      Number(cartItemDTO.quantity)
    );
  };

  removeCartItem = async (
    cartItemDTO: CartItemtDTO,
    userId: string
  ): Promise<void> => {
    const existingCartItem = await this.cartItemRepository.findOne(
      cartItemDTO.productId,
      userId
    );

    if (!existingCartItem) {
      return;
    }

    await this.cartItemRepository.remove(cartItemDTO.productId, userId);
  };

  CheckoutCartItems = async (userId: string): Promise<void> => {
    const userCartItems = await this.cartItemRepository.findByUserId(userId);
    if (userCartItems.length === 0) {
      return;
    }

    await this.cartItemRepository.removeByUserId(userId);
  };
}
