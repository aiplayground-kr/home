import { ScrollInteractions } from "./scroll-interactions";
import { smallPlaygroundPrograms } from "./small-playground/data";

const linkedInUrl =
  "https://www.linkedin.com/groups/14571141/?highlightedUpdateUrn=urn%3Ali%3AgroupPost%3A14571141-7486229108755136512&q=highlightedFeedForGroups";
const interviewUrl =
  "https://microsoft.github.io/mwkorea/monthlycopilot/MonthlyCopilotInterviewKimSM/";
const hostLinkedInUrl = "https://www.linkedin.com/in/sungmikim77/";

const playSteps = [
  ["01", "만져보기", "새로운 AI 도구를 직접 열고, 궁금한 만큼 자유롭게 실험합니다."],
  ["02", "나눠보기", "잘된 결과뿐 아니라 막혔던 지점과 발견한 요령까지 함께 나눕니다."],
  ["03", "만들어보기", "배운 것을 나의 일과 일상에 연결해 작지만 쓸모 있는 결과를 만듭니다."],
];

const seasonOnePosts = [
  {
    number: "01",
    date: "2024.11.30",
    season: "SPECIAL",
    title: "Microsoft Ignite After Party with MVP",
    summary: "Ignite의 핵심 발표를 함께 읽고, 피아노 앱 합주부터 Power Apps·Dynamics 365·RAG·SLM·Semantic Kernel까지 하루 동안 직접 듣고 나눈 첫 기록입니다.",
    image: "/season1/01-ignite-after-party.png",
    alt: "2024 Microsoft Ignite After Party 발표자와 행사 안내",
    tags: ["Ignite", "MVP", "Hands-on"],
    detail: "이소영님의 ‘함께 성장하는 커뮤니티의 힘’으로 문을 열고, 이재석·허석 MVP의 피아노 앱 핸즈온과 김현혜·신수원·박조은·송민석·김진석·윤혜식·김성미 발표가 이어졌습니다.",
  },
  {
    number: "02",
    date: "2025.06.22",
    season: "SUMMER",
    title: "AI 동료와 함께 살아갈 준비",
    summary: "사례로 쉽게 이해하는 AI와 노코드로 구현하는 AI, 두 갈래 트랙으로 AI 에이전트와 일하는 방식을 탐색한 여름 밋업입니다.",
    image: "/season1/02-summer-meetup.png",
    alt: "2025 AI놀이터 여름 밋업 프로그램과 발표자",
    tags: ["AI Agent", "No-code", "Case Study"],
    detail: "LG전자 CHATDA, AI 투자 에이전트, 프런티어 기업 생존 전략, AI·빅데이터 리서치, Copilot과 리더십, AI 프로젝트 관리 프레임워크 등 현업 사례를 한 자리에서 나눴습니다.",
  },
  {
    number: "03",
    date: "2025.09.27",
    season: "FALL",
    title: "What’s Your Dream?",
    summary: "세상의 문제를 발견하고 푸는 스타트업에게 배우며, 각자의 꿈을 AI와 함께 어떻게 현실로 만들지 질문한 가을 밋업입니다.",
    image: "/season1/03-fall-meetup.png",
    alt: "2025 AI놀이터 가을 밋업 What’s Your Dream 행사 안내",
    tags: ["Startup", "Agentic AI", "Vibe Coding"],
    detail: "Microsoft의 Agentic AI와 데이터 혁신, VC가 바라본 스타트업, Bio·Event·Beauty·Service 현장의 사례와 바이브코딩 이야기가 이어졌습니다. 사이먼 스큅의 영상 메시지와 도서 기부도 함께했습니다.",
    extraImage: "/season1/03-fall-gifts.png",
  },
  {
    number: "04",
    date: "2026.01.18",
    season: "WINTER",
    title: "슬기로운 AI 생활",
    summary: "워크와 라이프에서 AI를 현명하게 쓰는 법, 그리고 Excel부터 다양한 데이터 플랫폼까지 실무 활용 팁을 모은 시즌 1의 겨울 피날레입니다.",
    image: "/season1/04-winter-meetup.png",
    alt: "2026 AI놀이터 겨울 밋업 프로그램과 발표자",
    tags: ["Copilot", "Data", "Excel"],
    detail: "AI 시대의 성장, Microsoft가 인정한 MVP들의 실전 노하우, 데이터 기반 업무와 Agentic AI까지 역할별·직무별로 바로 적용할 수 있는 팁을 촘촘하게 공유했습니다.",
  },
];

