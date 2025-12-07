
import type { Route } from "./+types/collections";

export async function loader({ context }: Route.LoaderArgs) {
  return { id: context.cloudflare.ctx.props };
}

export default function Component({ }: Route.ComponentProps) {
  return <h1>Collections</h1>;
}
