import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "portfolio_admin_session";

function digest(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function adminSessionValue() {
  const password = process.env.ADMIN_PASSWORD ?? "";
  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  return digest(`${password}:${secret}`);
}

export function passwordMatches(value: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !value) return false;
  const actualBuffer = Buffer.from(digest(value));
  const expectedBuffer = Buffer.from(digest(expected));
  return timingSafeEqual(actualBuffer, expectedBuffer);
}

export async function isAdminAuthenticated() {
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!value) return false;
  const actualBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(adminSessionValue());
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}
