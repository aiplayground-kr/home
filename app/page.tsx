import type { CSSProperties } from "react";
import { communityUrl, seasonOneEvents, seasonTwoEvents } from "./content";
import { smallPlaygroundPrograms } from "./small-playground/data";
import { SiteFooter, SiteHeader } from "./site-shell";

export default function Home() {
  return <main>
    <SiteHeader />
    <section className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-copy">
        <p className="live-label"><span /> SEASON 2 · PLAYING NOW</p>
        <h1>AI를 잘 몰라도,<br /><em>놀다 보면 알게 되는 곳.</em></h1>
        <p>직접 만지고, 질문하고, 함께 만들며<br />나만의 가능성을 발견하는 AI 커뮤니티입니다.</p>
        <div className="actions"><a className="button primary" href="/seasons/season-2">시즌 2 만나기</a><a className="button ghost" href="/small-playground">작은 놀이터 보기</a></div>
      </div>
      <div className="hero-note"><strong>PLAY · LEARN · SHARE</strong><span>호기심에서 시작해 결과로 이어지는 경험</span></div>
    </section>

    <section className="manifesto section-pad"><p className="eyebrow">WHY WE PLAY</p><div><h2>설명보다 한 번의 경험이<br /><em>AI를 더 가깝게</em> 만듭니다.</h2><p>누군가는 처음이라서, 누군가는 더 깊이 알고 싶어서 이곳에 옵니다. 서로의 질문이 다음 사람의 힌트가 되고, 작은 시도가 모두의 배움이 됩니다.</p></div></section>

    <section className="season-preview section-pad">
      <div className="section-head"><div><p className="eyebrow">SEASONS</p><h2>두 시즌, 이어지는 질문</h2></div><a href="/seasons">시즌 전체 보기</a></div>
      <div className="season-columns">
        <article className="season-panel current"><p>SEASON 2 · NOW</p><h3>함께 배우는 것을 넘어<br />함께 만들어갑니다.</h3><div className="mini-events">{seasonTwoEvents.map(e => <a href={`/seasons/season-2#${e.slug}`} key={e.slug}><span>{e.state}</span><strong>{e.eyebrow.replace("OFFICIAL EVENT · ", "")}</strong><small>{e.title}</small></a>)}</div><a className="inline-link" href="/seasons/season-2">시즌 2 자세히 보기</a></article>
        <article className="season-panel archive"><p>SEASON 1 · ARCHIVE</p><h3>네 번의 만남,<br />하나의 플레이리스트</h3><div className="poster-stack">{seasonOneEvents.slice(0,3).map((e, i) => <img style={{"--i": i} as CSSProperties} key={e.slug} src={e.image} alt="" />)}</div><a className="inline-link" href="/seasons/season-1">시즌 1 기록 보기</a></article>
      </div>
    </section>

    <section className="small-preview section-pad"><div className="small-copy"><p className="eyebrow">SMALL PLAYGROUND · OFFICIAL SERIES</p><h2>작게 모여,<br />더 깊게 놀아요.</h2><p>큰 시즌 행사와 별개로 이어지는 공식 실습 시리즈입니다. 관심 있는 한 가지 주제를 2–4개의 작은 자리에서 더 가까이 경험합니다.</p><a className="button light" href="/small-playground">전체 프로그램 보기</a></div><div className="program-rail">{smallPlaygroundPrograms.slice(0,4).map(p => <a href={`/small-playground/${p.slug}`} key={p.slug}><span>{p.number}</span><small>{p.date}</small><h3>{p.shortTitle}</h3><p>{p.description}</p><b>자세히 보기</b></a>)}</div></section>

    <section className="join section-pad"><p className="eyebrow">NEXT PLAY</p><h2>다음 호기심을<br />함께 시작해요.</h2><a className="button primary" href={communityUrl} target="_blank" rel="noreferrer">LinkedIn 커뮤니티 참여</a></section>
    <SiteFooter />
  </main>;
}
