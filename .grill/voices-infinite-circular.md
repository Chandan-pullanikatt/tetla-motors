# Grill: Voices — Infinite Circular Coverflow
Date: 2026-05-31

## Intent
Make the "Voices That Inspire Us" coverflow infinite and circular. Manual navigation (arrows + dots) never hits a dead end. Clicking next on video 7 wraps to video 1; clicking prev on video 1 wraps to video 7. Animation always goes in the direction of the click — no snap, no jump, no reverse.

## Key decisions
- Decision: Circular offset math (shortest-path wrap) instead of linear clamp. Reason: all 7 cards are always positioned on both sides of center, so the wrap is visually seamless — cards slide in the click direction naturally.
- Decision: Both arrow buttons always enabled (no disabled state). Reason: infinite — there is no first or last.
- Decision: Same 7 items, no duplication of the items array. Reason: circular offset handles positioning; duplication is unnecessary complexity.

## Out of scope
- Auto-advance / timer rotation (user explicitly wants manual-only)
- Any change to the card visuals or video autoplay behaviour
