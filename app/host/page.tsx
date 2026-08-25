import { hostLinkedInUrl, interviewUrl } from "../content";
import { PageIntro, SiteFooter, SiteHeader } from "../site-shell";

const agentConUrl = "https://globalai.community/e/23h1mpsn";

export default function HostPage() {
  return (
    <main>
      <SiteHeader />
      <PageIntro eyebrow="MEET THE HOST" title="김성미 · Sung Mi Kim" description="AI놀이터 모임장 · Microsoft" />

      <section className="host-story section-pad compact">
        <figure className="host-photo-card">
          <img src="/host-sung-mi-kim-profile.png" alt="김성미 AI놀이터 모임장 프로필 사진" />
          <figcaption>
            <span>COMMUNITY LEADER</span>
            <div className="host-quote-copy">
              <blockquote>“이타적인 배움은<br />가장 이기적인 성장을 돕는다.”</blockquote>
              <p className="host-signature"><strong>김성미</strong><span>AI놀이터 Lead · Microsoft</span></p>
            </div>
            <small>AI PLAYGROUND</small>
          </figcaption>
        </figure>

        <div className="host-copy">
          <p className="eyebrow">WHY I PLAY</p>
          <h2>기술보다 먼저,<br />사람의 질문을 봅니다.</h2>
          <p>Microsoft에서 오랜 시간 세일즈와 고객 성공의 현장을 경험하며 기술과 사람 사이의 연결을 만들어왔습니다. AI놀이터에서는 누구나 자신의 질문으로 시작해 함께 실험하고 성장할 수 있도록 커뮤니티의 방향을 이끌고 있습니다.</p>
          <p><strong>What · Why · Who</strong>는 사람이 정하고, <strong>How</strong>는 AI가 가속합니다. 도구보다 먼저 나만의 북극성을 찾는 것, AI놀이터가 함께 묻고 싶은 질문입니다.</p>
          <div className="actions">
            <a className="button primary" href={hostLinkedInUrl} target="_blank" rel="noreferrer">LinkedIn 프로필</a>
            <a className="button ghost" href={interviewUrl} target="_blank" rel="noreferrer">인터뷰 읽기</a>
          </div>
        </div>
      </section>

      <section className="host-profile section-pad">
        <div className="host-profile-head">
          <p className="eyebrow">PROFILE &amp; ACTIVITY</p>
          <h2>현장에서 연결하고,<br />커뮤니티에서 나눕니다.</h2>
          <p>공개 프로필과 공식 인터뷰·행사 기록을 바탕으로 정리한 김성미 모임장의 주요 이력과 활동입니다.</p>
        </div>

        <div className="host-profile-grid">
          <article><span>01 · CAREER</span><h3>Microsoft · SME&amp;C</h3><p>세일즈와 고객 성공의 현장에서 기술이 실제 비즈니스 가치와 사람의 변화로 이어지도록 연결해 왔습니다.</p></article>
          <article><span>02 · COMMUNITY</span><h3>AI놀이터 Lead</h3><p>개발자부터 기획자·마케터·영업·컨설턴트까지 함께 실습하고 경험을 나누는 Microsoft AI Community를 이끌고 있습니다.</p></article>
          <article><span>03 · SPEAKER</span><h3>AI 시대의 커리어와 변화</h3><p>AgentCon Seoul 2026에서 ‘Career Advance in the Age of AI’를 발표하는 등 AI와 일·성장의 변화를 이야기합니다.</p></article>
          <article><span>04 · PRACTICE</span><h3>Agent 설계와 경험 공유</h3><p>목적·사용자·지침·출력 형식을 중심으로 업무용 Agent를 직접 설계하고, 그 경험을 커뮤니티의 학습 자산으로 나눕니다.</p></article>
        </div>

        <div className="host-credentials">
          <div><p className="eyebrow">CERTIFICATIONS</p><h3>배움의 기반</h3></div>
          <ul>
            <li>Microsoft Certified: Azure AI Fundamentals</li>
            <li>Microsoft Certified: Azure Fundamentals</li>
            <li>Prosci Certified Change Practitioner</li>
          </ul>
        </div>

        <div className="host-sources" aria-label="모임장 활동 출처">
          <span>확인한 공개 기록</span>
          <a href={interviewUrl} target="_blank" rel="noreferrer">Microsoft 월간 Copilot 인터뷰 ↗</a>
          <a href={hostLinkedInUrl} target="_blank" rel="noreferrer">LinkedIn 프로필 ↗</a>
          <a href={agentConUrl} target="_blank" rel="noreferrer">AgentCon Seoul 세션 ↗</a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
