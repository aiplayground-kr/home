import { seasonTwoEvents } from "../../content";
import { PageIntro, SiteFooter, SiteHeader } from "../../site-shell";

export default function SeasonTwoPage() { return <main><SiteHeader />
  <PageIntro eyebrow="SEASON 2 · NOW PLAYING" title="배우는 데서 멈추지 않고, 함께 만듭니다" description="시즌 2의 공식 행사는 BUILD로 시작해 Snowflake와 함께하는 데이터·AI 경험으로 이어집니다." />
  <section className="event-list section-pad compact">{seasonTwoEvents.map((e, i) => <article className={`${e.accent} ${e.slug === "snowflake" ? "snowflake-feature" : ""}`} id={e.slug} key={e.slug}>
    <div className="event-card-top"><span>OFFICIAL EVENT · 0{i+1}</span><b>{e.state}</b></div>
    <div className="event-copy"><p>{e.eyebrow}</p><h2>{e.title}</h2><p>{e.description}</p></div>
    {e.slug === "build" && <a className="build-card-poster" href="/seasons/season-2/build" aria-label="BUILD localhost Seoul 공식 포스터와 행사 상세 보기"><img src="/events/season-2/build/archive/32.png" alt="Microsoft BUILD localhost Seoul AI놀이터 여름 밋업 공식 포스터: 2026년 6월 14일, 한국마이크로소프트 13층" /><span>OFFICIAL POSTER <b>크게 보기 →</b></span></a>}
    {e.slug === "snowflake" && <div className="snowflake-card-media">
      <a className="build-card-poster snowflake-card-poster" href="/seasons/season-2/snowflake" aria-label="Snowflake World Tour 서울 공식 포스터와 행사 상세 보기"><img src="/events/season-2/snowflake/snowflake-world-tour-poster.png" alt="Microsoft AI놀이터가 함께하는 Snowflake World Tour 서울 2026년 8월 27일 공식 포스터" /><span>OFFICIAL POSTER <b>크게 보기 →</b></span></a>
      <div className="calendar-actions">
        <span>{e.dateLabel}</span>
        <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=AI%EB%86%80%EC%9D%B4%ED%84%B0%20Season%202%20%C3%97%20Snowflake&dates=20260827%2F20260828&details=AI%EB%86%80%EC%9D%B4%ED%84%B0%20%EC%8B%9C%EC%A6%8C%202%20Snowflake%20%EA%B3%B5%EC%8B%9D%20%ED%96%89%EC%82%AC" target="_blank" rel="noreferrer">Google 캘린더 ↗</a>
      </div>
    </div>}
    <div className="event-facts"><span>시즌 2 공식 행사</span><span>{e.state === "UPCOMING" ? "8월 27일 · 다음 플레이" : "행사 기록 아카이브"}</span></div>
    <a className="season-two-detail-link" href={`/seasons/season-2/${e.slug}`}>행사 상세와 갤러리 보기 →</a>
  </article>)}</section>
  <aside className="separate-banner"><div><span>ANOTHER PLAYGROUND</span><h2>조금 더 작고 깊은 실습은 작은 놀이터에서</h2></div><a className="button primary" href="/small-playground">작은 놀이터 보기</a></aside><SiteFooter />
</main> }
