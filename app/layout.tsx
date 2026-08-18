import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-noriter-season2.youni.chatgpt.site"),
  title: "AI놀이터 | 놀다 보면 알게 되는 AI",
  description: "직접 만지고, 질문하고, 함께 만들며 AI와 친해지는 커뮤니티. AI놀이터 시즌2가 진행 중입니다.",
  openGraph: {
    title: "AI놀이터 | 놀다 보면 알게 되는 AI",
    description: "사람이 방향을 만들고, AI가 실행을 가속합니다. 모임장 김성미와 함께하는 AI 커뮤니티.",
    images: [{ url: "/og-host.png", width: 1734, height: 907, alt: "AI놀이터 커뮤니티 리더 김성미 소개" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI놀이터 | 놀다 보면 알게 되는 AI",
    description: "사람이 방향을 만들고, AI가 실행을 가속합니다.",
    images: ["/og-host.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
