import { createCookieSessionStorage } from "react-router";

export type SessionData = {
  userId: string;
  email?: string;
  role?: string;
};

type SessionFlashData = {
  error: string;
};

export function createSessionStorage(env: Env) {
  return createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      domain: env.DOMAIN,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
      secrets: [env.ENTRY_KEY],
      secure: true,
    },
  });
}

