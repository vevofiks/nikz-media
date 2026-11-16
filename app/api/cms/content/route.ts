import { NextResponse } from "next/server";
import { isCmsAuthed } from "@/lib/cms-auth";
import { readSiteContent, writeSiteContent } from "@/lib/site-store";
import type { SiteContent } from "@/lib/site-types";

export async function GET() {
  if (!(await isCmsAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const content = await readSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!(await isCmsAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as SiteContent | null;
  if (!body?.agency?.name || !body?.serviceGroups) {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }
  await writeSiteContent(body);
  return NextResponse.json({ ok: true });
}
