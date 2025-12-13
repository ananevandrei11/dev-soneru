import { createRequestHandler } from "react-router";
import { createSessionStorage } from "~/session.server";
import { createSupabaseClient } from "~/supabase.server";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
    session: ReturnType<typeof createSessionStorage>;
    supabaseClient: ReturnType<typeof createSupabaseClient>;
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  fetch(request, env, ctx) {
    const session = createSessionStorage(env);
    const { supabase, headers } = createSupabaseClient(env, request);

    return requestHandler(request, {
      cloudflare: { env, ctx },
      session,
      supabaseClient: {
        supabase,
        headers
      },
    });
  },
} satisfies ExportedHandler<Env>;