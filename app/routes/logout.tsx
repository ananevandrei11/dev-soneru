import { redirect, type ActionFunction, type AppLoadContext, type LoaderFunction } from "react-router";
import { ROUTES } from "~/shared/route-path";

export const loader: LoaderFunction<AppLoadContext> = async ({ request, context }) => {
  try {
    const { supabaseClient, session: sessionCtx } = context;
    const { error } = await supabaseClient.supabase.auth.signOut();

    if (error) {
      return { error: error?.message || "Error Logout" };
    }

    const session = await sessionCtx.getSession(request.headers.get("Cookie"));
    session.set("userId", "");
    session.set("email", undefined);
    session.set("role", undefined);
    supabaseClient.headers.append("Set-Cookie", await sessionCtx.destroySession(session));

    return redirect(ROUTES.LOGIN, { headers: supabaseClient.headers });
  } catch (error) {
    console.error("Login error:", JSON.stringify(error, null, 2));
    return redirect(ROUTES.HOME);
  }
};