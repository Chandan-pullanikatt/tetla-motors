import { NextResponse } from "next/server";
import { getVideos } from "@/lib/db/queries";

// Public: returns a { key: url } map of all configured site videos.
export async function GET() {
  const videos = await getVideos();
  return NextResponse.json(videos);
}
