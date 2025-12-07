import { Form, redirect, type ActionFunction, type AppLoadContext } from "react-router";

export const action: ActionFunction<AppLoadContext> = async ({ request, context }) => {
  const form = await request.formData();
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  const response = new Response();
  const { supabaseAuth, session: sessionCtx } = context;
  const { data, error } = await supabaseAuth.auth.signInWithPassword({ email, password });
  if (error || !data.session) {
    return { error: error?.message || "Error Login" };
  }

  const session = await sessionCtx.getSession(request.headers.get("Cookie"));
  session.set("userId", data.user.id);
  response.headers.append("Set-Cookie", await sessionCtx.commitSession(session));

  return redirect("/", { headers: response.headers });
};

export default function LoginRoute() {
  return (
    <Form method="POST" action="/login">
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