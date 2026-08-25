import type { Metadata } from "next";
import { seasonTwoEvents } from "../../../content";
import { EventGallery } from "../../../event-gallery";
import { SiteFooter, SiteHeader } from "../../../site-shell";

type Props = { params: Promise<{ slug: string }> };

const buildSessions = [
  { time: "13:00–13:20", title: "환영합니다", ref: "WELCOME", company: "Microsoft", speaker: "송주현 리더", description: "BUILD / localhost:SEOUL의 문을 여는 환영 인사" },
  { time: "13:20–14:00", title: "1인 기업가가 되기 위한 마지막 관문, Claw and Agent Harness", ref: "BRK243", company: "Microsoft MVP", speaker: "김훈동", description: "Foundry의 Claw Agent와 다중 에이전트 시스템", linkedin: "https://www.linkedin.com/in/hoondong-kim/" },
  { time: "14:00–14:40", title: "Copilot Cowork로 업무 자동화 뚝딱 해치우기", ref: "SPECIAL", company: "Microsoft MVP", speaker: "전대호", description: "왕초보도 시작할 수 있는 Copilot Cowork 업무 자동화", linkedin: "https://www.linkedin.com/in/canrobot/" },
  { time: "14:40–15:20", title: "개발자가 주목해야 할 Build 2026 요약", ref: "BRK206", company: "Microsoft MVP", speaker: "이보라", description: "Visual Studio와 GitHub Copilot의 디버깅·프로파일링·테스트 에이전트", linkedin: "https://www.linkedin.com/in/learner-bora/" },
  { time: "15:20–16:00", title: "비개발자가 GitHub Copilot으로 팀 전용 AI 비서를 만든 이야기", ref: "LTG402", company: "GM Technical Korea", speaker: "이영빈", description: "아이디어를 AI 네이티브 런타임의 프로덕션 준비 에이전트로 연결한 경험", linkedin: "https://www.linkedin.com/in/youngbinlee/" },
  { time: "16:00–16:20", title: "Bio Break", ref: "BREAK", company: "", speaker: "", description: "휴식과 네트워킹" },
  { time: "16:20–16:50", title: "App Builder Agent로 학습 가이드 제작기", ref: "SPECIAL", company: "Office Tutor", speaker: "윤미영(유니)", description: "Copilot과 Agent로 손쉽게 만드는 학습 가이드", linkedin: "https://www.linkedin.com/in/younni/" },
  { time: "16:50–17:50", title: "GitHub Copilot 3종 기능, 직접 해보기!", ref: "WORKSHOP", company: "Microsoft", speaker: "유승호", description: "Ask·Agent·Plan 기능으로 경험하는 AI 기반 개발 워크플로우", linkedin: "https://www.linkedin.com/in/hahahaysh/" },
];

const buildGallery = [
  { src: "/events/season-2/build/build-poster-linkedin.jpg", alt: "Microsoft BUILD localhost Seoul AI놀이터 여름 밋업 포스터", caption: "2026년 6월 14일, 한국마이크로소프트에서 열린 AI놀이터 여름 밋업", label: "OFFICIAL POSTER" },
  { src: "/events/season-2/build/build-scenes-linkedin.jpg", alt: "BUILD 행사에서 GitHub Copilot 세션을 진행하는 유승호 연사", caption: "GitHub Copilot 3종 기능을 직접 따라 해본 실습 세션", label: "LIVE SESSION" },
  { src: "/events/season-2/build/build-speaker-highlight.jpg", alt: "Claw and Agent Harness 김훈동 MVP 세션 포스터", caption: "커뮤니티가 다시 해석한 Build 2026의 Agentic AI 이야기", label: "SPEAKER STORY" },
];

