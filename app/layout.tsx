import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-noriter-season2.youni.chatgpt.site"),
  title: "AI놀이터 | 놀다 보면 알게 되는 AI",
  description: "직접 만지고, 질문하고, 함께 만들며 AI와 친해지는 커뮤니티. AI놀이터 시즌2가 진행 중입니다.",
  openGraph: {
    title: "AI놀이터 | 놀다 보면 알게 되는 AI",
    description: "AI놀이터 시즌2가 진행 중입니다.",
    images: [{ url: "/og.png", width: 1734, height: 908, alt: "AI놀이터 시즌2" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI놀이터 | 놀다 보면 알게 되는 AI",
    description: "AI놀이터 시즌2가 진행 중입니다.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
