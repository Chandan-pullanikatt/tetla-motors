# Grill: Website Performance + CMS + CRM
Date: 2026-05-29

## Intent
Fix all performance lag on the Tetla Motors site (initial load + scroll jank), then build a CMS panel and CRM integration for lead management. Grilling was cut short when user said "fix everything and let's go" — performance fixes executed immediately; CMS and CRM deferred to next session.

## Constraints
- Stack is Next.js 16 / React 19 / GSAP / Lenis / Tailwind
- No additional backend is set up yet (CMS/CRM requires one)
- All fixes must be non-breaking — same visual output, same animations

## Key decisions
- Decision: Removed framer-motion entirely. Reason: `FadeIn.tsx` was the only file importing it and zero pages imported `FadeIn`. Dead bundle weight (~150KB).
- Decision: Removed `@studio-freight/lenis` (old package). Reason: Only `lenis` is actually used — duplicate dependency.
- Decision: Created `LazyVideo` component instead of changing video attributes. Reason: IntersectionObserver approach ensures src is never set until element is near viewport, avoiding any prefetch.
- Decision: Disabled Parallax on mobile and `prefers-reduced-motion`. Reason: GSAP ScrollTrigger `scrub` is GPU-heavy; zero visual value on small screens.
- Decision: Removed Parallax from the horizontal scroll vehicle carousel. Reason: Parallax uses vertical scroll position — it creates broken/invisible effects on horizontally-scrolled cards, just burning CPU.
- Decision: Added `ScrollTrigger.update()` inside the GSAP ticker loop (after Lenis RAF). Reason: Without it, ScrollTrigger positions are stale relative to Lenis virtual scroll, causing jitter.
- Decision: Added `gsap.ticker.lagSmoothing(0)`. Reason: Prevents GSAP from "catching up" on animation after tab focus loss, which causes stutters.

## Surfaced assumptions
- User did not know framer-motion was in the bundle unused
- User did not know all 5 videos were loading simultaneously on page load
- Parallax on carousel cards was assumed to look good but actually does nothing visible
- GSAP + Lenis integration was missing ScrollTrigger sync

## Open questions
- CMS panel: what content needs to be editable? (products, blogs, hero text, team bios — all? some?)
- CMS panel: who manages it? Technical staff or non-technical marketing team?
- CRM: which platform? (existing tool like HubSpot/Zoho, or build a simple custom leads table?)
- Where is the site deployed? (Vercel assumed but not confirmed) — affects CMS DB/API choices
- Enquiry form currently has no backend — needs an API route before CRM can capture leads

## Out of scope
- CMS and CRM not built yet — user wants them but session ended after perf fixes
