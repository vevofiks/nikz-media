import { NextResponse } from "next/server";
import { isCmsAuthed } from "@/lib/cms-auth";
import { readInquiries, writeInquiries } from "@/lib/site-store";

export async function GET() {
  if (!(await isCmsAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await readInquiries();
  return NextResponse.json(items);
}

export async function DELETE(request: Request) {
  if (!(await isCmsAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const items = await readInquiries();
  await writeInquiries(items.filter((item) => item.id !== id));
  return NextResponse.json({ ok: true });
}
