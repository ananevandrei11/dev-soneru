import { createClient } from "@supabase/supabase-js";

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