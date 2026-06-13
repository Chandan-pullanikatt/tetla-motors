import { NextResponse } from "next/server";
import { db, heroContent } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/guard";
import { eq } from "drizzle-orm";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await db.select().from(heroContent).limit(1);
  return NextResponse.json(rows[0] ?? null);
}

export async function PUT(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const existing = await db.select().from(heroContent).limit(1);
  const values = { ...body, updatedAt: new Date() };
  let row;
  if (existing.length === 0) {
    [row] = await db.insert(heroContent).values(values).returning();
  } else {
    [row] = await db.update(heroContent).set(values).where(eq(heroContent.id, existing[0].id)).returning();
  }
  return NextResponse.json(row);
}
