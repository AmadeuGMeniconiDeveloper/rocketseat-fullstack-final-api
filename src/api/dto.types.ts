export type UserDTO = {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
};

export type SessionUserID = {
  userId: string;
};

export type AuthenticationHeaderDTO = {
  authorizationHeader: string | undefined;
  sessionUserId: string;
};

export type SignUpDTO = {
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
};

export type SignInDTO = {
  email: string;
  password: string;
};

export type FavoriteDTO = {
  favoriteProductId: string;
};

export type FavoritesListDTO = {
  favoriteProductIdList: string[];
};

export type ProductDTO = {
  id: string;
  name: string;
  price: string;
  category: "Refeicao" | "Bebida" | "Sobremesa";
  ingredients: string[];
  image?: string;
  description?: string;
};

export type CartItemtDTO = {
  productId: string;
  quantity: string;
};

export type CartItemtListDTO = {
  userId: string;
  cartItems: CartItemtDTO[];
};
