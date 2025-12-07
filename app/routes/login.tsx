import { Form, redirect, type ActionFunction, type AppLoadContext, useActionData } from "react-router";
import { useState, useEffect } from "react";

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

    const session = await sessionCtx.getSession(request.headers.get("Cookie"));
    session.set("userId", data.user.id);
    response.headers.append("Set-Cookie", await sessionCtx.commitSession(session, { expires: new Date(Date.now() + 60_000) }));

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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 border border-gray-200 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
          <p className="text-gray-600 mt-2">Log in to your account</p>
        </div>

        <Form method="POST" action="/login" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white shadow-sm"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              /*
              minLength={8}
              maxLength={128}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="The password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character."
              */
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white shadow-sm"
              placeholder="••••••"
            />
          </div>

          {actionData?.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {actionData.error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={email.trim() === "" || password.trim() === ""}
          >
            Log in
          </button>
        </Form>

        <div className="mt-6 text-center">
          <a href="#top" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            Forgot password?
          </a>
        </div>

        <div className="text-center text-gray-600 text-sm mt-6">
          Do not have account?{' '}
          <a href="#top" className="text-blue-600 hover:text-blue-800 font-medium">
            Registration
          </a>
        </div>
      </div>
    </div>
  );
}