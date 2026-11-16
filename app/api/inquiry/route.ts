import { NextResponse } from "next/server";
import { addInquiry } from "@/lib/site-store";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    name?: string;
    email?: string;
    phone?: string;
    business?: string;
    service?: string;
    message?: string;
  } | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const business = body.business?.trim() ?? "";
  const service = body.service?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (name.length < 2 || !email.includes("@") || phone.replace(/\D/g, "").length < 8) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }
  if (!service || message.length < 10) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const inquiry = await addInquiry({
    name,
    email,
    phone,
    business,
    service,
    message,
  });

  return NextResponse.json({ ok: true, id: inquiry.id });
}
