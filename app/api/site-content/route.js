import { NextResponse } from "next/server";
import { readSiteContent, writeSiteContent } from "../../lib/siteContent";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const content = await readSiteContent();
    return NextResponse.json(content, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load site content", details: String(err) },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }
    const saved = await writeSiteContent(body);
    return NextResponse.json(saved);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to save site content", details: String(err) },
      { status: 500 }
    );
  }
}
