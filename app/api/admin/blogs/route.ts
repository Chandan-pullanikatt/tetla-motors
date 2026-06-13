import { NextResponse } from "next/server";
import { db, blogs } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/guard";
import { desc } from "drizzle-orm";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await db.select().from(blogs).orderBy(desc(blogs.createdAt));
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const [row] = await db.insert(blogs).values(body).returning();
  return NextResponse.json(row);
}
