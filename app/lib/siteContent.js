import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "app", "data", "site-content.json");
const DEFAULT_FILE = DATA_FILE;

export async function readSiteContent() {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

export async function writeSiteContent(content) {
  const next = { ...content, updatedAt: new Date().toISOString() };
  await fs.writeFile(DATA_FILE, JSON.stringify(next, null, 2), "utf-8");
  return next;
}

export async function getDefaultSiteContent() {
  const raw = await fs.readFile(DEFAULT_FILE, "utf-8");
  return JSON.parse(raw);
}
