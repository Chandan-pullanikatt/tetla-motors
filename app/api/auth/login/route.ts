import { NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth/session";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return NextResponse.json(
      { error: "Admin credentials are not configured on the server." },
      { status: 500 }
    );
  }

  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = await createSessionToken(email);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
