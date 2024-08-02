import AppError from "../../errors/AppErrors.js";

import Product from "../models/Product.js";

import { FavoriteRepository } from "../repositories/favoriteRepository.js";
import { ProductRepository } from "../repositories/productRepository.js";
import { UserRepository } from "../repositories/userRepository.js";

export class FavoriteService {
  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly productRepository: ProductRepository
  ) {}

  getFavorites = async (userId: string): Promise<number[]> => {
    const favoriteEntityList = await this.favoriteRepository.findByUserId(
      Number(userId)
    );

    const favoriteProductIdList = favoriteEntityList.map(
      favorite => favorite.dataValues.productId
    );

    return favoriteProductIdList;
  };

  toggleFavorite = async (
    favoriteProductId: string,
    userId: string
  ): Promise<number[]> => {
    const existingFavorite = await this.favoriteRepository.findByProductId(
      Number(favoriteProductId)
    );

    if (existingFavorite) {
      await this.favoriteRepository.remove(
        Number(favoriteProductId),
        Number(userId)
      );
    } else {
      await this.favoriteRepository.add(
        Number(favoriteProductId),
        Number(userId)
      );
    }

    const favoritesList = await this.getFavorites(userId);

    return favoritesList;
  };

  // updateFavorites = async (
  //   favoriteProductIdList: string[],
  //   userId: string
  // ): Promise<void> => {
  //   const allProductList = await this.productRepository.findAll();

  //   if (allProductList.length === 0) {
  //     console.error("Products not found");
  //     throw new AppError(404, "Products not found");
  //   }

  //   const allProductIdList = allProductList.map(product =>
  //     String(product.dataValues.id)
  //   );

  //   const possibleFavoriteProductIdList = favoriteProductIdList.filter(id =>
  //     allProductIdList.includes(id)
  //   );

  //   const newFavoriteProductIdList = possibleFavoriteProductIdList.map(id =>
  //     Number(id)
  //   );

  //   await this.favoriteRepository.update(
  //     newFavoriteProductIdList,
  //     Number(userId)
  //   );
  // };
}
