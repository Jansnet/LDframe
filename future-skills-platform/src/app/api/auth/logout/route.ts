import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";

/**
 * Clears the session cookie. Accepts both JSON (programmatic) and form
 * (account-menu button) posts. For form posts, redirects to /.
 */
export async function POST(req: NextRequest) {
  const wantsRedirect = !req.headers.get("content-type")?.includes("application/json");
  const res = wantsRedirect
    ? NextResponse.redirect(new URL("/", req.url), { status: 303 })
    : NextResponse.json({ ok: true });
  res.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
