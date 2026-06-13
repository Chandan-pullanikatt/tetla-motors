import {
  pgTable,
  uuid,
  text,
  numeric,
  jsonb,
  boolean,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

// ─── Products ────────────────────────────────────────────────────────────────
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  price: numeric("price").notNull().default("0"),
  description: text("description"),
  category: text("category").default("bike"),
  specs: jsonb("specs").default({}),
  images: text("images").array().default([]),
  videoUrl: text("video_url"),
  videoPublicId: text("video_public_id"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ─── Blogs ─────────────────────────────────────────────────────────────────
export const blogs = pgTable("blogs", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  coverImage: text("cover_image"),
  author: text("author").default("TETLA Team"),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ─── Team members ────────────────────────────────────────────────────────────
export const teamMembers = pgTable("team_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  imageUrl: text("image_url"),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ─── Hero content (single row) ───────────────────────────────────────────────
export const heroContent = pgTable("hero_content", {
  id: uuid("id").defaultRandom().primaryKey(),
  headline: text("headline").default("TETLA Classic"),
  subheadline: text("subheadline").default("Efficient, stylish, and built for city rides"),
  stat1Label: text("stat1_label").default("Electric Range"),
  stat1Value: text("stat1_value").default("Up to 100 Km"),
  stat2Label: text("stat2_label").default("Full Charge"),
  stat2Value: text("stat2_value").default("2 to 4 Hrs"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// ─── Leads / CRM ─────────────────────────────────────────────────────────────
export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  enquiryType: text("enquiry_type"),
  message: text("message"),
  newsletter: boolean("newsletter").default(false),
  status: text("status").default("new"), // new | contacted | closed
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ─── Site videos (hero, section backgrounds, testimonials) ───────────────────
export const siteVideos = pgTable("site_videos", {
  id: uuid("id").defaultRandom().primaryKey(),
  key: text("key").unique().notNull(),
  label: text("label").notNull(),
  url: text("url"),
  publicId: text("public_id"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type Blog = typeof blogs.$inferSelect;
export type TeamMember = typeof teamMembers.$inferSelect;
export type HeroContent = typeof heroContent.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type SiteVideo = typeof siteVideos.$inferSelect;
