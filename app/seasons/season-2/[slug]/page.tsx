import type { Metadata } from "next";
import { seasonTwoEvents } from "../../../content";
import { EventGallery } from "../../../event-gallery";
import { SiteFooter, SiteHeader } from "../../../site-shell";
import { SeasonEventCover, SpeakerCarousel } from "../../season-event-components";
import { buildGallery as eventBuildGallery, buildSessions as eventBuildSessions, buildSpeakers, snowflakeSessions as eventSnowflakeSessions } from "../../season-two-data";

type Props = { params: Promise<{ slug: string }> };

function BuildEventRecord() {
  return <>
    <SeasonEventCover id="build-cover-title" tone="build" image="/events/season-2/build/archive/32.png" imageAlt="Microsoft BUILD localhost Seoul AI놀이터 여름 밋업 공식 포스터" eyebrow="MICROSOFT BUILD 2026 · LOCALHOST:SEOUL" title={<>BUILD를 커뮤니티의 언어로,<br />직접 만들며 이해합니다</>} description="Build 2026의 핵심 발표를 함께 읽고, Copilot과 Agent를 직접 경험하며 아이디어를 실제 결과로 연결한 AI놀이터 여름 밋업입니다." facts={[{ label: "DATE", value: "2026년 6월 14일 (일)" }, { label: "PLACE", value: "한국마이크로소프트 13층 · 제주룸" }, { label: "PLAY", value: "Build 리뷰 · Copilot 실습 · 네트워킹" }]} tags={["REAL CODE", "REAL WORKFLOWS", "REAL COMMUNITY"]} />
    <section className="build-record-section build-overview" aria-labelledby="build-overview-title">
      <div className="build-record-heading"><span>BUILD / LOCALHOST:SEOUL</span><h2 id="build-overview-title">행사 개요</h2><p>Build 2026의 핵심 발표를 커뮤니티의 언어로 다시 만나고, Copilot과 Agent를 직접 경험한 AI놀이터 여름 밋업입니다.</p></div>
      <div className="build-table-wrap">
        <table className="build-facts-table"><tbody>
          <tr><th scope="row">일정</th><td>2026년 6월 14일 (일) · 오후 1:00–6:00</td></tr>
          <tr><th scope="row">장소</th><td>한국마이크로소프트 13층 · 제주룸</td></tr>
          <tr><th scope="row">형식</th><td>Build 2026 리뷰 · Copilot 실습 · Agent 사례 · 커뮤니티 네트워킹</td></tr>
          <tr><th scope="row">함께한 사람</th><td>Microsoft · Microsoft MVP · AI놀이터 Crew와 참여자</td></tr>
        </tbody></table>
      </div>
    </section>

    <SpeakerCarousel eyebrow="SPEAKERS · SWIPE TO EXPLORE" title="BUILD를 함께 읽어준 연사들" description="카드를 좌우로 넘기며 여섯 명의 연사와 발표 주제를 확인할 수 있습니다." speakers={buildSpeakers} />

    <section className="build-record-section" aria-labelledby="build-sessions-title">
      <div className="build-record-heading"><span>TRACK 1 · JEJU ROOM</span><h2 id="build-sessions-title">세션 일정</h2><p>오후 1시부터 7개의 발표와 실습이 이어진 BUILD 플레이리스트입니다.</p></div>
      <div className="build-table-wrap build-session-scroll" tabIndex={0} aria-label="BUILD 행사 세션 표, 가로로 스크롤 가능">
        <table className="build-session-table">
          <thead><tr><th scope="col">시간</th><th scope="col">세션</th><th scope="col">연사</th><th scope="col">Build</th></tr></thead>
          <tbody>{eventBuildSessions.map((session) => <tr key={`${session.time}-${session.title}`} className={session.ref === "BREAK" ? "break-row" : ""}>
            <td><time>{session.time}</time></td>
            <td><strong>{session.title}</strong><span>{session.description}</span></td>
            <td>{session.speaker && <>{session.linkedin ? <a className="build-speaker-link" href={session.linkedin} target="_blank" rel="noreferrer"><strong>{session.speaker}</strong><i aria-hidden="true">in</i></a> : <strong>{session.speaker}</strong>}<span>{session.company}</span></>}</td>
            <td><b>{session.ref}</b></td>
          </tr>)}</tbody>
        </table>
      </div>
    </section>

    <section className="build-record-section build-sponsors" aria-labelledby="build-sponsors-title">
      <div className="build-record-heading"><span>PARTNERS BEHIND THE PLAY</span><h2 id="build-sponsors-title">함께한 스폰서</h2><p>공간과 기술, 커피와 도서, 굿즈와 경품으로 BUILD의 경험을 함께 만들어주셨습니다.</p></div>
      <figure className="build-sponsor-board"><img src="/events/season-2/build/build-sponsors.png" alt="AI놀이터 BUILD 행사 스폰서 보드: Microsoft, GitHub, 빽다방, PMI Panel Hub, Eden House와 물품 후원" /><figcaption><strong>Microsoft · GitHub · 빽다방 · PMI Panel Hub · Eden House</strong><span>기술·다과·도서·굿즈 및 경품 후원 파트너</span></figcaption></figure>
    </section>
  </>;
}

