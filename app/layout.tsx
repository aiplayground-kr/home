import type { Metadata } from "next";
import "./globals.css";
import "./posters.css";
import "./typography.css";
import "./season-one.css";
import "./season-two.css";
import "./season-event-shared.css";
import "./footer.css";
import "./gallery.css";
import "./home-refresh.css";
import "./subpage-intro.css";
import "./season-hub-motion.css";
import "./snowflake-speaker-portraits.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aiplayground-kr.github.io/home/"),
  title: { default: "AI놀이터 공식 사이트 | 놀다 보면 알게 되는 AI", template: "%s | AI놀이터 공식 사이트" },
  description: "Microsoft Korea 커뮤니티 AI놀이터의 공식 사이트입니다. 시즌 행사와 작은 놀이터에서 직접 만지고, 질문하고, 함께 만드는 AI 경험을 기록합니다.",
  applicationName: "AI놀이터",
  authors: [{ name: "AI놀이터 커뮤니티" }],
  creator: "AI놀이터 커뮤니티",
  publisher: "AI놀이터 커뮤니티",
  keywords: ["AI놀이터", "AI Playground", "Microsoft Korea", "AI 커뮤니티", "Microsoft Copilot", "Snowflake", "작은 놀이터"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI놀이터 | 놀다 보면 알게 되는 AI",
    description: "시즌 1의 기록, 시즌 2의 BUILD·Snowflake, 별도로 이어지는 작은 놀이터를 만나보세요.",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "AI놀이터 — 놀다 보면 알게 되는 AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI놀이터 | 놀다 보면 알게 되는 AI",
    description: "시즌별 공식 행사와 작은 놀이터가 이어지는 AI 커뮤니티.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-v3.svg", type: "image/svg+xml" },
      { url: "/favicon-v3-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-v3-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-v3-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon-v3.png", sizes: "180x180", type: "image/png" }],
  },
};

const siteUrl = "https://aiplayground-kr.github.io/home";
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AI놀이터",
  alternateName: "AI Playground",
  url: `${siteUrl}/`,
  logo: `${siteUrl}/ai-playground-logo.png`,
  description: "Microsoft Korea 커뮤니티 AI놀이터의 공식 사이트",
  sameAs: ["https://www.linkedin.com/groups/14571141/"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AI놀이터 공식 사이트",
  alternateName: "AI Playground",
  url: `${siteUrl}/`,
  inLanguage: "ko-KR",
  publisher: { "@type": "Organization", name: "AI놀이터" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link rel="describedby" href={`${siteUrl}/llms.txt`} type="text/plain" />
        <link rel="sitemap" href={`${siteUrl}/sitemap.xml`} type="application/xml" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
