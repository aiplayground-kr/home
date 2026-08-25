import { teams } from "../content";
import { PageIntro, SiteFooter, SiteHeader } from "../site-shell";

type Person = {
  name: string;
  role: string;
  initials: string;
  image?: string;
  linkedin?: string;
  objectPosition?: string;
};

const people: Record<string, Person> = {
  "김성미": { name: "김성미", role: "Community Lead", initials: "김", image: "/host-sung-mi-kim-profile.png", linkedin: "https://www.linkedin.com/in/sungmikim77/", objectPosition: "50% 35%" },
  "Tiny Lee": { name: "Tiny Lee", role: "Steering", initials: "TL" },
  "이종혁": { name: "이종혁", role: "Steering", initials: "이", linkedin: "https://kr.linkedin.com/in/hololee" },
  "문종훈": { name: "문종훈", role: "PLAY Lead", initials: "문", image: "/team/jonghoon-moon.jpg", linkedin: "https://kr.linkedin.com/in/%EC%A2%85%ED%9B%88-%EB%AC%B8-165a3399" },
  "윤미영": { name: "윤미영", role: "SHARE Lead", initials: "윤" },
  "허석": { name: "허석", role: "SHARE Sub-lead", initials: "허", linkedin: "https://kr.linkedin.com/in/somissem" },
  "박현정": { name: "박현정", role: "SHARE Sub-lead", initials: "박", linkedin: "https://kr.linkedin.com/in/hyunjeong-benji-park" },
  "전대호": { name: "전대호", role: "BUILD Lead", initials: "전", image: "/team/daeho-jeon-poster.png", linkedin: "https://kr.linkedin.com/in/canrobot", objectPosition: "88% 50%" },
  "진미나": { name: "진미나", role: "BUILD Sub-lead", initials: "진", image: "/team/mina-jin.jpg", linkedin: "https://kr.linkedin.com/in/mina-jin-91333493", objectPosition: "50% 28%" },
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
    <span className="org-person-copy"><strong>{person.name}</strong><small>{person.role}</small></span>
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

      <p className="org-profile-note">공개 LinkedIn 프로필과 본인 공식 프로필에서 확인한 이미지를 사용했습니다. 공개 사진을 확인하지 못한 구성원은 이니셜로 표시되며, 프로필 링크가 확인되면 바로 연결됩니다.</p>
      <aside><strong>PROJECT LAYER · 작은 놀이터</strong><p>프로젝트마다 리더를 세우고 팀 구분 없이 삼삼오오 협력합니다.</p><a href="/small-playground">프로그램 보기</a></aside>
    </section><SiteFooter /></main>;
}
