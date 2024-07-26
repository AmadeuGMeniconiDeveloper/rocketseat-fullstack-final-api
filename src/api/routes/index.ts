import { Router } from "express";

import userRoutes from "./user.routes.js";
import favoriteRoutes from "./favorite.routes.js";
import productRoutes from "./product.routes.js";
import cartItemRoutes from "./cartItem.routes.js";
import SessionRoutes from "./session.routes.js";

const apiRoutes = Router();

apiRoutes.use("/users", userRoutes);
apiRoutes.use("/favorites", favoriteRoutes);
apiRoutes.use("/products", productRoutes);
apiRoutes.use("/cartItems", cartItemRoutes);
apiRoutes.use("/sessions", SessionRoutes);

export default apiRoutes;
