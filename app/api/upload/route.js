import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);
const MAX_BYTES = 8 * 1024 * 1024; // 8MB

function extFromMime(mime) {
  switch (mime) {
    case "image/jpeg": return ".jpg";
    case "image/png":  return ".png";
    case "image/webp": return ".webp";
    case "image/gif":  return ".gif";
    case "image/svg+xml": return ".svg";
    default: return "";
  }
}

export async function POST(request) {
  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json(
        { error: `Unsupported type: ${file.type}` },
        { status: 415 }
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "File too large (max 8MB)" },
        { status: 413 }
      );
    }

    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const buf = Buffer.from(await file.arrayBuffer());
    const ext = extFromMime(file.type);
    const name = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
    const absPath = path.join(UPLOAD_DIR, name);
    await fs.writeFile(absPath, buf);

    return NextResponse.json({ url: `/uploads/${name}` });
  } catch (err) {
    return NextResponse.json(
      { error: "Upload failed", details: String(err) },
      { status: 500 }
    );
  }
}
