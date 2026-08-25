import type { Metadata } from "next";
import { seasonTwoEvents } from "../../../content";
import { EventGallery } from "../../../event-gallery";
import { SiteFooter, SiteHeader } from "../../../site-shell";

type Props = { params: Promise<{ slug: string }> };

const buildSessions = [
  { time: "13:00–13:20", title: "환영합니다", ref: "WELCOME", company: "Microsoft", speaker: "송주현 리더", description: "BUILD / localhost:SEOUL의 문을 여는 환영 인사" },
  { time: "13:20–14:00", title: "1인 기업가가 되기 위한 마지막 관문, Claw and Agent Harness", ref: "BRK243", company: "Microsoft MVP", speaker: "김훈동", description: "Foundry의 Claw Agent와 다중 에이전트 시스템" },
  { time: "14:00–14:40", title: "Copilot Cowork로 업무 자동화 뚝딱 해치우기", ref: "SPECIAL", company: "Microsoft MVP", speaker: "전대호", description: "왕초보도 시작할 수 있는 Copilot Cowork 업무 자동화" },
  { time: "14:40–15:20", title: "개발자가 주목해야 할 Build 2026 요약", ref: "BRK206", company: "Microsoft MVP", speaker: "이보라", description: "Visual Studio와 GitHub Copilot의 디버깅·프로파일링·테스트 에이전트" },
  { time: "15:20–16:00", title: "비개발자가 GitHub Copilot으로 팀 전용 AI 비서를 만든 이야기", ref: "LTG402", company: "GM Technical Korea", speaker: "이영빈", description: "아이디어를 AI 네이티브 런타임의 프로덕션 준비 에이전트로 연결한 경험" },
  { time: "16:00–16:20", title: "Bio Break", ref: "BREAK", company: "", speaker: "", description: "휴식과 네트워킹" },
  { time: "16:20–16:50", title: "App Builder Agent로 학습 가이드 제작기", ref: "SPECIAL", company: "Office Tutor", speaker: "윤미영(유니)", description: "Copilot과 Agent로 손쉽게 만드는 학습 가이드" },
  { time: "16:50–17:50", title: "GitHub Copilot 3종 기능, 직접 해보기!", ref: "WORKSHOP", company: "Microsoft", speaker: "유승호", description: "Ask·Agent·Plan 기능으로 경험하는 AI 기반 개발 워크플로우" },
];

function BuildEventRecord() {
  return <>
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
            <td>{session.speaker && <><strong>{session.speaker}</strong><span>{session.company}</span></>}</td>
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
    <div className={`event-detail-hero ${event.accent}`}><span>{event.eyebrow} · {event.state}</span><h1>{event.title}</h1><p>{event.description}</p></div>
    {event.slug === "build" && <BuildEventRecord />}
    <EventGallery title={`${event.title} 갤러리`} items={[]} emptyMessage={event.slug === "snowflake" ? "8월 27일 Snowflake 행사 사진과 발표 자료가 정리되는 대로 이곳에 공개됩니다." : "BUILD 행사의 현장 사진과 결과물을 정리해 이곳에 차례로 추가합니다."} />
  </section><SiteFooter /></main>;
}
