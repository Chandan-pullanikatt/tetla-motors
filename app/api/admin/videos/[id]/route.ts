import { NextResponse } from "next/server";
import { db, siteVideos } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/guard";
import { eq } from "drizzle-orm";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json(); // { url, publicId } or { url: null, publicId: null }
  const [row] = await db
    .update(siteVideos)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(siteVideos.id, id))
    .returning();
  return NextResponse.json(row);
}
