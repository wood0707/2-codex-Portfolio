import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/app/admin/auth";

function supabaseConfig() {
  return {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
}

function headers(key: string) {
  return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  const { url, key } = supabaseConfig();
  if (!url || !key) return NextResponse.json({ error: "Supabase 관리자 설정이 필요합니다." }, { status: 503 });

  const response = await fetch(`${url}/rest/v1/inquiries?select=*&order=created_at.desc`, {
    headers: headers(key),
    cache: "no-store",
  });
  if (!response.ok) return NextResponse.json({ error: "문의 목록을 불러오지 못했습니다." }, { status: 502 });
  return NextResponse.json({ inquiries: await response.json() });
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  const { url, key } = supabaseConfig();
  if (!url || !key) return NextResponse.json({ error: "Supabase 관리자 설정이 필요합니다." }, { status: 503 });

  const body = await request.json();
  const id = String(body.id ?? "");
  const status = ["new", "in_progress", "answered"].includes(body.status) ? body.status : "new";
  const admin_reply = String(body.admin_reply ?? "").trim();
  if (!id) return NextResponse.json({ error: "문의 ID가 없습니다." }, { status: 400 });

  const response = await fetch(`${url}/rest/v1/inquiries?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { ...headers(key), Prefer: "return=representation" },
    body: JSON.stringify({ status, admin_reply, answered_at: status === "answered" ? new Date().toISOString() : null }),
  });
  if (!response.ok) {
    const detail = await response.text();
    return NextResponse.json({ error: detail.includes("admin_reply") ? "Supabase에 관리자용 컬럼을 먼저 추가해 주세요." : "문의 저장에 실패했습니다." }, { status: 502 });
  }
  const updated = await response.json();
  return NextResponse.json({ inquiry: updated[0] });
}
