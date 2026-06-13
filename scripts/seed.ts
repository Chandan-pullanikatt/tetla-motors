/**
 * Seeds the Neon database with initial content.
 * Run after `npm run db:push`:  npm run db:seed
 */
import { db, products, teamMembers, heroContent, siteVideos } from "../lib/db";
import { sql } from "drizzle-orm";

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
