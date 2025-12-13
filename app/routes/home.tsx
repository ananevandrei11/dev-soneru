import type { Route } from "./+types/home";
import { useFetcher, type ActionFunction, type AppLoadContext } from "react-router";

export function meta() {
  return [
    { title: "Dev Soneru" },
    { name: "description", content: "Welcome to Dev Soneru!" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher();

  return <div>HOME
  </div>;
}
