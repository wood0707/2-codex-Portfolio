import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오영주 | AI 콘텐츠 전문 강사",
  description: "생성형 AI 콘텐츠 제작부터 퍼스널 브랜딩, 숏폼 영상, 업무 효율화, 네이버 마케팅까지 폭넓은 실무 교육을 진행합니다.",
  openGraph: {
    title: "오영주 | AI 콘텐츠 전문 강사",
    description: "생성형 AI 콘텐츠 제작부터 퍼스널 브랜딩, 숏폼 영상, 업무 효율화, 네이버 마케팅까지 폭넓은 실무 교육을 진행합니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
