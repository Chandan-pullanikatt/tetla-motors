# Grill: Voices That Inspire Us — Video Coverflow Redesign
Date: 2026-05-31

## Intent
Replace the current 4-item image-based coverflow with a 7-item (3L + center + 3R) fully video coverflow. Center video autoplays muted; rotating away pauses it. Stock videos from Pexels used as placeholder defaults until client supplies real footage. Zero perceived lag is the hard requirement.

## Constraints
- Performance is non-negotiable — no lag, no janky loads, smooth visual experience
- 7 items total: indices 0–6, center starts at index 3
- All items are videos (no image fallbacks in this section)
- Center card: autoplay muted, pause on rotate away
- No overlay text — purely visual video reel
- Stock videos used via Pexels direct URLs as VIDEO_DEFAULTS; real videos swapped in later via CMS admin panel

## Key decisions
- Decision: Keep 3D GSAP coverflow (not flat row). Reason: visual drama, matches existing pattern. Alternative considered: flat horizontal scroll row.
- Decision: Load video src only for cards within offset ≤ 2 of center. Reason: 7 videos loading simultaneously would destroy performance. Cards at offset 3 (opacity=0) get no src until they approach center.
- Decision: Pexels direct URLs as VIDEO_DEFAULTS in page.tsx. Reason: site works immediately without manual Cloudinary upload step. CMS admin panel used later to replace.
- Decision: Add testimonial_5/6/7 slots to add_videos.sql and CMS videos page. Reason: client can replace stock footage via admin panel without code changes.
- Decision: Mix of EV lifestyle riding footage + talking-head/testimonial style. Reason: user confirmed "mix of both".

## Surfaced assumptions
- The GSAP POSITIONS array (5 entries, offsets 0–4) already covers offset 0–3 needed for 7 items — no changes required.
- Cloudinary uploads happen manually via /admin/videos after the fact.

## Open questions
- Whether to show a thumbnail/poster frame while the non-center videos are loading.
