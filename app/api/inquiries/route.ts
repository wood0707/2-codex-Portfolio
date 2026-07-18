import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "문의 접수 설정이 완료되지 않았습니다." }, { status: 503 });
  }

  const body = await request.json();
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const organization = String(body.organization ?? "").trim();
  const program = String(body.program ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !phone || !program || !message) {
    return NextResponse.json({ error: "필수 항목을 모두 입력해 주세요." }, { status: 400 });
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/inquiries`, {
    method: "POST",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ name, phone, organization, program, message }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "문의 접수에 실패했습니다. 잠시 후 다시 시도해 주세요." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
