import { NextResponse } from "next/server";
import { db, leads } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/guard";
import { desc } from "drizzle-orm";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await db.select().from(leads).orderBy(desc(leads.createdAt));
  return NextResponse.json(rows);
}
