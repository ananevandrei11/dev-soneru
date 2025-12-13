import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import type { Database } from "./dto/database.types";

export function createSupabaseClient(env: Env, request: Request) {
  const headers = new Headers();
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_ANON_KEY;

  const supabase = createServerClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "") as {
            name: string;
            value: string;
          }[];
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => headers.append(
            "Set-Cookie",
            serializeCookieHeader(name, value, options)
          )
          );
        },
      },
      auth: {
        autoRefreshToken: true,
      }
    }
  );

  return { supabase, headers };
}

// export function createSupabaseClient(env: Env, request: Request) {
//   const supabaseUrl = env.SUPABASE_URL;
//   const supabaseKey = env.SUPABASE_ANON_KEY;
//   const headers = new Headers();


//   const supabase = createServerClient<Database>(supabaseUrl, supabaseKey, {
//     cookies: {
//       getAll() {
//         return parseCookieHeader(request.headers.get("Cookie") ?? "") as {
//           name: string;
//           value: string;
//         }[];
//       },
//       setAll(cookiesToSet) {
//         cookiesToSet.forEach(({ name, value, options }) =>
//           headers.append(
//             "Set-Cookie",
//             serializeCookieHeader(name, value, options)
//           )
//         );
//       },
//     },
//     auth: {
//       persistSession: false,
//       detectSessionInUrl: false,
//     }
//   });
//   const headers = new Headers();

//   return { supabase, headers };
// }
