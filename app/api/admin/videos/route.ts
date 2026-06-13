import { NextResponse } from "next/server";
import { db, siteVideos } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/guard";
import { asc } from "drizzle-orm";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await db.select().from(siteVideos).orderBy(asc(siteVideos.key));
  return NextResponse.json(rows);
}
