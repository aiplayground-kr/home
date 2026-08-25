import { teams } from "../content";
import { PageIntro, SiteFooter, SiteHeader } from "../site-shell";

type Person = {
  name: string;
  role: string;
  initials: string;
  image?: string;
  linkedin?: string;
  objectPosition?: string;
  summary: string;
};

const people: Record<string, Person> = {
  "김성미": { name: "김성미", role: "Community Lead", initials: "김", image: "/host-sung-mi-kim-profile.png", linkedin: "https://www.linkedin.com/in/sungmikim77/", objectPosition: "50% 35%", summary: "AI놀이터 모임장 · 커뮤니티의 방향과 연결을 이끕니다." },
  "Tiny Lee": { name: "Tiny Lee", role: "Steering · IT Manager", initials: "TL", image: "/team/linkedin-profile-placeholder.svg", linkedin: "https://www.linkedin.com/in/hwanhee-lee-it-manager/", summary: "커뮤니티 운영과 주요 의사결정을 함께합니다." },
  "이종혁": { name: "이종혁", role: "Steering · Crew", initials: "이", image: "/team/jonghyeok-lee.jpg", linkedin: "https://www.linkedin.com/in/jonghyeok-lee424/", summary: "AI 커뮤니티 행사 운영 · 현장 경험과 연결을 만듭니다." },
  "문종훈": { name: "문종훈", role: "PLAY Lead · Microsoft", initials: "문", image: "/team/jonghoon-moon.jpg", linkedin: "https://www.linkedin.com/in/%EC%A2%85%ED%9B%88-%EB%AC%B8-165a3399", summary: "AI놀이터 Crew · Grafana & Friends Seoul 운영진" },
  "윤미영": { name: "윤미영", role: "SHARE Lead", initials: "윤", image: "/team/miyoung-youn.jpg", linkedin: "https://www.linkedin.com/in/younni", summary: "콘텐츠 기획 · AI놀이터 소식과 배움의 기록을 나눕니다." },
  "허석": { name: "허석", role: "SHARE Sub-lead", initials: "허", image: "/team/huh-seok.jpg", linkedin: "https://www.linkedin.com/in/somissem/", summary: "Microsoft MVP · Power Platform과 AI 커뮤니티 활동" },
  "박현정": { name: "박현정", role: "SHARE Sub-lead · KMAC", initials: "박", image: "/team/linkedin-profile-placeholder.svg", linkedin: "https://www.linkedin.com/in/hyunjeong-benji-park/", summary: "AI 학습과 업무 생산성 콘텐츠를 만들고 나눕니다." },
  "전대호": { name: "전대호", role: "BUILD Lead", initials: "전", image: "/team/daeho-jeon.jpg", linkedin: "https://www.linkedin.com/in/canrobot/", summary: "CanRobot 대표 · Microsoft 365 Copilot MVP · MCT" },
  "진미나": { name: "진미나", role: "BUILD Sub-lead", initials: "진", image: "/team/mina-jin.jpg", linkedin: "https://www.linkedin.com/in/mina-jin-91333493", summary: "Microsoft MVP · MCT · AI 교육과 커뮤니티 활동" },
};

const steering = [people["김성미"], people["Tiny Lee"], people["이종혁"]];
const teamPeople: Record<string, Person[]> = {
  PLAY: [people["문종훈"]],
  SHARE: [people["윤미영"], people["허석"], people["박현정"]],
  BUILD: [people["전대호"], people["진미나"]],
};

function ProfileCard({ person, compact = false }: { person: Person; compact?: boolean }) {
  const content = <>
    <span className={`org-avatar${person.image ? " has-photo" : ""}`}>
      {person.image ? <img src={person.image} alt={`${person.name} 프로필 사진`} style={{ objectPosition: person.objectPosition }} /> : <b>{person.initials}</b>}
    </span>
    <span className="org-person-copy"><strong>{person.name}</strong><small>{person.role}</small><span className="org-person-summary">{person.summary}</span></span>
    {person.linkedin && <i aria-hidden="true">in</i>}
  </>;

  return person.linkedin ? (
    <a className={`org-person${compact ? " compact" : ""}`} href={person.linkedin} target="_blank" rel="noreferrer" aria-label={`${person.name} LinkedIn 프로필 열기`}>{content}</a>
  ) : (
    <div className={`org-person${compact ? " compact" : ""}`}>{content}</div>
  );
}

export default function OrganizationPage() {
  return <main><SiteHeader />
    <PageIntro eyebrow="HOW WE ORGANIZE" title="좋아하는 방식으로 함께 움직입니다" description="사람, 콘텐츠, 경험을 맡은 세 팀이 하나의 북극성을 향해 움직입니다." />
    <section className="org-map section-pad compact">
      <article className="steering">
        <div><span>COMMUNITY LEADER · STEERING</span><h2>하나의 북극성을<br />함께 정합니다.</h2><p>방향 설정 · 연결 · 최종 의사결정</p></div>
        <div className="steering-people">{steering.map(person => <ProfileCard key={person.name} person={person} />)}</div>
      </article>

      <div className="team-grid">{teams.map(team => <article key={team.name}>
        <span>TEAM {team.no}</span><b>{team.name}</b><h2>{team.purpose}</h2>
        <div className="team-people">{teamPeople[team.name].map(person => <ProfileCard key={person.name} person={person} compact />)}</div>
        <ul>{team.roles.map(role => <li key={role}>{role}</li>)}</ul>
      </article>)}</div>

      <p className="org-profile-note">제공해주신 LinkedIn 프로필을 기준으로 인물과 활동 정보를 연결했습니다. 공개 프로필 사진이 제공되지 않는 계정은 LinkedIn 기본 프로필 이미지로 표시됩니다.</p>
      <aside><strong>PROJECT LAYER · 작은 놀이터</strong><p>프로젝트마다 리더를 세우고 팀 구분 없이 삼삼오오 협력합니다.</p><a href="/small-playground">프로그램 보기</a></aside>
    </section><SiteFooter /></main>;
}
