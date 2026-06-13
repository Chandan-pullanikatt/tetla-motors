import { NextResponse } from "next/server";
import { db, teamMembers } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/guard";
import { asc } from "drizzle-orm";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await db.select().from(teamMembers).orderBy(asc(teamMembers.displayOrder));
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const [row] = await db.insert(teamMembers).values(body).returning();
  return NextResponse.json(row);
}
