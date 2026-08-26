import type { CSSProperties } from "react";
import { communityUrl, seasonOneEvents, seasonTwoEvents } from "./content";
import { HomeEventStage, HomeEventStrip } from "./home-event-console";
import { smallPlaygroundPrograms } from "./small-playground/data";
import { SiteFooter, SiteHeader } from "./site-shell";

export default function Home() {
  const homePrograms = [...smallPlaygroundPrograms].sort((a, b) => {
    const order: Record<string, number> = { NEXT: 0, UPCOMING: 1, ARCHIVE: 2 };
    return (order[a.status] ?? 3) - (order[b.status] ?? 3) || b.date.localeCompare(a.date);
  });
  return <main>
    <SiteHeader />
    <section className="hero hero-v2">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="live-label"><span /> AI PLAYGROUND · MICROSOFT KOREA COMMUNITY</p>
          <h1>AI를 배우는 곳보다,<br /><em>AI와 놀아보는 곳.</em></h1>
          <p>처음이어도 괜찮아요. 직접 만지고, 질문하고, 함께 만들다 보면<br />어느새 나만의 가능성이 하나의 결과가 됩니다.</p>
          <div className="hero-keywords" aria-label="AI놀이터 활동 방식"><span>PLAY</span><i /> <span>LEARN</span><i /> <span>BUILD</span><i /> <span>SHARE</span></div>
          <div className="actions"><a className="button primary" href="/seasons/season-2">시즌 2 플레이</a><a className="button ghost" href="/small-playground">작은 놀이터 입장</a></div>
        </div>

        <HomeEventStage />
      </div>
      <HomeEventStrip />
    </section>

    <section className="manifesto manifesto-v2 section-pad">
      <div className="manifesto-intro">
        <p className="eyebrow">WHY WE PLAY</p>
        <span className="manifesto-index">01 · PLAYGROUND PHILOSOPHY</span>
      </div>
      <div className="manifesto-content">
        <div className="manifesto-message">
          <h2>설명보다 한 번의 경험이<br /><em>AI를 더 가깝게</em> 만듭니다.</h2>
          <p>누군가는 처음이라서, 누군가는 더 깊이 알고 싶어서 이곳에 옵니다. 서로의 질문이 다음 사람의 힌트가 되고, 작은 시도가 모두의 배움이 됩니다.</p>
        </div>
        <div className="manifesto-steps" aria-label="AI놀이터의 경험 흐름">
          <article><span>01</span><strong>QUESTION</strong><h3>편하게 질문하고</h3><p>모르는 것에서 시작해도 괜찮아요.</p></article>
          <article><span>02</span><strong>PLAY</strong><h3>직접 해보고</h3><p>작은 시도를 실제 경험으로 바꿉니다.</p></article>
          <article><span>03</span><strong>SHARE</strong><h3>함께 나눠요</h3><p>나의 발견이 다음 사람의 힌트가 됩니다.</p></article>
        </div>
      </div>
    </section>

    <section className="season-preview section-pad">
      <div className="section-head"><div><p className="eyebrow">SEASONS</p><h2>두 시즌, 이어지는 질문</h2></div><a href="/seasons">시즌 전체 보기</a></div>
      <div className="season-columns">
        <article className="season-panel current"><p>SEASON 2 · NOW</p><h3>함께 배우는 것을 넘어<br />함께 만들어갑니다.</h3><div className="mini-events">{seasonTwoEvents.map(e => <a href={`/seasons/season-2#${e.slug}`} key={e.slug}><span>{e.state}</span><strong>{e.eyebrow.replace("OFFICIAL EVENT · ", "")}</strong><small>{e.title}</small></a>)}</div><a className="inline-link" href="/seasons/season-2">시즌 2 자세히 보기</a></article>
        <article className="season-panel archive"><p>SEASON 1 · ARCHIVE</p><h3>네 번의 만남,<br />하나의 플레이리스트</h3><div className="poster-stack">{seasonOneEvents.map((e, i) => <img style={{"--i": i} as CSSProperties} key={e.slug} src={e.image} alt="" />)}</div><a className="inline-link" href="/seasons/season-1">시즌 1 기록 보기</a></article>
      </div>
    </section>

    <section className="small-preview small-preview-v2 section-pad">
      <div className="small-showcase-head"><div><p className="eyebrow">SMALL PLAYGROUND · OFFICIAL SERIES</p><h2>작지만 진짜로 만들어보는<br />다음 플레이들.</h2></div><div><p>큰 시즌 행사와 별개로 이어지는 실습 시리즈입니다.<br />포스터를 눌러 각 프로그램의 내용과 갤러리를 확인하세요.</p><a className="button light" href="/small-playground">전체 프로그램 보기</a></div></div>
      <div className="small-program-showcase">{homePrograms.map((p, index) => <a className={`small-program-card status-${p.status.toLowerCase()} ${index === 0 ? "featured" : ""}`} href={`/small-playground/${p.slug}`} key={p.slug}>
        <div className="small-program-poster">
          {p.image ? <img src={p.image} alt={`${p.number} ${p.title} 공식 포스터`} /> : <div className={`small-poster-placeholder placeholder-${p.slug}`}><span>AI PLAYGROUND</span><strong>{p.number}</strong><div aria-hidden="true"><i /><i /><i /><i /></div><b>{p.shortTitle}</b></div>}
          <span className="small-status-badge">{p.status === "NEXT" ? "NEXT PLAY" : p.status}</span>
        </div>
        <div className="small-program-card-copy"><div><span>{p.number}</span><time>{p.date}</time></div><h3>{p.shortTitle}</h3><p>{p.description}</p><b>내용과 갤러리 보기 →</b></div>
      </a>)}</div>
    </section>

    <section className="join join-v2 section-pad">
      <div className="join-orbit" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="join-copy">
        <p className="eyebrow">JOIN THE PLAYGROUND</p>
        <h2>호기심과 열정만 있다면,<br /><em>누구나 함께할 수 있어요.</em></h2>
        <p>AI가 처음인 분부터 현업에서 새로운 가능성을 실험하는 분까지, 배우고 만들고 나누는 일에 열정이 있다면 모두 환영합니다.</p>
        <div className="join-tags" aria-label="AI놀이터 참여 안내"><span>처음이어도 환영</span><span>전공·직무 무관</span><span>함께 실험하고 성장</span></div>
        <a className="button join-button" href={communityUrl} target="_blank" rel="noreferrer">AI놀이터 커뮤니티 참여 <span aria-hidden="true">↗</span></a>
      </div>
      <aside className="join-play-card" aria-label="AI놀이터에서 함께하는 방법">
        <div><span>01 · ASK</span><strong>궁금한 것을<br />편하게 질문해요.</strong></div>
        <div><span>02 · PLAY</span><strong>직접 만들며<br />가능성을 발견해요.</strong></div>
        <div><span>03 · SHARE</span><strong>경험을 나누며<br />함께 성장해요.</strong></div>
      </aside>
    </section>
    <SiteFooter />
  </main>;
}
