import { seasonOneEvents, seasonTwoEvents } from "../content";
import { PageIntro, SiteFooter, SiteHeader } from "../site-shell";

function SeasonBubbles() {
  return <span className="season-bubbles" aria-hidden="true">{Array.from({ length: 16 }, (_, index) => <i key={index} />)}</span>;
}

export default function SeasonsPage() { return <main><SiteHeader />
  <PageIntro eyebrow="SEASONS" title="시즌마다 다른 질문, 같은 즐거움" description="AI놀이터의 공식 시즌 행사는 시즌 1과 시즌 2로 독립해 기록됩니다." />
  <section className="hub-grid section-pad compact">
    <a className="hub-card season2" href="/seasons/season-2"><SeasonBubbles /><span>NOW PLAYING</span><b>02</b><h2>Season 2</h2><p>BUILD에서 Snowflake로. 배우고 연결하고 실제로 만드는 현재의 시즌.</p><ul>{seasonTwoEvents.map(e => <li key={e.slug}>{e.eyebrow.replace("OFFICIAL EVENT · ", "")} <small>{e.state}</small></li>)}</ul><strong>시즌 2 열기</strong></a>
    <a className="hub-card season1" href="/seasons/season-1"><SeasonBubbles /><span>ARCHIVE</span><b>01</b><h2>Season 1</h2><p>Ignite부터 슬기로운 AI 생활까지 네 번의 공식 만남을 게시판으로 기록합니다.</p><ul>{seasonOneEvents.map(e => <li key={e.slug}>{e.title}</li>)}</ul><strong>시즌 1 열기</strong></a>
  </section>
  <aside className="separate-banner"><div><span>SEPARATE OFFICIAL SERIES</span><h2>작은 놀이터는 시즌과 별도로 계속됩니다.</h2><p>짧고 깊은 주제별 실습과 대화를 번호로 쌓아가는 공식 프로그램입니다.</p></div><a className="button primary" href="/small-playground">작은 놀이터 보기</a></aside>
  <SiteFooter />
</main> }
