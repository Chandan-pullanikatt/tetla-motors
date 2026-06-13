import { db, leads } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, enquiry_type, message, newsletter } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    await db.insert(leads).values({
      name,
      email,
      phone,
      enquiryType: enquiry_type,
      message,
      newsletter: !!newsletter,
      status: "new",
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 500 });
  }
}