const snowflakeSessions = [
  { no: "01", time: "08:00–09:30", topic: "Copilot", speaker: "전대호", role: "Microsoft MVP", crew: ["주인화", "이종혁"], description: "Copilot 설명과 데모로 하루의 첫 플레이를 엽니다.", image: "/team/daeho-jeon.jpg", linkedin: "https://www.linkedin.com/in/canrobot/" },
  { no: "02", time: "09:30–11:00", topic: "Copilot Studio", speaker: "진미나", role: "Microsoft MVP", crew: ["윤미영", "염선영"], description: "Copilot Studio 기반 업무와 Agent 시나리오를 설명하고 시연합니다.", image: "/team/mina-jin.jpg", linkedin: "https://www.linkedin.com/in/mina-jin-91333493/" },
  { no: "03", time: "11:00–12:30", topic: "Power Platform / P.P", speaker: "이재석", role: "Microsoft MVP", crew: ["김성미"], description: "Power Platform을 활용한 자동화와 실제 업무 시나리오를 만납니다.", initials: "이재석", linkedin: "https://www.linkedin.com/in/leejaeseok/" },
  { no: "04", time: "13:30–15:00", topic: "Power Platform / P.P", speaker: "허석", role: "Microsoft MVP", crew: ["이미희", "박경덕"], description: "Power Platform 기반 자동화와 업무 적용 경험을 데모로 연결합니다.", image: "/team/huh-seok.jpg", linkedin: "https://www.linkedin.com/in/somissem/" },
  { no: "05", time: "15:00–16:30", topic: "GitHub Copilot", speaker: "이보라", role: "Microsoft MVP", crew: ["진선라(오후)", "김성미"], description: "개발자를 위한 AI Coding과 GitHub Copilot 경험을 공유합니다.", initials: "이보라", linkedin: "https://www.linkedin.com/in/learner-bora/" },
  { no: "06", time: "16:30–18:00", topic: "Copilot + PC", speaker: "서동훈", role: "Microsoft", crew: ["문종호"], description: "Surface 기반 AI on Device 경험과 현장 데모를 콘텐츠로 만듭니다.", initials: "서동훈", linkedin: "https://www.linkedin.com/in/daveseo/" },
];

