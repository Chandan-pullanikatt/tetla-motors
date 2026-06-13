import { SignJWT, jwtVerify } from "jose";

// Signed-cookie session for the admin CMS. Single source of truth for the
// session cookie name, signing, and verification — used by the login route,
// logout, middleware, and server-side guards.

export const SESSION_COOKIE = "tetla_admin_session";
const MAX_AGE = 60 * 60 * 8; // 8 hours

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET is not set");
  return new TextEncoder().encode(s);
}

export async function createSessionToken(email: string): Promise<string> {
  return new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());
}

export async function verifySessionToken(
  token: string | undefined
): Promise<{ email: string } | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return { email: payload.email as string };
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE = MAX_AGE;
