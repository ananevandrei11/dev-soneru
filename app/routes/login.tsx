import { Form, redirect, type ActionFunction, type AppLoadContext, useActionData } from "react-router";

export const action: ActionFunction<AppLoadContext> = async ({ request, context }) => {
  try {
    const form = await request.formData();
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const response = new Response();
    const { supabaseAuth, session: sessionCtx } = context;
    const { data, error } = await supabaseAuth.auth.signInWithPassword({ email, password });
    if (error || !data.session) {
      return { error: error?.message || "Error Login" };
    }

    console.log("ACTION LOGIN: START SESSION", JSON.stringify(data, null, 2));
    const session = await sessionCtx.getSession(request.headers.get("Cookie"));
    console.log("ACTION LOGIN: START SESSION", JSON.stringify(session, null, 2));
    session.set("userId", data.user.id);
    response.headers.append("Set-Cookie", await sessionCtx.commitSession(session));

    return redirect("/", { headers: response.headers });
  } catch (error) {
    console.error("Login error:", JSON.stringify(error, null, 2));
    return { error: error instanceof Error ? error.message : "An unexpected error occurred during login" };
  }
};

type ActionData = {
  error?: string;
};

export default function LoginRoute() {
  const actionData = useActionData<ActionData>();

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
        {actionData?.error && (
          <div style={{ color: "red", marginTop: "8px" }}>
            {actionData.error}
          </div>
        )}
      </div>
      <button type="submit">Войти</button>
    </Form>
  );
}