function SnowflakeEventRecord() {
  return <>
    <SeasonEventCover id="snowflake-poster-title" tone="snowflake" image="/events/season-2/snowflake/snowflake-world-tour-poster.png" imageAlt="Microsoft AI놀이터가 함께하는 Snowflake World Tour 서울 8월 27일 공식 포스터" eyebrow="SNOWFLAKE × MICROSOFT · SEOUL" title={<>Snowflake World Tour에서<br />AI놀이터를 만나요</>} description="데이터와 AI가 만나는 Snowflake World Tour 서울 현장에 Microsoft AI놀이터가 함께합니다. Microsoft 퀴즈와 여섯 명의 MVP 특별 시연, 커뮤니티의 새로운 연결을 한자리에서 만나보세요." facts={[{ label: "DATE", value: "2026년 8월 27일 (목)" }, { label: "PLACE", value: "서울 · Snowflake World Tour" }, { label: "PLAY", value: "AI 퀴즈 · Lucky Draw · MVP 특별 시연" }]} tags={["AI QUIZ", "LIVE DEMO", "COMMUNITY"]} />

    <section className="snowflake-host" aria-labelledby="snowflake-host-title">
      <figure><img src="/host-sung-mi-kim-profile.png" alt="AI놀이터 모임장 김성미" /></figure>
      <div className="snowflake-host-copy"><span>PEOPLE BEHIND THE PLAYGROUND</span><h2 id="snowflake-host-title">김성미 <small>Sung Mi Kim</small></h2><strong>Microsoft Korea · AI Community Builder</strong><p>AI 시대에 커뮤니티 동료가 주는 대체할 수 없는 가치를 나누고, 누구나 편하게 배우고 연결되는 AI놀이터를 만들어갑니다.</p><a href="https://www.linkedin.com/in/sungmikim77/" target="_blank" rel="noreferrer">LinkedIn 프로필 보기 ↗</a></div>
    </section>

    <section className="snowflake-sessions" aria-labelledby="snowflake-sessions-title">
      <header><span>MICROSOFT MVP · 90 MINUTE SESSIONS</span><h2 id="snowflake-sessions-title">AI놀이터 세션 안내</h2><p>여섯 명의 Microsoft MVP와 Crew가 1시간 30분씩 실전 설명과 데모를 이어갑니다.</p></header>
      <div className="snowflake-session-table-wrap" tabIndex={0} aria-label="Snowflake 행사 세션 표, 가로로 스크롤 가능"><table className="snowflake-session-table">
        <thead><tr><th scope="col">시간</th><th scope="col">세션</th><th scope="col">연사</th><th scope="col">함께하는 Crew</th></tr></thead>
        <tbody>{eventSnowflakeSessions.map((session) => <tr key={session.no}>
          <td><span>SESSION {session.no}</span><time>{session.time}</time><small>1시간 30분</small></td>
          <td><strong>{session.topic}</strong><p>{session.description}</p></td>
          <td><div className="snowflake-table-speaker"><div className={`snowflake-speaker-avatar${session.imageCrop ? " snowflake-speaker-crop" : ""}`}>{session.image ? <img src={session.image} alt={`${session.speaker} 연사`} style={session.imageCrop} /> : <span>{session.initials}</span>}</div><div><span>{session.role}</span><a href={session.linkedin} target="_blank" rel="noreferrer"><strong>{session.speaker}</strong> ↗</a></div></div></td>
          <td><div className="snowflake-crew">{session.crew.map((member) => <i key={member}>{member}</i>)}</div></td>
        </tr>)}</tbody>
      </table></div>
    </section>

    <section className="snowflake-program" aria-labelledby="snowflake-program-title">
      <header><span>PLAY TOGETHER</span><h2 id="snowflake-program-title">행사 프로그램</h2><p>짧고 즐거운 체험부터 깊이 있는 데모와 새로운 연결까지, 현장에서 함께하는 네 가지 플레이입니다.</p></header>
      <div className="snowflake-program-grid">
        <article><b>01</b><span>AI QUIZ</span><h3>AI 퀴즈 &amp; 경품</h3><p>Microsoft와 Snowflake AI를 세 문제로 가볍게 만나봅니다.</p></article>
        <article><b>02</b><span>Lucky Draw</span><h3>행운의 뽑기</h3><p>퀴즈를 마치고 투명 뽑기 박스에서 준비된 선물을 만나보세요.</p></article>
        <article><b>03</b><span>LIVE DEMO</span><h3>MVP 특별 시연</h3><p>여섯 개 세션에서 Copilot과 Power Platform의 실제 활용을 확인합니다.</p></article>
        <article><b>04</b><span>COMMUNITY</span><h3>커뮤니티 네트워킹</h3><p>배움의 장면을 이야기로 나누고 다음 연결을 만드는 시간입니다.</p></article>
      </div>
    </section>
  </>;
}

