import { hostLinkedInUrl, interviewUrl } from "../content";
import { PageIntro, SiteFooter, SiteHeader } from "../site-shell";

export default function HostPage() { return <main><SiteHeader />
  <PageIntro eyebrow="MEET THE HOST" title="김성미 · Sung Mi Kim" description="AI놀이터 모임장 · Microsoft" />
  <section className="host-story section-pad compact"><div className="quote-card"><span>COMMUNITY LEADER</span><blockquote>“이타적인 배움은<br />가장 이기적인 성장을 돕는다.”</blockquote><small>AI PLAYGROUND</small></div><div className="host-copy"><p className="eyebrow">WHY I PLAY</p><h2>기술보다 먼저,<br />사람의 질문을 봅니다.</h2><p>Microsoft에서 오랜 시간 세일즈와 고객 성공의 현장을 경험하며 기술과 사람 사이의 연결을 만들어왔습니다. AI놀이터에서는 누구나 자신의 질문으로 시작해 함께 실험하고 성장할 수 있도록 커뮤니티의 방향을 이끌고 있습니다.</p><p><strong>What · Why · Who</strong>는 사람이 정하고, <strong>How</strong>는 AI가 가속합니다. 도구보다 먼저 나만의 북극성을 찾는 것, AI놀이터가 함께 묻고 싶은 질문입니다.</p><div className="actions"><a className="button primary" href={hostLinkedInUrl} target="_blank" rel="noreferrer">LinkedIn 프로필</a><a className="button ghost" href={interviewUrl} target="_blank" rel="noreferrer">인터뷰 읽기</a></div><small className="photo-note">프로필 사진은 LinkedIn 공식 이미지 확인 후 반영합니다.</small></div></section><SiteFooter /></main> }
