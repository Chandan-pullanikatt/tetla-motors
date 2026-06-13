import "server-only";
import { db } from "./index";
import { products, blogs, teamMembers, heroContent, siteVideos } from "./schema";
import { eq, desc, asc } from "drizzle-orm";

// ─── Public reads (server-side only) ─────────────────────────────────────────

export async function getActiveProducts() {
  return db.select().from(products).where(eq(products.isActive, true)).orderBy(asc(products.createdAt));
}

export async function getProductBySlug(slug: string) {
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);
  const p = rows[0];
  return p && p.isActive ? p : null;
}

export async function getPublishedBlogs() {
  return db
    .select()
    .from(blogs)
    .where(eq(blogs.isPublished, true))
    .orderBy(desc(blogs.publishedAt));
}

export async function getBlogBySlug(slug: string) {
  const rows = await db.select().from(blogs).where(eq(blogs.slug, slug)).limit(1);
  const b = rows[0];
  return b && b.isPublished ? b : null;
}

export async function getTeam() {
  return db.select().from(teamMembers).orderBy(asc(teamMembers.displayOrder));
}

export async function getHero() {
  const rows = await db.select().from(heroContent).limit(1);
  return rows[0] ?? null;
}

/** Returns a { key: url } map for all video slots that have a url set. */
export async function getVideos(): Promise<Record<string, string>> {
  const rows = await db.select().from(siteVideos);
  const map: Record<string, string> = {};
  for (const r of rows) if (r.url) map[r.key] = r.url;
  return map;
}
