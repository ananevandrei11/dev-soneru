export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  LOGOUT: '/logout',
  TASKS: "/tasks",
  COLLECTIONS: "/collections",
  COLLECTIONS_PRODUCT_ID: "/collections/product/:id",
} as const;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];