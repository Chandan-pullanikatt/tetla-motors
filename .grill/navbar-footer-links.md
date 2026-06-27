# Grill: Wire up all navbar + footer links

Date: 2026-06-27

## Intent
Make every link in the top navbar and the footer point to a real destination —
no dead `#` links — across the Tetla Motors site. "Original page" turned out to
mean a mix of real routes, on-page section anchors, and a couple of new stub pages.

## Key decisions
- Decision: Items with no page link to an existing **section anchor** where one exists.
  Reason: site is a long-scroll homepage; sections already exist for products/dealership/about/faq.
- Decision: **Remove Ownership** from both navbars. Reason: no page, no section, user dropped it.
- Decision: **Remove Service & Warranty** from footer. Reason: no content/section/page yet.
- Decision: **Stub `/terms` and `/privacy` pages** with placeholder legal text. Reason: legal links
  commonly needed for compliance even before final copy. Alternative rejected: removing them.
- Decision: Footer product links → real product slugs (`/products/tetla-classic`, `-e9-pro`,
  `-pro-plus`, `-ailes`, `-voiture`). Reason: those pages resolve via getProductBySlug.
- Decision: Saving Calculator → `/products/tetla-classic#savings` (add `id` to calculator section).
  Default model tetla-classic; user may change.
- Decision: FAQs → `/#faq` (real homepage section). Blogs → `/blog` page (no homepage section).
- Decision: **Social icons left as-is (`#`)**. Reason: no live accounts to point to yet.

## Surfaced assumptions (made explicit)
- There are TWO navbars: shared `Header` (inner pages, links to real pages) and the homepage's
  inline nav (page.tsx, scroll anchors). Both needed fixing; homepage `#ownership` and `#blogs`
  were already broken anchors.
- Header nav items already pointed at real pages except Ownership — only Ownership needed removal.

## Out of scope
- Social media links (left as `#`).
- Writing real legal copy for Terms/Privacy (placeholder only).
- Service and Warranty pages (removed, not built).
