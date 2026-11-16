import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "nikz_cms";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function secret() {
  return process.env.CMS_SECRET || "nikz-dev-secret-change-me";
}

function password() {
  return process.env.CMS_PASSWORD || "nikzadmin";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function checkPassword(value: string) {
  const expected = password();
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createSessionToken() {
  const exp = Date.now() + WEEK_MS;
  const payload = `ok.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function isValidSessionToken(token?: string | null) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [flag, expRaw, sig] = parts;
  if (flag !== "ok") return false;
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  const payload = `${flag}.${expRaw}`;
  const expected = sign(payload);
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function isCmsAuthed() {
  const jar = await cookies();
  return isValidSessionToken(jar.get(COOKIE)?.value);
}

export async function setCmsSession() {
  const jar = await cookies();
  jar.set(COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: WEEK_MS / 1000,
  });
}

export async function clearCmsSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
