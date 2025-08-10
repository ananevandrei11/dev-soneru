import { type RouteConfig, index, route } from "@react-router/dev/routes";

/* DEFAULT ROUT - export default [index("routes/home.tsx")] satisfies RouteConfig; */
const homeRoute = index("routes/home.tsx");

const loginRoute = route("login", "routes/login.tsx");

export default [
  homeRoute,
  loginRoute,
] satisfies RouteConfig;