export function generateStaticParams() { return seasonTwoEvents.map((event) => ({ slug: event.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = seasonTwoEvents.find((item) => item.slug === slug);
  return event ? { title: `${event.title} | Season 2`, description: event.description } : { title: "Season 2" };
}

export default async function SeasonTwoEventPage({ params }: Props) {
  const { slug } = await params;
  const event = seasonTwoEvents.find((item) => item.slug === slug);
  if (!event) return <main><SiteHeader /><section className="small-not-found"><p>행사를 찾을 수 없습니다.</p><a href="/seasons/season-2">시즌 2로 돌아가기</a></section></main>;
  return <main><SiteHeader /><section className="event-detail-shell">
    <a className="archive-detail-back" href="/seasons/season-2">← 시즌 2 공식 행사</a>
    {event.slug === "snowflake" ? <SnowflakeEventRecord /> : event.slug === "build" ? <BuildEventRecord /> : <div className={`event-detail-hero ${event.accent}`}><span>{event.eyebrow} · {event.state}</span><h1>{event.title}</h1><p>{event.description}</p></div>}
    <EventGallery title={`${event.title} 갤러리`} items={event.slug === "build" ? eventBuildGallery : []} mode={event.slug === "build" ? "thumbnail-lightbox" : "mosaic"} emptyMessage={event.slug === "snowflake" ? "8월 27일 Snowflake 행사 사진과 발표 자료가 정리되는 대로 이곳에 공개됩니다." : "BUILD 행사의 현장 사진과 결과물을 정리해 이곳에 차례로 추가합니다."} />
  </section><SiteFooter /></main>;
}
