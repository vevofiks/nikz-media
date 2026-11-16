import { promises as fs } from "fs";
import path from "path";
import type { Inquiry, SiteContent } from "@/lib/site-types";
import fallback from "@/data/site.json";

const sitePath = path.join(process.cwd(), "data", "site.json");
const inquiriesPath = path.join(process.cwd(), "data", "inquiries.json");

export function getFallbackSite(): SiteContent {
  return fallback as SiteContent;
}

export async function readSiteContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(sitePath, "utf8");
    return JSON.parse(raw) as SiteContent;
  } catch {
    return getFallbackSite();
  }
}

export async function writeSiteContent(content: SiteContent) {
  await fs.writeFile(sitePath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
}

export async function readInquiries(): Promise<Inquiry[]> {
  try {
    const raw = await fs.readFile(inquiriesPath, "utf8");
    const parsed = JSON.parse(raw) as Inquiry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeInquiries(items: Inquiry[]) {
  await fs.writeFile(
    inquiriesPath,
    `${JSON.stringify(items, null, 2)}\n`,
    "utf8",
  );
}

export async function addInquiry(
  input: Omit<Inquiry, "id" | "createdAt">,
): Promise<Inquiry> {
  const items = await readInquiries();
  const inquiry: Inquiry = {
    id: `inq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    ...input,
  };
  items.unshift(inquiry);
  await writeInquiries(items.slice(0, 500));
  return inquiry;
}
