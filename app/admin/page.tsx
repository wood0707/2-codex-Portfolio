"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import "./admin.css";

type Inquiry = {
  id: string | number;
  name: string;
  phone: string;
  organization?: string;
  program: string;
  message: string;
  status?: "new" | "in_progress" | "answered";
  admin_reply?: string;
  created_at?: string;
};

const statusLabel = { new: "신규", in_progress: "확인 중", answered: "답변 완료" };

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const response = await fetch("/api/admin/inquiries", { cache: "no-store" });
    if (response.status === 401) { setAuthenticated(false); return; }
    const result = await response.json();
    if (!response.ok) { setError(result.error); setAuthenticated(true); return; }
    setInquiries(result.inquiries);
    setSelectedId((current) => current ?? result.inquiries[0]?.id ?? null);
    setAuthenticated(true);
  };

  useEffect(() => { void load(); }, []);

  const filtered = useMemo(() => inquiries.filter((item) => {
    const itemStatus = item.status ?? "new";
    const matchesStatus = statusFilter === "all" || itemStatus === statusFilter;
    const haystack = `${item.name} ${item.phone} ${item.organization ?? ""} ${item.program} ${item.message}`.toLowerCase();
    return matchesStatus && haystack.includes(search.toLowerCase());
  }), [inquiries, search, statusFilter]);
  const selected = inquiries.find((item) => item.id === selectedId) ?? null;
  const counts = inquiries.reduce((result, item) => ({ ...result, [item.status ?? "new"]: result[item.status ?? "new"] + 1 }), { new: 0, in_progress: 0, answered: 0 });

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    const password = String(new FormData(event.currentTarget).get("password") ?? "");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    const result = await response.json();
    if (!response.ok) { setError(result.error); return; }
    await load();
  }

  async function save() {
    if (!selected) return;
    setSaving(true); setError("");
    const response = await fetch("/api/admin/inquiries", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(selected) });
    const result = await response.json();
    setSaving(false);
    if (!response.ok) { setError(result.error); return; }
    setInquiries((items) => items.map((item) => item.id === selected.id ? result.inquiry : item));
  }

  if (authenticated === null) return <main className="adminLoading">관리자 페이지를 불러오는 중입니다.</main>;
  if (!authenticated) return <main className="adminLogin"><form onSubmit={login}><p>OH YOUNG JOO · ADMIN</p><h1>강의 문의 관리</h1><label>관리자 비밀번호<input name="password" type="password" autoFocus required /></label>{error && <span className="adminError">{error}</span>}<button>로그인</button><a href="/">포트폴리오로 돌아가기</a></form></main>;

  return <main className="adminShell">
    <header className="adminHeader"><div><p>OH YOUNG JOO · ADMIN</p><h1>강의 문의 관리</h1></div><div className="adminHeaderActions"><button onClick={() => void load()}>새로고침</button><button onClick={async () => { await fetch("/api/admin/logout", { method: "POST" }); setAuthenticated(false); }}>로그아웃</button></div></header>
    <section className="adminStats"><article><span>전체 문의</span><strong>{inquiries.length}</strong></article><article><span>신규</span><strong>{counts.new}</strong></article><article><span>확인 중</span><strong>{counts.in_progress}</strong></article><article><span>답변 완료</span><strong>{counts.answered}</strong></article></section>
    {error && <div className="adminNotice">{error}</div>}
    <section className="adminWorkspace">
      <aside className="inquiryPanel"><div className="adminFilters"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="이름, 기관, 연락처 검색"/><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">전체 상태</option><option value="new">신규</option><option value="in_progress">확인 중</option><option value="answered">답변 완료</option></select></div><div className="inquiryList">{filtered.map((item) => <button className={item.id === selectedId ? "active" : ""} key={item.id} onClick={() => setSelectedId(item.id)}><span className={`statusDot ${item.status ?? "new"}`}/><div><strong>{item.name} <small>{item.organization || "개인"}</small></strong><p>{item.message}</p><time>{item.created_at ? new Date(item.created_at).toLocaleString("ko-KR") : ""}</time></div></button>)}{filtered.length === 0 && <p className="emptyState">조건에 맞는 문의가 없습니다.</p>}</div></aside>
      <article className="inquiryDetail">{selected ? <><div className="detailTop"><div><span>문의자</span><h2>{selected.name}</h2><p>{selected.organization || "소속 미입력"}</p></div><select value={selected.status ?? "new"} onChange={(event) => setInquiries((items) => items.map((item) => item.id === selected.id ? { ...item, status: event.target.value as Inquiry["status"] } : item))}><option value="new">{statusLabel.new}</option><option value="in_progress">{statusLabel.in_progress}</option><option value="answered">{statusLabel.answered}</option></select></div><dl><div><dt>연락처</dt><dd><a href={`tel:${selected.phone}`}>{selected.phone}</a></dd></div><div><dt>희망 프로그램</dt><dd>{selected.program}</dd></div><div><dt>접수 일시</dt><dd>{selected.created_at ? new Date(selected.created_at).toLocaleString("ko-KR") : "-"}</dd></div></dl><section className="messageBox"><span>문의 내용</span><p>{selected.message}</p></section><label className="replyBox">답변 및 상담 메모<textarea value={selected.admin_reply ?? ""} onChange={(event) => setInquiries((items) => items.map((item) => item.id === selected.id ? { ...item, admin_reply: event.target.value } : item))} placeholder="답변 내용이나 전화 상담 결과를 기록하세요." rows={8}/></label><button className="saveButton" onClick={() => void save()} disabled={saving}>{saving ? "저장 중…" : "변경사항 저장"}</button></> : <div className="emptyDetail">왼쪽에서 문의를 선택하세요.</div>}</article>
    </section>
  </main>;
}
