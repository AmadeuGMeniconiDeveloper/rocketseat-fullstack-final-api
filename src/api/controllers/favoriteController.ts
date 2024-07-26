import { Response, NextFunction } from "express";
import { FavoriteDTO, FavoritesListDTO } from "../dto.types.js";
import { FavoriteService } from "../services/favoriteService.js";
import { AuthenticatedRequest } from "../middleware/types.js";

export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  getFavorites = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const sessionUser: typeof req.sessionUser = req.sessionUser;
    if (!sessionUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const favorites = await this.favoriteService.getFavorites(sessionUser.sub);

    return res.status(201).json({ data: favorites });
  };

  toggleFavorite = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { favoriteProductId }: FavoriteDTO = { ...req.body };
    const sessionUser: typeof req.sessionUser = req.sessionUser;
    if (!sessionUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await this.favoriteService.toggleFavorite(
      favoriteProductId,
      sessionUser.sub
    );

    return res.status(201).json({ message: "Favorite toggled" });
  };

  updateFavorites = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { favoriteProductIdList }: FavoritesListDTO = {
      ...req.body,
    };
    const sessionUser: typeof req.sessionUser = req.sessionUser;
    if (!sessionUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("FavoritesListDTO: ", favoriteProductIdList, sessionUser);
    await this.favoriteService.updateFavorites(
      favoriteProductIdList,
      sessionUser.sub
    );

    return res.status(201).json({ message: "Favorites updated" });
  };
}