function BuildEventRecord() {
  return <>
    <section className="build-visual-story" aria-label="BUILD 행사 주요 이미지">
      <figure className="build-visual-poster"><img src={buildGallery[0].src} alt={buildGallery[0].alt} /><figcaption><span>OFFICIAL POSTER</span><strong>BUILD / localhost:SEOUL</strong></figcaption></figure>
      <div className="build-visual-scenes"><figure><img src={buildGallery[1].src} alt={buildGallery[1].alt} /><figcaption>현장에서 직접 따라 해본 GitHub Copilot</figcaption></figure><figure><img src={buildGallery[2].src} alt={buildGallery[2].alt} /><figcaption>Build 2026을 커뮤니티 언어로 다시 읽다</figcaption></figure></div>
    </section>
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

    <section className="build-record-section" aria-labelledby="build-sessions-title">
      <div className="build-record-heading"><span>TRACK 1 · JEJU ROOM</span><h2 id="build-sessions-title">세션 일정</h2><p>오후 1시부터 7개의 발표와 실습이 이어진 BUILD 플레이리스트입니다.</p></div>
      <div className="build-table-wrap build-session-scroll" tabIndex={0} aria-label="BUILD 행사 세션 표, 가로로 스크롤 가능">
        <table className="build-session-table">
          <thead><tr><th scope="col">시간</th><th scope="col">세션</th><th scope="col">연사</th><th scope="col">Build</th></tr></thead>
          <tbody>{buildSessions.map((session) => <tr key={`${session.time}-${session.title}`} className={session.ref === "BREAK" ? "break-row" : ""}>
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
    <section className="snowflake-poster" aria-labelledby="snowflake-poster-title">
      <div className="snowflake-poster-card">
        <div className="snowflake-brand-row"><strong><i aria-hidden="true">❄</i> Snowflake</strong><span>×</span><strong>Microsoft</strong></div>
        <p className="snowflake-place">SEOUL · AUG 27</p>
        <div className="snowflake-flurry" aria-hidden="true"><span>✦</span><span>❄</span><span>✦</span></div>
        <p className="snowflake-kicker">SNOWFLAKE WORLD TOUR · QUIZ &amp; LUCKY DRAW</p>
        <h1 id="snowflake-poster-title"><em>즐겁게,</em><br />배우고, 선물 받자!</h1>
        <p className="snowflake-poster-copy">Microsoft와 Snowflake AI를 가볍게 만나고,<br />특별 시연과 행운이 담긴 현장 프로그램을 즐겨보세요.</p>
        <div className="snowflake-metrics" aria-label="행사 체험 정보"><span><strong>3</strong>문제</span><span><strong>1</strong>회 뽑기</span><span><strong>3</strong>분 체험</span></div>
        <div className="snowflake-poster-foot"><span>2026.08.27 · 목요일</span><span>SEOUL · SNOWFLAKE WORLD TOUR</span></div>
      </div>
    </section>

    <section className="snowflake-host" aria-labelledby="snowflake-host-title">
      <figure><img src="/host-sung-mi-kim-profile.png" alt="AI놀이터 모임장 김성미" /></figure>
      <div className="snowflake-host-copy"><span>PEOPLE BEHIND THE PLAYGROUND</span><h2 id="snowflake-host-title">김성미 <small>Sung Mi Kim</small></h2><strong>Microsoft Korea · AI Community Builder</strong><p>AI 시대에 커뮤니티 동료가 주는 대체할 수 없는 가치를 나누고, 누구나 편하게 배우고 연결되는 AI놀이터를 만들어갑니다.</p><a href="https://www.linkedin.com/in/sungmikim77/" target="_blank" rel="noreferrer">LinkedIn 프로필 보기 ↗</a></div>
    </section>

    <section className="snowflake-sessions" aria-labelledby="snowflake-sessions-title">
      <header><span>MICROSOFT MVP · 90 MINUTE SESSIONS</span><h2 id="snowflake-sessions-title">AI놀이터 세션 안내</h2><p>여섯 명의 Microsoft MVP와 Crew가 1시간 30분씩 실전 설명과 데모를 이어갑니다.</p></header>
      <div className="snowflake-session-grid">{snowflakeSessions.map((session) => <article className="snowflake-session-card" key={session.no}>
        <div className="snowflake-session-time"><span>SESSION {session.no}</span><time>{session.time}</time><small>1시간 30분</small></div>
        <div className="snowflake-speaker-avatar">{session.image ? <img src={session.image} alt={`${session.speaker} 연사`} /> : <span>{session.initials}</span>}</div>
        <div className="snowflake-session-copy"><span>{session.role}</span><h3>{session.topic}</h3><a href={session.linkedin} target="_blank" rel="noreferrer"><strong>{session.speaker}</strong> ↗</a><p>{session.description}</p><div className="snowflake-crew"><b>함께하는 Crew</b>{session.crew.map((member) => <i key={member}>{member}</i>)}</div></div>
      </article>)}</div>
    </section>

    <section className="snowflake-program" aria-labelledby="snowflake-program-title">
      <header><span>PLAY TOGETHER</span><h2 id="snowflake-program-title">행사 프로그램</h2><p>짧고 즐거운 체험부터 깊이 있는 데모와 새로운 연결까지, 현장에서 함께하는 네 가지 플레이입니다.</p></header>
      <div className="snowflake-program-grid">
        <article><b>01</b><span>AI QUIZ</span><h3>AI 퀴즈 &amp; 경품</h3><p>Microsoft와 Snowflake AI를 세 문제로 가볍게 만나봅니다.</p></article>
        <article><b>02</b><span>Lucky Draw</span><h3>행운의 뽑기</h3><p>퀴즈를 마치고 투명 뽑기 박스에서 준비된 선물을 만나보세요.</p></article>
        <article><b>03</b><span>LIVE DEMO</span><h3>MVP 특별 시연</h3><p>여섯 개 세션에서 Copilot과 Power Platform의 실제 활용을 확인합니다.</p></article>
        <article><b>04</b><span>COMMUNITY</span><h3>커뮤니티 네트워킹</h3><p>배움의 장면을 이야기로 나누고 다음 연결을 만드는 시간입니다.</p></article>
      </div>
      <div className="snowflake-program-link"><p>퀴즈는 별도의 행사 페이지에서 참여할 수 있습니다.</p><a href="https://snowflake-ai-playground-quiz.youni.chatgpt.site/play.html" target="_blank" rel="noreferrer">행사 퀴즈 페이지 보기 ↗</a></div>
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
    {event.slug === "snowflake" ? <SnowflakeEventRecord /> : <div className={`event-detail-hero ${event.accent}`}><span>{event.eyebrow} · {event.state}</span><h1>{event.title}</h1><p>{event.description}</p></div>}
    {event.slug === "build" && <BuildEventRecord />}
    <EventGallery title={`${event.title} 갤러리`} items={event.slug === "build" ? buildGallery : []} emptyMessage={event.slug === "snowflake" ? "8월 27일 Snowflake 행사 사진과 발표 자료가 정리되는 대로 이곳에 공개됩니다." : "BUILD 행사의 현장 사진과 결과물을 정리해 이곳에 차례로 추가합니다."} />
  </section><SiteFooter /></main>;
}
