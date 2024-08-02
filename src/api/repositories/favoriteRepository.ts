import Favorite from "../models/Favorite.js";

export class FavoriteRepository {
  private readonly favorite = Favorite;

  add = async (productId: number, userId: number): Promise<void> => {
    const newFavorite: Favorite["dataValues"] = {
      productId,
      userId,
    };

    try {
      await this.favorite.create(newFavorite);
    } catch (error) {
      console.error(error);
    }
  };

  remove = async (productId: number, userId: number): Promise<void> => {
    try {
      await this.favorite.destroy({
        where: { productId, userId },
      });
    } catch (error) {
      console.error(error);
    }
  };

  update = async (productIds: number[], userId: number): Promise<void> => {
    const updatedFavorites: Favorite["dataValues"][] = productIds.map(
      productId => ({
        productId: productId,
        userId: userId,
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

  findByUserId = async (userId: number): Promise<Favorite[]> => {
    const favorites = await this.favorite.findAll({
      where: { userId },
      attributes: ["productId"],
      order: [["createdAt", "DESC"]],
    });
    return favorites;
  };

  findByProductId = async (productId: number): Promise<Favorite | null> => {
    const favorite = await this.favorite.findOne({
      where: { productId: productId },
    });

    return favorite;
  };
}
