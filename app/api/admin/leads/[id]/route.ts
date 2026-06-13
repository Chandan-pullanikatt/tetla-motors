import { NextResponse } from "next/server";
import { db, leads } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/guard";
import { eq } from "drizzle-orm";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json(); // { status } or { notes }
  const [row] = await db.update(leads).set(body).where(eq(leads.id, id)).returning();
  return NextResponse.json(row);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await db.delete(leads).where(eq(leads.id, id));
  return NextResponse.json({ ok: true });
}
