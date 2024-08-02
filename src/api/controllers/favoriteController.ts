import { Response, NextFunction } from "express";
import { FavoriteService } from "../services/favoriteService.js";
import { AuthenticatedRequest } from "../types.js";

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

    return res.status(201).json(favorites);
  };

  toggleFavorite = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { favoriteProductId } = req.params;
    const sessionUser: typeof req.sessionUser = req.sessionUser;

    if (!sessionUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const favoriteIdList = await this.favoriteService.toggleFavorite(
      favoriteProductId,
      sessionUser.sub
    );

    return res.status(201).json(favoriteIdList);
  };

  // updateFavorites = async (
  //   req: AuthenticatedRequest,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   const favoriteProductIdList: string[] = req.body;
  //   const sessionUser: typeof req.sessionUser = req.sessionUser;

  //   if (!sessionUser) {
  //     return res.status(401).json({ message: "Unauthorized" });
  //   }

  //   await this.favoriteService.updateFavorites(
  //     favoriteProductIdList,
  //     sessionUser.sub
  //   );

  //   return res.status(201).json({ message: "Favorites updated" });
  // };
}
