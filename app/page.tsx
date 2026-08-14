const linkedInUrl =
  "https://www.linkedin.com/groups/14571141/?highlightedUpdateUrn=urn%3Ali%3AgroupPost%3A14571141-7486229108755136512&q=highlightedFeedForGroups";

const playSteps = [
  {
    number: "01",
    title: "만져보기",
    description: "새로운 AI 도구를 직접 열고, 궁금한 만큼 자유롭게 실험합니다.",
  },
  {
    number: "02",
    title: "나눠보기",
    description: "잘된 결과뿐 아니라 막혔던 지점과 발견한 요령까지 함께 나눕니다.",
  },
  {
    number: "03",
    title: "만들어보기",
    description: "배운 것을 나의 일과 일상에 연결해 작지만 쓸모 있는 결과를 만듭니다.",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="AI놀이터 홈">
          <span className="brand-mark" aria-hidden="true">A!</span>
          <span>AI놀이터</span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#about">소개</a>
          <a href="#seasons">시즌</a>
          <a href="#how-we-play">함께 노는 법</a>
        </nav>
        <a className="header-cta" href={linkedInUrl} target="_blank" rel="noreferrer">
          커뮤니티 가기 <Arrow />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
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
            <a className="button button-primary" href={linkedInUrl} target="_blank" rel="noreferrer">
              시즌2 소식 보기 <Arrow />
            </a>
            <a className="text-link" href="#seasons">시즌 이야기 <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className="hero-art" aria-label="아이디어가 실험과 연결을 거쳐 결과가 되는 과정">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="spark spark-one">✦</div>
          <div className="spark spark-two">✦</div>
          <div className="hero-card card-question">
            <span>오늘의 질문</span>
            <strong>“이것도 AI로<br />할 수 있을까?”</strong>
          </div>
          <div className="hero-card card-result">
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
        <p className="eyebrow">WHY WE PLAY</p>
        <div className="intro-grid">
          <h2>AI는 설명보다<br /><em>한 번의 경험</em>으로<br />더 가까워집니다.</h2>
          <div className="intro-copy">
            <p>누군가는 처음이라서, 누군가는 더 깊이 알고 싶어서 이곳에 옵니다. 시작점은 달라도 괜찮습니다.</p>
            <p>서로의 질문이 다음 사람의 힌트가 되고, 작은 시도가 모두의 배움이 되는 곳. AI놀이터는 함께 성장하는 열린 실험실입니다.</p>
          </div>
        </div>
      </section>

      <section className="seasons" id="seasons">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OUR SEASONS</p>
            <h2>놀이는 계속됩니다.</h2>
          </div>
          <p>한 시즌의 경험이 다음 시즌의 더 큰 질문으로 이어집니다.</p>
        </div>

        <div className="season-grid">
          <article className="season-card season-current">
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

          <article className="season-card season-past">
            <div className="season-topline">
              <span className="season-number">01</span>
              <span className="archive-badge">ARCHIVE</span>
            </div>
            <div>
              <p className="season-kicker">AI놀이터 · SEASON 1</p>
              <h3>처음이라 더 즐거웠던<br />우리의 첫 번째 실험</h3>
              <p>낯선 AI를 함께 열어보고, 질문하고, 가능성을 발견하며 놀이터의 시작을 만들었습니다.</p>
            </div>
            <a href={linkedInUrl} target="_blank" rel="noreferrer">시즌1 기록 만나기 <Arrow /></a>
          </article>
        </div>
      </section>

      <section className="playbook" id="how-we-play">
        <div className="section-heading light">
          <div>
            <p className="eyebrow">HOW WE PLAY</p>
            <h2>함께 노는 법</h2>
          </div>
          <p>정답을 외우는 대신, 각자의 방식으로 AI와 친해집니다.</p>
        </div>
        <div className="steps">
          {playSteps.map((step) => (
            <article className="step" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="join">
        <div className="join-stamp" aria-hidden="true">COME<br />PLAY<br />WITH US</div>
        <p className="eyebrow">NEXT PLAYER: YOU</p>
        <h2>당신의 호기심을<br />가지고 놀러 오세요.</h2>
        <p>잘해야 참여하는 곳이 아니라, 함께 해보며 알아가는 곳입니다.</p>
        <a className="button button-primary" href={linkedInUrl} target="_blank" rel="noreferrer">
          LinkedIn 커뮤니티 참여하기 <Arrow />
        </a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark">A!</span><span>AI놀이터</span></a>
        <p>PLAY. LEARN. SHARE. REPEAT.</p>
        <span>Season 2 is now playing.</span>
      </footer>
    </main>
  );
}
