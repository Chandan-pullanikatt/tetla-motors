import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Server-only Neon connection. The DATABASE_URL must NEVER be exposed to the
// browser — all DB access happens in Server Components, API routes, or actions.
const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });
export * from "./schema";
