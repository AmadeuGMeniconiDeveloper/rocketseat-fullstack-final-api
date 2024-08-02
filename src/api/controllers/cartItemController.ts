import { Response, NextFunction } from "express";
import { CartItemService } from "../services/cartItemService.js";
import { AuthenticatedRequest } from "../types.js";

export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  addCartItem = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const cartItemDTO: {
      productId: string;
      quantity: string;
    } = req.body;
    const sessionUser: typeof req.sessionUser = req.sessionUser;

    if (!sessionUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await this.cartItemService.addCartItem(cartItemDTO, sessionUser.sub);

    const cartItems = await this.cartItemService.getCartItems(sessionUser.sub);

    return res.status(201).json(cartItems);
  };

  getCartItems = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const sessionUser: typeof req.sessionUser = req.sessionUser;

    if (!sessionUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const cartItems = await this.cartItemService.getCartItems(sessionUser.sub);

    return res.status(201).json(cartItems);
  };

  removeCartItem = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const sessionUser: typeof req.sessionUser = req.sessionUser;
    if (!sessionUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await this.cartItemService.removeCartItem(id, sessionUser.sub);

    const cartItems = await this.cartItemService.getCartItems(sessionUser.sub);

    return res.status(201).json(cartItems);
  };

  updateQuantity = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const cartItemDTO: {
      productId: string;
      quantity: string;
    } = req.body;
    const sessionUser: typeof req.sessionUser = req.sessionUser;
    if (!sessionUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await this.cartItemService.updateQuantity(cartItemDTO, sessionUser.sub);
    return res.status(201).json({ message: "Quantity updated" });
  };

  CheckoutCartItems = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const sessionUser: typeof req.sessionUser = req.sessionUser;
    if (!sessionUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await this.cartItemService.CheckoutCartItems(sessionUser.sub);

    return res.status(201).json({ message: "Enjoy your order :)" });
  };
}
