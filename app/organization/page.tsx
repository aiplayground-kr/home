import { teams } from "../content";
import { PageIntro, SiteFooter, SiteHeader } from "../site-shell";

export default function OrganizationPage() { return <main><SiteHeader />
  <PageIntro eyebrow="HOW WE ORGANIZE" title="좋아하는 방식으로 함께 움직입니다" description="사람, 콘텐츠, 경험을 맡은 세 팀이 하나의 북극성을 향해 움직입니다." />
  <section className="org-map section-pad compact"><article className="steering"><span>COMMUNITY LEADER · STEERING</span><h2>김성미 · Tiny Lee · 이종혁 <small>+ α</small></h2><p>북극성 설정 · 방향 · 최종 의사결정</p></article><div className="team-grid">{teams.map(t => <article key={t.name}><span>TEAM {t.no}</span><b>{t.name}</b><h2>{t.purpose}</h2><p>LEAD <strong>{t.lead}</strong><br />SUB-LEAD <strong>{t.sub}</strong></p><ul>{t.roles.map(r => <li key={r}>{r}</li>)}</ul></article>)}</div><aside><strong>PROJECT LAYER · 작은 놀이터</strong><p>프로젝트마다 리더를 세우고 팀 구분 없이 삼삼오오 협력합니다.</p><a href="/small-playground">프로그램 보기</a></aside></section><SiteFooter /></main> }
