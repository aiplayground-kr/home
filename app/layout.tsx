import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI놀이터 | 놀다 보면 알게 되는 AI",
  description: "직접 만지고, 질문하고, 함께 만들며 AI와 친해지는 커뮤니티. AI놀이터 시즌2가 진행 중입니다.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
