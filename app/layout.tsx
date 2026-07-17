import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오영주 | 생성형 AI 교육 전문가",
  description: "생성형 AI 콘텐츠 제작, 퍼스널 브랜딩, AI 영상, 업무 자동화 교육을 설계하는 오영주의 포트폴리오입니다.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
