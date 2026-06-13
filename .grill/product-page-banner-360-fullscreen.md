# Grill: Product Page — Premium Banner + Full-Screen 360
Date: 2026-06-13

## Intent
Rebuild the first two sections of the product page. Both must completely fill the screen (100vh, edge-to-edge, no doubt). Section 1 = premium dark cinematic banner with overlaid text/notes. Section 2 = the interactive 360 viewer, also full-screen. Remove the current redundancy where both hero and section 2 showed the 360.

## Constraints
- Both sections fill the full viewport (100vh / 100vw), no gaps, no letterboxing
- Dark cinematic mood matching the landing page (#030712 / black, white Urbanist text)
- Section 1 is a STATIC premium banner, not the interactive 360 (360 gets its dedicated moment in section 2)
- Use the same product photo (/3601.jpeg) — no video background, no new assets
- Product photo is portrait (702x768, ratio 0.91) — plain object-cover would crop the bike, unacceptable

## Key decisions
- Decision: Section 1 banner uses the "blurred backdrop" technique — same photo blurred+darkened fills the screen as ambient backdrop, same photo sharp+complete centered on top, dark gradient overlay + text. Reason: fills screen edge-to-edge with no grey box and no cropping the bike, dark cinematic, uses existing asset. Alternative rejected: object-cover (crops bike due to portrait ratio); video background (user wants photo, not video).
- Decision: Section 1 hero no longer renders the Frame360. Reason: 360 moves to its own full-screen section 2.
- Decision: Section 2 = Frame360 full-screen (100vh), drag-to-rotate, dark theme. Reason: user wants the 360 to cover the complete screen.

## Surfaced assumptions
- The light studio theme previously built for the hero is being replaced by dark cinematic.
- Frame360 viewer UI (drag hint, angle indicator) must switch back to light-on-dark colors for the dark section 2.

## Out of scope
- New photography / landscape turntable video (still a future nice-to-have for true edge-to-edge width).
- Sections 3+ of the product page (performance numbers, specs, etc.) stay as-is.
