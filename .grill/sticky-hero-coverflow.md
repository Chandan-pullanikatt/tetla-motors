# Grill: Sticky Scale-Down Hero + Coverflow Slider
Date: 2026-05-30

## Intent
Replace the existing hero + products sections with two chained animations:
1. A sticky video that starts zoomed in (scale 1.3) and scales down to normal with border-radius as the user scrolls.
2. A 3D coverflow product slider directly below it — side cards fanned out with rotateY, center card prominent.

## Key decisions
- Decision: Use GSAP (not Framer Motion). Reason: framer-motion was explicitly removed two sessions ago to cut ~150KB of dead bundle weight; GSAP is already installed and wired with Lenis ScrollTrigger sync. Alternative considered: re-adding framer-motion — rejected.
- Decision: Content (text/stats) lives outside the scaled videoWrap so it doesn't scale with the video. It fades out independently as scroll begins.
- Decision: Coverflow positions defined as lookup arrays per offset index, not formulas — clearer to tune. Side cards rotate inward on Y-axis (left: +rotateY, right: −rotateY).

## Surfaced assumptions
- "Normal size" means scale 1.0 — video fills the sticky viewport exactly with border-radius rounding the corners.
- The coverflow slider should use the same product images/data already in the codebase.
- Keyboard nav (arrow keys) + click-to-center are sufficient; drag/swipe is out of scope for now.

---

# Grill: 3D Coverflow on Voices + Horizontal Scroll on Products
Date: 2026-05-30

## Intent
Move the 3D coverflow carousel to the "Voices That Inspire Us" section (testimonial reels), and revert the "Explore All Vehicles" product section back to a simple horizontal scroll with flat portrait cards.

## Constraints
- Voices coverflow must keep the white section background — no dark treatment
- Product cards must be 311×420px, border-radius 12px, with the black info bar (model, name, price) inside the card
- Voices cards keep their existing portrait reel style (280×500px video/image) — just add 3D depth/rotation on top

## Key decisions
- Decision: Voices section gets white-bg coverflow with 3D perspective (center pops forward, flanking cards lean back). Reason: maintains testimonial/lifestyle tone vs dark product catalog feel. Alternative considered: dark coverflow matching product treatment — rejected.
- Decision: Product section becomes flat overflow-x-auto horizontal scroll. Reason: user confirmed this was the prior layout. Alternative considered: keeping coverflow — rejected.
- Decision: Info bar (model tag, name, price) stays inside the product card at 311×420px. Reason: user confirmed. Alternative considered: info below the card — rejected.

## Surfaced assumptions
- "Square boxes" in the original request actually meant 311×420px portrait cards (not geometrically square)
- The Voices coverflow will use the same arrow + dot nav controls as the current product coverflow
