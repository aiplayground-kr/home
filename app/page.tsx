import { ScrollInteractions } from "./scroll-interactions";

const linkedInUrl =
  "https://www.linkedin.com/groups/14571141/?highlightedUpdateUrn=urn%3Ali%3AgroupPost%3A14571141-7486229108755136512&q=highlightedFeedForGroups";
const smallPlaygroundPostUrl =
  "https://kr.linkedin.com/posts/sollar99_%EB%90%9C%EB%8B%A4-%EB%A7%81%ED%81%AC%EB%93%9C%EC%9D%B8-%ED%99%9C%EC%9A%A9%EB%B2%95-%EB%B3%80%EC%9E%AC%EC%9D%BC-%EB%8B%98%EC%9D%98-%EB%A7%81%ED%81%AC%EB%93%9C%EC%9D%B8%EC%97%90-%EB%8C%80%ED%95%9C-%EC%97%B4%EC%A0%95%EA%B0%95%EC%97%B0-%EA%B7%B8%EB%A6%AC%EA%B3%A0-activity-7480060156257423360-q_W_";
const interviewUrl =
  "https://microsoft.github.io/mwkorea/monthlycopilot/MonthlyCopilotInterviewKimSM/";

const playSteps = [
  ["01", "만져보기", "새로운 AI 도구를 직접 열고, 궁금한 만큼 자유롭게 실험합니다."],
  ["02", "나눠보기", "잘된 결과뿐 아니라 막혔던 지점과 발견한 요령까지 함께 나눕니다."],
  ["03", "만들어보기", "배운 것을 나의 일과 일상에 연결해 작지만 쓸모 있는 결과를 만듭니다."],
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
              <h3>시즌1의 이야기를<br />기다리고 있어요.</h3>
              <p>사진과 프로그램, 참여자들의 기록을 전달해주시면 이 자리에 풍성하게 채워 넣겠습니다.</p>
            </div>
            <span className="coming-soon">CONTENT COMING SOON</span>
          </article>
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
        <div className="small-season-list" data-reveal>
          <article className="small-season small-season-first" data-tilt>
            <div className="small-season-top">
              <span className="small-season-no">#01</span>
              <span className="small-season-state">첫 번째 기록</span>
            </div>
            <div>
              <p className="small-season-meta">2026.07.05 · MICROSOFT 13F</p>
              <h3>LinkedIn으로<br />소셜 브랜딩하기</h3>
              <p>『된다! 링크드인 활용법』 변재일 저자와 함께 기록, 축적, 연결이 어떻게 나와 조직의 브랜드가 되는지 직접 배우고 나눴습니다.</p>
            </div>
            <a href={smallPlaygroundPostUrl} target="_blank" rel="noreferrer">현장 포스팅 보기 <Arrow /></a>
          </article>
          <article className="small-season small-season-next" data-tilt>
            <div className="small-season-top">
              <span className="small-season-no">NEXT</span>
              <span className="small-season-live"><i /> 계속 진행 중</span>
            </div>
            <div>
              <p className="small-season-meta">NEW TOPIC · NEW PLAYERS</p>
              <h3>다음 작은 놀이터는<br />또 다른 주제로.</h3>
              <p>평소 시작을 망설였던 주제, 새롭게 발견한 재미있는 도구와 경험을 소규모 워크숍으로 이어갑니다.</p>
            </div>
            <a href={linkedInUrl} target="_blank" rel="noreferrer">다음 소식 확인하기 <Arrow /></a>
          </article>
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
