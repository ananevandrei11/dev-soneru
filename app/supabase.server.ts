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

/*
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export function createServerClient({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) {
  const supabaseUrl = SUPABASE_URL;
  const supabaseKey = SUPABASE_ANON_KEY;
  console.log({
    supabaseUrl,
    supabaseKey
  })

  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: { headers: { cookie: request.headers.get("cookie") || "" } },
    auth: { persistSession: false, detectSessionInUrl: false },
  });

  return { supabase, response };
}
*/