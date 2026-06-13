import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE } from "./session";

/** Server-side admin check for API routes / server actions performing writes. */
export async function requireAdmin(): Promise<{ email: string } | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
