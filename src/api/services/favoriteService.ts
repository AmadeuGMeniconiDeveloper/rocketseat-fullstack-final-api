import AppError from "../../utils/AppError.js";

import Product from "../models/Product.js";

import { FavoriteRepository } from "../repositories/favoriteRepository.js";
import { ProductRepository } from "../repositories/productRepository.js";
import { UserRepository } from "../repositories/userRepository.js";

export class FavoriteService {
  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository
  ) {}

  getFavorites = async (userId: string): Promise<Product[]> => {
    const existingUser = await this.userRepository.findById(Number(userId));

    if (!existingUser) {
      console.error("User not found");
      throw new AppError(404, "User not found");
    }

    const favorites = await this.favoriteRepository.findByUserId(userId);

    const favoritesIds = favorites.map(
      favorite => favorite.dataValues.productId
    );

    const favoriteProducts = await this.productRepository.findByFavoriteIds(
      favoritesIds
    );

    return favoriteProducts;
  };

  toggleFavorite = async (
    favoriteProductId: string,
    userId: string
  ): Promise<void> => {
    const existingUser = await this.userRepository.findById(Number(userId));
    const existingProduct = await this.productRepository.findById(
      Number(favoriteProductId)
    );
    if (!existingUser) {
      console.error("User not found");
      throw new AppError(404, "User not found");
    }
    if (!existingProduct) {
      console.error("Product not found");
      throw new AppError(404, "Product not found");
    }

    const existingFavorite = await this.favoriteRepository.findByProductId(
      favoriteProductId
    );

    if (existingFavorite) {
      await this.favoriteRepository.remove(favoriteProductId, userId);
      return;
    } else {
      await this.favoriteRepository.add(favoriteProductId, userId);
      return;
    }
  };

  updateFavorites = async (
    favoriteProductIdList: string[],
    userId: string
  ): Promise<void> => {
    if (favoriteProductIdList.length === 0) {
      return;
    }

    const existingUser = await this.userRepository.findById(Number(userId));

    if (!existingUser) {
      console.error("User not found");
      throw new AppError(404, "User not found");
    }

    const allProductList = await this.productRepository.findAll();

    if (allProductList.length === 0) {
      console.error("Products not found");
      throw new AppError(404, "Products not found");
    }

    const allProductIdList = allProductList.map(product =>
      String(product.dataValues.id)
    );

    const correctedFavoritesIds = favoriteProductIdList.filter(id =>
      allProductIdList.includes(id)
    );

    await this.favoriteRepository.update(correctedFavoritesIds, userId);
  };
}
