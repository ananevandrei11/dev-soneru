
import type { Route } from "./+types/collections";

export async function loader({ context }: Route.LoaderArgs) {
  return { id: context.cloudflare.ctx.props };
}

export default function Component({
  loaderData,
}: Route.ComponentProps) {
  console.log(loaderData);
  return <h1>Collections</h1>;
}
