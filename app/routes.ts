import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { ROUTES } from "./shared/route-path";

/* DEFAULT ROUT - export default [index("routes/home.tsx")] satisfies RouteConfig; */
const homeRoute = index("routes/home.tsx");
const loginRoute = route(ROUTES.LOGIN.slice(1), "routes/login.tsx");
const logoutRoute = route(ROUTES.LOGOUT.slice(1), "routes/logout.tsx");
const tasksRoute = route(ROUTES.TASKS.slice(1), "routes/tasks.tsx");

export default [
  homeRoute,
  loginRoute,
  logoutRoute,
  tasksRoute,
  route(ROUTES.COLLECTIONS.slice(1), "routes/collections.tsx"),
  route(ROUTES.COLLECTIONS_PRODUCT_ID.slice(1), "routes/collections.product.id.tsx"),
  /*
  ...prefix("collections", [
    index("routes/collections.tsx"),
    route(ROUTES.COLLECTIONS_PRODUCT_ID, "routes/collections.product.id.tsx")
  ]),
  */
] satisfies RouteConfig;
