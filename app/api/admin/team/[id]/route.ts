import { NextResponse } from "next/server";
import { db, teamMembers } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/guard";
import { eq } from "drizzle-orm";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const [row] = await db.update(teamMembers).set(body).where(eq(teamMembers.id, id)).returning();
  return NextResponse.json(row);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await db.delete(teamMembers).where(eq(teamMembers.id, id));
  return NextResponse.json({ ok: true });
}