const organizationTeams = [
  {
    number: "01",
    name: "PLAY",
    lead: "문종훈",
    subLead: "TBU",
    question: "누가 함께할 것인가?",
    purpose: "사람을 모으고 연결합니다.",
    signal: "나는 사람을 좋아해",
    roles: ["Crew 온보딩", "멤버 소통과 참여 독려", "참가자·네트워킹 관리", "장소와 현장 운영 지원"],
  },
  {
    number: "02",
    name: "SHARE",
    lead: "윤미영",
    subLead: "허석 · 박현정",
    question: "무엇을 함께 나눌 것인가?",
    purpose: "콘텐츠를 만들고 나눕니다.",
    signal: "나는 콘텐츠를 좋아해",
    roles: ["LinkedIn·Event 콘텐츠 기획", "Alliance·홍보·스폰서 협력", "학습 콘텐츠와 영상 정리", "작은 놀이터 주제·리더 발굴"],
  },
  {
    number: "03",
    name: "BUILD",
    lead: "전대호",
    subLead: "진미나",
    question: "어떻게 만들 것인가?",
    purpose: "경험을 만들고 누적합니다.",
    signal: "나는 행사 만들기를 좋아해",
    roles: ["계절별 Meetup 실행", "Venue와 운영 지원", "행사 기록", "경험 아카이빙"],
  },
];

