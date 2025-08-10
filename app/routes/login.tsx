import { Form, redirect, type ActionFunction } from "react-router";
import { commitSession, getSession } from "~/session.server";
import { createServerClient } from "~/supabase.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  const { supabase, response } = createServerClient({
    request,
    response: new Response(),
  });

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.session) {
    return { error: error?.message || "Error Login" };
  }

  const session = await getSession(request.headers.get("Cookie"));
  session.set("userId", data.user.id);
  response.headers.append("Set-Cookie", await commitSession(session));

  return redirect("/", { headers: response.headers });
};

export default function LoginRoute() {
  return (
    <Form method="post" action="/login">
      <div>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
      </div>
      <div>
        <label>
          Пароль
          <input name="password" type="password" required />
        </label>
      </div>
      <button type="submit">Войти</button>
    </Form>
  );
}