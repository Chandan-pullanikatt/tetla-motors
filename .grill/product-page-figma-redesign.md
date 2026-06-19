# Grill: Product Page — Full Figma Redesign (CMS-driven)
Date: 2026-06-14

## Intent
Completely rebuild the product page to match the new Figma (3 screenshots). All content editable per-product from the admin CMS, pulling from Neon. Keep the existing site Footer. Fonts: Urbanist (primary), Chakra Petch (secondary).

## Page structure (top → bottom)
1. **Hero** — full-bleed media (image OR video, per product), dark overlay; bottom-left: name + tagline; bottom-right: "Test Ride" (outline) + "Book Now" (white) buttons; site Header on top. Placeholder media = landing video (/v1.mp4) until real 360 swapped in.
2. **Description card** — overlapping white card; paragraph with red-highlighted words (markdown **word** → red); faint TETLA "T" watermark; 5-stat strip below: Range, Full Charge, Top Speed, Running Cost, Battery Warranty.
3. **Showcase image** — large full-width product photo.
4. **Feature bento** — fixed 4 cards (image + title + description), asymmetric grid (light section).
5. **Feature coverflow** — SAME 4 feature cards re-presented as a dark 3D coverflow with prev/next arrows.
6. **Footer** — existing site Footer, unchanged.

## Constraints
- CMS-driven: every product edits its own content via admin panel
- Same layout for all products; content differs
- Chakra Petch ONLY for big section titles; Urbanist for stats, labels, body
- Hero accepts either image or video (Cloudinary upload), whichever set renders full-bleed
- Description red highlights authored with markdown-style **word**
- Bento = fixed 4 cards; stats = 5 fixed labels with editable values

## Key decisions
- Decision: 360 viewer stays, goes in the HERO, built LAST. Reason: user wants real 360 there eventually; Figma uses landing video as placeholder. Build rest of page first, swap hero media to Frame360 as final step.
- Decision: Store all page content in a new `page_content` jsonb column on products. Reason: rich nested structure (hero media, stats, 4 feature cards, description) — one flexible column beats many columns + migrations.
- Decision: Bento + coverflow share one feature-card dataset (user confirmed option A).
- Decision: Build order — (1) data model + seed + public page rendering, (2) admin CMS form fields. Reason: see the design first, then wire editing.
- Decision: Initial seed images point to /products/{slug}/*.jpg dropped in public; admin can later replace via Cloudinary.

## Out of scope (for now)
- Swapping hero placeholder media → real 360 (deferred to final step, after page approved)
- Replacing the low-res/watermarked 360 frames with proper turntable footage
