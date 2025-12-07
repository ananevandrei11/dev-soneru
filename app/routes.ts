import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

/* DEFAULT ROUT - export default [index("routes/home.tsx")] satisfies RouteConfig; */
const homeRoute = index("routes/home.tsx");

const loginRoute = route("login", "routes/login.tsx");

export default [
  homeRoute,
  loginRoute,
  route("collections", "routes/collections.tsx"),
  route("collections/product/:id", "routes/collections.product.id.tsx"),
  // ...prefix("collections", [
  //   index("routes/collections.tsx"),
  //   route("collections/product/:id", "routes/collections.product.id.tsx")
  // ]),
] satisfies RouteConfig;
