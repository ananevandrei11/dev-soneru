import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dev Soneru" },
    { name: "description", content: "Welcome to Dev Soneru!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  // const { message } = loaderData;
  console.log(loaderData);
  return <div>HOME PAGE</div>;
}
