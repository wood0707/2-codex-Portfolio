import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminSessionValue, passwordMatches } from "@/app/admin/auth";

export async function POST(request: Request) {
  const { password = "" } = await request.json().catch(() => ({}));
  if (!passwordMatches(String(password))) {
    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }
  if (!process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: "관리자 보안 설정이 완료되지 않았습니다." }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, adminSessionValue(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
