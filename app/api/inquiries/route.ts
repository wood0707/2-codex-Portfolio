import { NextResponse } from "next/server";
import { createHmac, randomBytes } from "node:crypto";

function createSolapiAuthorization(apiKey: string, apiSecret: string) {
  const date = new Date().toISOString();
  const salt = randomBytes(16).toString("hex");
  const signature = createHmac("sha256", apiSecret).update(`${date}${salt}`).digest("hex");

  return `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`;
}

async function sendInquirySms(inquiry: { name: string; phone: string; program: string }) {
  const apiKey = process.env.SOLAPI_API_KEY;
  const apiSecret = process.env.SOLAPI_API_SECRET;
  const from = process.env.SOLAPI_SENDER_NUMBER;
  const to = process.env.SOLAPI_RECIPIENT_NUMBER;

  if (!apiKey || !apiSecret || !from || !to) return;

  const response = await fetch("https://api.solapi.com/messages/v4/send-many/detail", {
    method: "POST",
    headers: {
      Authorization: createSolapiAuthorization(apiKey, apiSecret),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [{
        to,
        from,
        text: `[강의 문의] ${inquiry.name} (${inquiry.phone})\\n희망 프로그램: ${inquiry.program}`,
        autoTypeDetect: true,
      }],
    }),
  });

  if (!response.ok) {
    throw new Error(`SMS notification failed: ${response.status}`);
  }
}

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

  try {
    await sendInquirySms({ name, phone, program });
  } catch (error) {
    console.error("Inquiry saved but SMS notification failed", error);
  }

  return NextResponse.json({ ok: true });
}
