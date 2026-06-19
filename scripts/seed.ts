/**
 * Seeds the Neon database with initial content.
 * Run after `npm run db:push`:  npm run db:seed
 */
import { db, products, teamMembers, heroContent, siteVideos } from "../lib/db";
import type { ProductPageContent } from "../lib/db/schema";
import { eq, sql } from "drizzle-orm";

// Default page content per the Figma redesign. Image paths point to
// public/products/{slug}/… (drop the photos there, or replace via the CMS).
function defaultPageContent(slug: string, tagline: string): ProductPageContent {
  const base = `/products/${slug}`;
  return {
    tagline,
    hero: { type: "video", url: "/v1.mp4" },
    description:
      "Experience effortless electric mobility with the TETLA Classic. Combining timeless **design**, **smart technology**, and zero-emission performance, it's built for drivers who want **sustainability** without compromising **style**.",
    stats: {
      range: "100 KM",
      fullCharge: "4 Hour",
      topSpeed: "100 KM",
      runningCost: "₹0.15/km",
      batteryWarranty: "4 Year",
    },
    showcaseImage: `${base}/showcase.jpg`,
    features: [
      { image: `${base}/feature-1.jpg`, title: "Built for Daily Commutes", description: "Reliable electric mobility designed for work, shopping, and everyday travel without the fuel costs" },
      { image: `${base}/feature-2.jpg`, title: "Bold Urban Design", description: "Sporty body lines, premium finishes, and vibrant colors create a design that stands out on every ride" },
      { image: `${base}/feature-3.jpg`, title: "Modern LED", description: "Sharp LED headlamps provide better visibility" },
      { image: `${base}/feature-4.jpg`, title: "Color Options", description: "Available in eye-catching color variants" },
    ],
  };
}

async function seed() {
  console.log("Seeding products…");
  await db
    .insert(products)
    .values([
      { name: "TETLA Classic", slug: "tetla-classic", price: "45999", category: "bike", specs: { model: "RTO Model", range: "Up to 100 Km", charge_time: "2 to 4 Hrs" }, images: ["/pa1.jpg"], isActive: true },
      { name: "TETLA E9 Pro", slug: "tetla-e9-pro", price: "62999", category: "bike", specs: { model: "RTO Model", range: "Up to 120 Km", charge_time: "2 to 4 Hrs" }, images: ["/pa3.jpg"], isActive: true },
      { name: "TETLA Pro Plus", slug: "tetla-pro-plus", price: "78999", category: "bike", specs: { model: "Premium", range: "Up to 140 Km", charge_time: "2 to 3 Hrs" }, images: ["/pa2.jpg"], isActive: true },
      { name: "TETLA Ailes", slug: "tetla-ailes", price: "89999", category: "bike", specs: { model: "Sport", range: "Up to 150 Km", charge_time: "2 to 3 Hrs" }, images: ["/pa4.jpg"], isActive: true },
      { name: "TETLA Voiture", slug: "tetla-voiture", price: "120000", category: "bike", specs: { model: "Elite", range: "Up to 180 Km", charge_time: "1 to 2 Hrs" }, images: ["/pa5.jpg"], isActive: true },
    ])
    .onConflictDoNothing({ target: products.slug });

  console.log("Seeding product page content…");
  const taglines: Record<string, string> = {
    "tetla-classic": "Efficient, stylish, and built for city rides",
    "tetla-e9-pro": "Smart performance with premium comfort",
    "tetla-pro-plus": "Next-gen riding with advanced tech built in",
    "tetla-ailes": "Built for speed, designed for the bold",
    "tetla-voiture": "The pinnacle of electric luxury on two wheels",
  };
  const allProducts = await db.select().from(products);
  for (const p of allProducts) {
    if (p.pageContent) continue; // don't overwrite edited content
    await db
      .update(products)
      .set({ pageContent: defaultPageContent(p.slug, taglines[p.slug] ?? "") })
      .where(eq(products.id, p.id));
  }

  console.log("Seeding team members…");
  await db
    .insert(teamMembers)
    .values([
      { name: "K T Davood", role: "CEO", imageUrl: "/ceo.png", displayOrder: 1 },
      { name: "Dr Ashraf C", role: "CMD", imageUrl: "/cmd.png", displayOrder: 2 },
      { name: "David Haley", role: "CTO", imageUrl: "/cto.png", displayOrder: 3 },
    ])
    .onConflictDoNothing();

  console.log("Seeding hero content…");
  const existingHero = await db.select().from(heroContent).limit(1);
  if (existingHero.length === 0) {
    await db.insert(heroContent).values({});
  }

  console.log("Seeding video slots…");
  await db
    .insert(siteVideos)
    .values([
      { key: "hero", label: "Hero Background" },
      { key: "va1", label: "Why Choose Us — Safety" },
      { key: "va2", label: "Why Choose Us — Emissions" },
      { key: "va3", label: "Why Choose Us — Design" },
      { key: "lineup", label: "CTA / Lineup Banner" },
      { key: "testimonial_1", label: "Testimonial 1" },
      { key: "testimonial_2", label: "Testimonial 2" },
      { key: "testimonial_3", label: "Testimonial 3" },
      { key: "testimonial_4", label: "Testimonial 4" },
      { key: "testimonial_5", label: "Testimonial 5" },
      { key: "testimonial_6", label: "Testimonial 6" },
      { key: "testimonial_7", label: "Testimonial 7" },
    ])
    .onConflictDoNothing({ target: siteVideos.key });

  console.log("✓ Seed complete");
  // neon-http is stateless; nothing to close
  void sql;
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
