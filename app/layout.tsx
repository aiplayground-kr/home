import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-noriter-season2.youni.chatgpt.site"),
  title: "AI놀이터 | 놀다 보면 알게 되는 AI",
  description: "직접 만지고, 질문하고, 함께 만들며 AI와 친해지는 커뮤니티. AI놀이터 시즌2가 진행 중입니다.",
  openGraph: {
    title: "AI놀이터 | 놀다 보면 알게 되는 AI",
    description: "#01부터 이어지는 작은 놀이터. 각 프로그램의 일정과 내용을 자세히 확인하세요.",
    images: [{ url: "/og-small-series.png", width: 1734, height: 907, alt: "AI놀이터 작은 놀이터 1번부터 5번까지의 프로그램" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI놀이터 | 놀다 보면 알게 되는 AI",
    description: "#01부터 이어지는 작은 놀이터 프로그램을 자세히 확인하세요.",
    images: ["/og-small-series.png"],
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
