import { createClient } from "@supabase/supabase-js";

export function createSupabaseClient(env: Env, request: Request) {
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    },
    auth: {
      persistSession: false,
      detectSessionInUrl: false,
    },
  });

  return supabase;
}
