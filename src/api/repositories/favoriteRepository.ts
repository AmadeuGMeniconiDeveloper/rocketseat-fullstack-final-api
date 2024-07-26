import Favorite from "../models/Favorite.js";

export class FavoriteRepository {
  private readonly favorite = Favorite;

  add = async (productId: string, userId: string): Promise<void> => {
    const newFavorite: Favorite["dataValues"] = {
      productId: Number(productId),
      userId: Number(userId),
    };

    try {
      await this.favorite.create(newFavorite);
    } catch (error) {
      console.error(error);
    }
  };

  remove = async (productId: string, userId: string): Promise<void> => {
    try {
      await this.favorite.destroy({
        where: { productId: Number(productId), userId: Number(userId) },
      });
    } catch (error) {
      console.error(error);
    }
  };

  update = async (productIds: string[], userId: string): Promise<void> => {
    const updatedFavorites: Favorite["dataValues"][] = productIds.map(
      productId => ({
        productId: Number(productId),
        userId: Number(userId),
      })
    );

    try {
      await this.favorite.destroy({
        where: { userId: Number(userId) },
      });

      await this.favorite.bulkCreate(updatedFavorites);
    } catch (error) {
      console.error(error);
    }
  };

  findByUserId = async (userId: string): Promise<Favorite[]> => {
    const favorites = await this.favorite.findAll({
      where: { userId: Number(userId) },
    });
    return favorites;
  };

  findByProductId = async (productId: string): Promise<Favorite | null> => {
    const favorite = await this.favorite.findOne({
      where: { productId: Number(productId) },
    });

    return favorite;
  };
}
