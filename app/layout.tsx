import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://2-codex-portfolio-42ul.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "오영주 | AI 콘텐츠 전문 강사",
    template: "%s | 오영주",
  },
  description:
    "생성형 AI 콘텐츠 제작부터 퍼스널 브랜딩, 숏폼 영상, 업무 효율화, 바이브코딩까지 폭넓은 실무 교육을 진행합니다.",
  keywords: [
    "오영주",
    "AI 콘텐츠 전문 강사",
    "생성형 AI 교육",
    "AI 리터러시",
    "AI 콘텐츠 제작",
    "AI 영상 교육",
    "숏폼 영상",
    "업무 자동화",
    "퍼스널 브랜딩",
    "바이브코딩",
  ],
  authors: [{ name: "오영주", url: siteUrl }],
  creator: "오영주",
  publisher: "오영주",
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "오영주 | AI 콘텐츠 전문 강사",
    description:
      "생성형 AI 콘텐츠 제작부터 퍼스널 브랜딩, 숏폼 영상, 업무 효율화, 바이브코딩까지 폭넓은 실무 교육을 진행합니다.",
    url: siteUrl,
    siteName: "오영주 AI 콘텐츠 포트폴리오",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "오영주 | AI 콘텐츠 전문 강사",
    description:
      "생성형 AI 콘텐츠 제작부터 퍼스널 브랜딩, 숏폼 영상, 업무 효율화, 바이브코딩까지 폭넓은 실무 교육을 진행합니다.",
  },
  category: "education",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
