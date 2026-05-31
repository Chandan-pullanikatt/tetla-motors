# Grill: Product Card Gradient Overlay Redesign
Date: 2026-05-31

## Intent
Replace the current "image + separate solid black info bar" card layout with a single full-bleed image card where all text content (name, model, price, Explore button) is overlaid on a gradient that fades from transparent to black over the bottom 259px of the card.

## Constraints
- Card dimensions: 311px × 420px (desktop), responsive/smaller on mobile
- Border-radius: 12px
- Gradient: starts at 161px from top (covers bottom 259px), transparent → #000000
- Heading: Urbanist Bold 700, 32px, #333333, centered
- Subtitle: Urbanist Regular 400, 14px, #555555, centered, "Discover Tetla's smart, stylish EV bikes built for performance and convenience"
- Explore button must be INSIDE the card (not below), shown on ALL cards

## Key decisions
- Decision: Remove separate solid black info bar, merge into gradient overlay. Reason: matches Figma exactly, cleaner layout.
- Decision: Explore button inside card for all cards. Reason: matches Figma, makes each card self-contained and tappable on mobile.
- Decision: Gradient height = 259px (Rectangle 16 in Figma, Top: 161px, Height: 259px). Reason: user confirmed this from Figma specs.
- Decision: Heading section centered (not left-aligned). Reason: Figma shows centered layout.
