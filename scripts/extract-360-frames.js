/**
 * Extracts evenly spaced frames from a turntable video into public/360/<name>/
 * for the Frame360 viewer.
 *
 * Usage: node scripts/extract-360-frames.js [video] [outName] [frameCount]
 * Default: public/3dvideo.mp4 → public/360/_default/ , 36 frames
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const ffmpeg = require("ffmpeg-static");

const video = path.resolve(process.argv[2] ?? "public/3dvideo.mp4");
const outName = process.argv[3] ?? "_default";
const frameCount = Number(process.argv[4] ?? 36);
const outDir = path.resolve("public", "360", outName);

if (!fs.existsSync(video)) {
  console.error(`Video not found: ${video}`);
  process.exit(1);
}

// Get duration by parsing ffmpeg's stderr (ffmpeg-static has no ffprobe)
let info = "";
try {
  execFileSync(ffmpeg, ["-i", video], { stdio: "pipe" });
} catch (e) {
  info = e.stderr?.toString() ?? "";
}
const m = info.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
if (!m) {
  console.error("Could not read video duration");
  process.exit(1);
}
const duration = Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]);
console.log(`Video duration: ${duration.toFixed(2)}s — extracting ${frameCount} frames`);

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

// fps = frames / duration gives evenly spaced frames across the whole video
const fps = frameCount / duration;
execFileSync(
  ffmpeg,
  [
    "-i", video,
    "-vf", `fps=${fps},scale=1280:-2`,
    "-q:v", "3",
    "-frames:v", String(frameCount),
    path.join(outDir, "frame_%02d.jpg"),
  ],
  { stdio: "inherit" }
);

const written = fs.readdirSync(outDir).length;
console.log(`Done — ${written} frames written to ${outDir}`);
