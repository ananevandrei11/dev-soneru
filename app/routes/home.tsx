import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Dev Soneru" },
    { name: "description", content: "Welcome to Dev Soneru!" },
  ];
}

export function loader({ }: Route.LoaderArgs) {
  return { message: 'HOME PAGE' };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <div>{loaderData.message}</div>;
}
