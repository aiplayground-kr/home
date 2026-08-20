import { communityUrl } from "./content";

export function SiteHeader() {
  return <header className="site-header"><a className="brand" href="/" aria-label="AI놀이터 홈"><img src="/ai-playground-logo.png" alt="AI Playground" /></a><nav aria-label="주요 메뉴"><a href="/seasons">시즌</a><a href="/small-playground">작은 놀이터</a><a href="/organization">조직도</a><a href="/host">모임장</a></nav><a className="header-cta" href={communityUrl} target="_blank" rel="noreferrer">커뮤니티 참여</a></header>;
}

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-brand-stack">
      <img src="/ai-playground-logo.png" alt="AI Playground" />
      <span className="microsoft-korea" aria-label="Microsoft Korea">
        <span className="microsoft-symbol" aria-hidden="true"><i /><i /><i /><i /></span>
        <strong>Microsoft Korea</strong>
      </span>
    </div>
    <div className="footer-links"><a href="/seasons">시즌</a><a href="/small-playground">작은 놀이터</a><a href="/organization">함께 만드는 사람들</a></div>
    <p>PLAY · LEARN · SHARE<br />© AI Playground Community</p>
  </footer>;
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></section>;
}
