import type { CSSProperties } from "react";
import { communityUrl, seasonOneEvents, seasonTwoEvents } from "./content";
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

        <div className="hero-stage" aria-label="현재 진행 중인 AI놀이터 프로그램">
          <div className="hero-orbit orbit-one" aria-hidden="true" /><div className="hero-orbit orbit-two" aria-hidden="true" />
          <article className="hero-play-console">
            <div className="hero-console-top"><span>AI PLAYGROUND</span><b><i /> PLAY MODE</b></div>
            <div className="hero-console-body">
              <div className="hero-console-left" aria-hidden="true"><span /><span /></div>
              <div className="hero-console-screen">
                <div className="hero-screen-meta"><strong>NEXT PLAY</strong><time dateTime="2026-09-01">2026.09.01</time></div>
                <a href="/small-playground/3" className="hero-screen-event">
                  <img src="/small-playground/03-github-copilot-dev-days.png" alt="작은 놀이터 #03 GitHub Copilot Dev Days 포스터" />
                  <div><span>SMALL #03</span><strong>GitHub Copilot<br />Dev Days</strong><small>게임 시작하기 →</small></div>
                </a>
              </div>
              <div className="hero-console-buttons" aria-hidden="true"><i /><i /><i /><i /></div>
            </div>
            <div className="hero-console-slot"><span>INSERT CURIOSITY</span><i /></div>
          </article>
          <a className="hero-floating-date" href="/seasons/season-2/snowflake"><span>SEASON 2 · SNOWFLAKE</span><strong>08.27</strong><small>THU · NEXT PLAY →</small></a>
        </div>
      </div>
      <div className="hero-now-strip" aria-label="다가오는 AI놀이터 일정">
        <span className="now-strip-label"><i /> NOW PLAYING</span>
        <a href="/small-playground/3"><time dateTime="2026-09-01">09.01 TUE</time><strong>작은 놀이터 #03</strong><span>GitHub Copilot Dev Days</span></a>
        <a href="/seasons/season-2/snowflake"><time dateTime="2026-08-27">2026.08.27 THU</time><strong>Season 2</strong><span>Snowflake × AI Playground</span></a>
        <a href="/small-playground/4"><time dateTime="2026-09-12">09.12 SAT</time><strong>작은 놀이터 #04</strong><span>만들면서 배우는 GitHub</span></a>
      </div>
    </section>

    <section className="manifesto section-pad"><p className="eyebrow">WHY WE PLAY</p><div><h2>설명보다 한 번의 경험이<br /><em>AI를 더 가깝게</em> 만듭니다.</h2><p>누군가는 처음이라서, 누군가는 더 깊이 알고 싶어서 이곳에 옵니다. 서로의 질문이 다음 사람의 힌트가 되고, 작은 시도가 모두의 배움이 됩니다.</p></div></section>

    <section className="season-preview section-pad">
      <div className="section-head"><div><p className="eyebrow">SEASONS</p><h2>두 시즌, 이어지는 질문</h2></div><a href="/seasons">시즌 전체 보기</a></div>
      <div className="season-columns">
        <article className="season-panel current"><p>SEASON 2 · NOW</p><h3>함께 배우는 것을 넘어<br />함께 만들어갑니다.</h3><div className="mini-events">{seasonTwoEvents.map(e => <a href={`/seasons/season-2#${e.slug}`} key={e.slug}><span>{e.state}</span><strong>{e.eyebrow.replace("OFFICIAL EVENT · ", "")}</strong><small>{e.title}</small></a>)}</div><a className="inline-link" href="/seasons/season-2">시즌 2 자세히 보기</a></article>
        <article className="season-panel archive"><p>SEASON 1 · ARCHIVE</p><h3>네 번의 만남,<br />하나의 플레이리스트</h3><div className="poster-stack">{seasonOneEvents.slice(0,3).map((e, i) => <img style={{"--i": i} as CSSProperties} key={e.slug} src={e.image} alt="" />)}</div><a className="inline-link" href="/seasons/season-1">시즌 1 기록 보기</a></article>
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

    <section className="join section-pad"><p className="eyebrow">NEXT PLAY</p><h2>다음 호기심을<br />함께 시작해요.</h2><a className="button primary" href={communityUrl} target="_blank" rel="noreferrer">LinkedIn 커뮤니티 참여</a></section>
    <SiteFooter />
  </main>;
}
