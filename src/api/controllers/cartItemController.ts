import { Response, NextFunction } from "express";
import { CartItemService } from "../services/cartItemService.js";
import { CartItemtDTO } from "../dto.types.js";
import { AuthenticatedRequest } from "../middleware/types.js";

export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  addCartItem = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const cartItemDTO: CartItemtDTO = { ...req.body };
    const sessionUser: typeof req.sessionUser = req.sessionUser;
    if (!sessionUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await this.cartItemService.addCartItem(cartItemDTO, sessionUser.sub);

    return res
      .status(201)
      .json({ message: "Cart item added or quantity updated" });
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

    return res.status(201).json({ data: cartItems });
  };

  removeCartItem = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const cartItemDTO: CartItemtDTO = { ...req.body };
    const sessionUser: typeof req.sessionUser = req.sessionUser;
    if (!sessionUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await this.cartItemService.removeCartItem(cartItemDTO, sessionUser.sub);

    return res.status(201).json({ message: "Cart item removed" });
  };

  updateQuantity = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const cartItemDTO: CartItemtDTO = { ...req.body };
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