function Logo() {
  return <img className="brand-logo" src="/ai-playground-logo.png" alt="" />;
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <ScrollInteractions />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="AI놀이터 홈">
          <Logo />
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#about">소개</a>
          <a href="#host">모임장</a>
          <a href="#organization">조직도</a>
          <a href="#seasons">시즌</a>
          <a href="#small-playground">작은 놀이터</a>
          <a href="#how-we-play">함께 노는 법</a>
        </nav>
        <a className="header-cta" data-magnetic href={linkedInUrl} target="_blank" rel="noreferrer">
          커뮤니티 가기 <Arrow />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy" data-reveal>
          <div className="live-pill"><span aria-hidden="true" /> SEASON 2 · NOW PLAYING</div>
          <h1>
            AI를 잘 몰라도,<br />
            <em>놀다 보면 알게 되는 곳.</em>
          </h1>
          <p className="hero-description">
            AI놀이터는 새로운 기술을 구경하는 데서 멈추지 않습니다.<br className="desktop-break" />
            직접 만지고, 질문하고, 함께 만들며 나만의 가능성을 발견합니다.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" data-magnetic href={linkedInUrl} target="_blank" rel="noreferrer">
              시즌2 소식 보기 <Arrow />
            </a>
            <a className="text-link" href="#seasons">시즌 이야기 <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className="hero-art" data-parallax aria-label="아이디어가 실험과 연결을 거쳐 결과가 되는 과정">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="spark spark-one">✦</div>
          <div className="spark spark-two">✦</div>
          <div className="hero-card card-question" data-tilt>
            <span>오늘의 질문</span>
            <strong>“이것도 AI로<br />할 수 있을까?”</strong>
          </div>
          <div className="hero-card card-result" data-tilt>
            <span>PLAY → LEARN → SHARE</span>
            <strong>작은 호기심이<br />진짜 결과로.</strong>
          </div>
          <div className="round-label">AI<br />PLAY<br />GROUND</div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div>TRY SOMETHING NEW <span>✦</span> SHARE WHAT YOU FOUND <span>✦</span> MAKE IT YOURS <span>✦</span> TRY SOMETHING NEW <span>✦</span> SHARE WHAT YOU FOUND <span>✦</span></div>
      </div>

      <section className="intro" id="about">
        <p className="eyebrow" data-reveal>WHY WE PLAY</p>
        <div className="intro-grid">
          <h2 data-reveal>AI는 설명보다<br /><em>한 번의 경험</em>으로<br />더 가까워집니다.</h2>
          <div className="intro-copy" data-reveal>
            <p>누군가는 처음이라서, 누군가는 더 깊이 알고 싶어서 이곳에 옵니다. 시작점은 달라도 괜찮습니다.</p>
            <p>서로의 질문이 다음 사람의 힌트가 되고, 작은 시도가 모두의 배움이 되는 곳. AI놀이터는 함께 성장하는 열린 실험실입니다.</p>
          </div>
        </div>
      </section>

      <section className="host-profile" id="host">
        <div className="host-portrait" data-reveal>
          <div className="host-photo-frame" data-tilt>
            <img src="/host-sung-mi-kim-current.jpg" alt="경복궁을 배경으로 노트북을 든 AI놀이터 모임장 김성미" loading="lazy" />
            <span className="host-photo-label">COMMUNITY LEADER</span>
          </div>
          <div className="host-doodle" aria-hidden="true">PLAY<br />TOGETHER</div>
        </div>
        <div className="host-copy" data-reveal>
          <p className="eyebrow">MEET THE HOST</p>
          <p className="host-role">AI놀이터 모임장 · MICROSOFT</p>
          <h2>김성미<br /><em>SUNG MI KIM</em></h2>
          <blockquote>“이타적인 배움은<br />가장 이기적인 성장을 돕는다.”</blockquote>
          <p>Microsoft에서 오랜 시간 세일즈와 고객 성공의 현장을 경험하며, 기술과 사람 사이의 연결을 만들어왔습니다. AI놀이터에서는 누구나 자신의 질문으로 시작해 함께 실험하고 성장할 수 있도록 커뮤니티의 방향을 이끌고 있습니다.</p>
          <p className="host-philosophy"><strong>What · Why · Who</strong>는 사람이 정하고, <strong>How</strong>는 AI가 가속합니다. 도구보다 먼저 나만의 북극성을 찾는 것—AI놀이터가 함께 묻고 싶은 질문입니다.</p>
          <div className="host-actions">
            <a className="button button-primary" data-magnetic href={hostLinkedInUrl} target="_blank" rel="noreferrer">
              LinkedIn 프로필 보기 <Arrow />
            </a>
            <a className="text-link" href={interviewUrl} target="_blank" rel="noreferrer">모임장 인터뷰 읽기</a>
          </div>
        </div>
      </section>

      <section className="organization" id="organization">
        <div className="organization-heading" data-reveal>
          <div>
            <p className="eyebrow">HOW WE ORGANIZE</p>
            <h2>좋아하는 방식으로<br /><em>함께 움직입니다.</em></h2>
          </div>
          <div className="organization-note">
            <span>SEASON 2 · OPERATING MAP</span>
            <p>모든 Crew가 한 팀에 참여해 사람, 콘텐츠, 경험을 함께 키웁니다. 운영 구조는 활동과 프로젝트에 맞춰 계속 업데이트됩니다.</p>
          </div>
        </div>

        <div className="organization-map">
          <article className="steering-card" data-tilt data-reveal>
            <div>
              <span>COMMUNITY LEADER / STEERING</span>
              <h3>김성미 · Tiny Lee · 이종혁 <small>+ α</small></h3>
              <p>북극성 설정 · 방향 · 최종 의사결정</p>
            </div>
            <div className="steering-question">
              <span>WHY?</span>
              <strong>우리는 왜 존재하는가?</strong>
            </div>
          </article>

          <div className="org-connector" aria-hidden="true"><i /><i /><i /></div>

          <div className="org-team-grid">
            {organizationTeams.map((team) => (
              <article className={`org-team org-team-${team.number}`} data-reveal key={team.name}>
                <div className="org-team-head">
                  <span>TEAM {team.number}</span>
                  <strong>{team.name}</strong>
                </div>
                <div className="org-team-body">
                  <p className="org-team-lead">LEAD <strong>{team.lead}</strong><br />SUB-LEAD <strong>{team.subLead}</strong></p>
                  <h3>{team.purpose}</h3>
                  <div className="org-question"><span>{team.number === "01" ? "WHO?" : team.number === "02" ? "WHAT?" : "HOW?"}</span>{team.question}</div>
                  <blockquote>“{team.signal}”</blockquote>
                  <details>
                    <summary>주요 역할 펼치기 <span aria-hidden="true">＋</span></summary>
                    <ul>{team.roles.map((role) => <li key={role}>{role}</li>)}</ul>
                  </details>
                </div>
              </article>
            ))}
          </div>

          <div className="small-project-bridge" data-reveal>
            <span>PROJECT LAYER</span>
            <div>
              <strong>작은 놀이터</strong>
              <p>프로젝트마다 리더를 세우고, 팀 구분 없이 삼삼오오 협력합니다.</p>
            </div>
            <a href="#small-playground">진행 중인 작은 놀이터 보기 <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="seasons" id="seasons">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">OUR SEASONS</p>
            <h2>놀이는 계속됩니다.</h2>
          </div>
          <p>한 시즌의 경험이 다음 시즌의 더 큰 질문으로 이어집니다.</p>
        </div>

        <div className="season-grid">
          <article className="season-card season-current" data-tilt data-reveal>
            <div className="season-topline">
              <span className="season-number">02</span>
              <span className="status-badge"><i /> 진행 중</span>
            </div>
            <div>
              <p className="season-kicker">AI놀이터 · SEASON 2</p>
              <h3>더 가까이,<br />더 나답게 쓰는 AI</h3>
              <p>새로운 도구를 빠르게 따라가는 것보다, 내 일과 일상에 맞는 쓰임을 함께 찾아갑니다.</p>
            </div>
            <a href={linkedInUrl} target="_blank" rel="noreferrer">시즌2 최신 이야기 <Arrow /></a>
          </article>

          <article className="season-card season-past" data-tilt data-reveal>
            <div className="season-topline">
              <span className="season-number">01</span>
              <span className="archive-badge">ARCHIVE</span>
            </div>
            <div>
              <p className="season-kicker">AI놀이터 · SEASON 1</p>
              <h3>네 번의 만남,<br />하나의 플레이리스트</h3>
              <p>Ignite에서 시작해 AI 동료, 꿈과 스타트업, 슬기로운 AI 생활까지. 시즌 1의 현장을 게시판에서 다시 만나보세요.</p>
            </div>
            <a href="#season1-archive">시즌1 게시판 열기 <Arrow /></a>
          </article>
        </div>
      </section>

      <section className="season-archive" id="season1-archive">
        <div className="archive-heading" data-reveal>
          <div>
            <p className="eyebrow">SEASON 1 · FIELD NOTES</p>
            <h2>그날의 질문과<br /><em>현장을 펼쳐보세요.</em></h2>
          </div>
          <div className="archive-intro">
            <strong>2024.11 — 2026.01</strong>
            <p>공지에서 끝나지 않은 네 번의 만남. 카드 위에 마우스를 올리고, 게시물을 열어 프로그램과 현장 이야기를 확인해보세요.</p>
          </div>
        </div>

        <div className="archive-board">
          {seasonOnePosts.map((post, index) => (
            <article className={`archive-post archive-post-${index + 1}`} data-reveal key={post.number}>
              <div className="post-image-wrap" data-tilt>
                <img src={post.image} alt={post.alt} loading="lazy" />
                <span className="post-sticker">{post.season}</span>
              </div>
              <div className="post-copy">
                <div className="post-meta">
                  <span>NO. {post.number}</span>
                  <time>{post.date}</time>
                </div>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <div className="post-tags">
                  {post.tags.map((tag) => <span key={tag}>#{tag}</span>)}
                </div>
                <details className="post-details">
                  <summary>기록 더 펼치기 <span aria-hidden="true">＋</span></summary>
                  <div>
                    <p>{post.detail}</p>
                    {post.extraImage && <img src={post.extraImage} alt="가을 밋업에서 준비한 도서와 선물" loading="lazy" />}
                  </div>
                </details>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="small-playground" id="small-playground">
        <div className="small-copy" data-reveal>
          <div className="small-status"><i /> SERIES · ONGOING</div>
          <p className="eyebrow">SMALL PLAYGROUND</p>
          <h2>작은 놀이터도,<br /><em>시즌제로 계속됩니다.</em></h2>
          <p className="small-lead">AI놀이터의 큰 만남 사이, 삼삼오오 모여 한 가지 주제를 더 깊게 실습하고 이야기합니다. 먼저 해본 사람이 나누고, 놀다 보면 어느새 나도 할 수 있게 되는 자리입니다.</p>
          <a className="small-source-link" href={interviewUrl} target="_blank" rel="noreferrer">
            작은 놀이터 소개 인터뷰 <Arrow />
          </a>
        </div>
        <div className="small-program-list" data-reveal>
          {smallPlaygroundPrograms.map((program) => (
            <a className={`small-program-card small-program-${program.slug}`} data-tilt href={`/small-playground/${program.slug}`} key={program.slug}>
              <div className="small-program-top">
                <span className="small-program-no">{program.number}</span>
                <span className="small-program-state">{program.status}</span>
              </div>
              <div>
                <p className="small-season-meta">{program.date}</p>
                <h3>{program.shortTitle}</h3>
                <p>{program.description}</p>
              </div>
              <span className="small-program-link">자세히 보기 <Arrow /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="playbook" id="how-we-play">
        <div className="section-heading light" data-reveal>
          <div>
            <p className="eyebrow">HOW WE PLAY</p>
            <h2>함께 노는 법</h2>
          </div>
          <p>정답을 외우는 대신, 각자의 방식으로 AI와 친해집니다.</p>
        </div>
        <div className="steps">
          {playSteps.map(([number, title, description]) => (
            <article className="step" data-reveal key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="join">
        <div className="join-stamp" aria-hidden="true">COME<br />PLAY<br />WITH US</div>
        <div data-reveal>
          <p className="eyebrow">NEXT PLAYER: YOU</p>
          <h2>당신의 호기심을<br />가지고 놀러 오세요.</h2>
          <p>잘해야 참여하는 곳이 아니라, 함께 해보며 알아가는 곳입니다.</p>
          <a className="button button-primary" data-magnetic href={linkedInUrl} target="_blank" rel="noreferrer">
            LinkedIn 커뮤니티 참여하기 <Arrow />
          </a>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top" aria-label="AI놀이터 홈"><Logo /></a>
        <p>PLAY. LEARN. SHARE. REPEAT.</p>
        <span>Season 2 is now playing.</span>
      </footer>
    </main>
  );
}
