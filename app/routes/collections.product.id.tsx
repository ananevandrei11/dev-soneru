import { useMemo } from "react";
import type { Route } from "./+types/collections.product.id";
import { useMatches } from "react-router";
import { ROUTES } from "~/shared/route-path";

export async function loader({ params }: Route.LoaderArgs) {
  return { id: params.id };
}

export default function Component({
  loaderData,
}: Route.ComponentProps) {
  /*
  const matches = useMatches();
  const crumbs = useMemo(
    () =>
      // matches
      //   .filter((match) => Boolean((match.handle as { crumb?: CrumbType })?.crumb))
      //   .map((match) => (match.handle as { crumb: CrumbType })?.crumb(match.params.id)),
    [matches],
  );
  */
  return <h1>{loaderData?.id}</h1>;
}
