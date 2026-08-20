import { seasonTwoEvents } from "../../content";
import { PageIntro, SiteFooter, SiteHeader } from "../../site-shell";

export default function SeasonTwoPage() { return <main><SiteHeader />
  <PageIntro eyebrow="SEASON 2 · NOW PLAYING" title="배우는 데서 멈추지 않고, 함께 만듭니다" description="시즌 2의 공식 행사는 BUILD로 시작해 Snowflake와 함께하는 데이터·AI 경험으로 이어집니다." />
  <section className="event-list section-pad compact">{seasonTwoEvents.map((e, i) => <article className={e.accent} id={e.slug} key={e.slug}><div><span>OFFICIAL EVENT · 0{i+1}</span><b>{e.state}</b></div><p>{e.eyebrow}</p><h2>{e.title}</h2><p>{e.description}</p><div className="event-facts"><span>시즌 2 공식 행사</span><span>{e.state === "NOW" ? "현재 진행·소식 업데이트" : "행사 기록 아카이브"}</span></div></article>)}</section>
  <aside className="separate-banner"><div><span>ANOTHER PLAYGROUND</span><h2>조금 더 작고 깊은 실습은 작은 놀이터에서</h2></div><a className="button primary" href="/small-playground">작은 놀이터 보기</a></aside><SiteFooter />
</main> }
