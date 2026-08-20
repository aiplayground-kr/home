import { seasonOneEvents } from "../../content";
import { PageIntro, SiteFooter, SiteHeader } from "../../site-shell";

export default function SeasonOnePage() {
  return (
    <main>
      <SiteHeader />
      <PageIntro
        eyebrow="SEASON 1 · 2024—2026"
        title="시즌 1 현장 게시판"
        description="네 번의 만남에서 오간 질문과 배움을 실제 포스터, LinkedIn 후기 작성자의 목소리와 함께 펼쳐봅니다."
      />

      <section className="archive-board season-one-board section-pad compact">
        {seasonOneEvents.map((event) => (
          <article id={event.slug} key={event.slug}>
            <div className="archive-visual-column">
              <div className="archive-poster">
                <img src={event.image} alt={`${event.title} 공식 포스터`} />
                <span>{event.label}</span>
              </div>
              {event.galleryImage ? (
                <figure className="archive-gallery-image">
                  <img src={event.galleryImage} alt={`${event.title} 현장 후원과 프로그램 이미지`} />
                  <figcaption>MORE FROM THIS DAY</figcaption>
                </figure>
              ) : null}
            </div>

            <div className="archive-copy">
              <div className="post-meta"><span>POST {event.number}</span><time>{event.date}</time></div>
              <h2>{event.title}</h2>
              <p>{event.summary}</p>
              <div className="tags">{event.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>

              <div className="field-note visual-field-note">
                <span>LINKEDIN FIELD NOTE</span>
                <h3>현장 결과</h3>
                <ul>{event.results.map((result) => <li key={result}>{result}</li>)}</ul>

                <div className="voice-heading">
                  <div><small>VOICES FROM LINKEDIN</small><h3>그날을 기록한 사람들</h3></div>
                  <span>{event.feedbackPeople.length} VOICE</span>
                </div>

                <div className="feedback-voices">
                  {event.feedbackPeople.map((voice) => (
                    <a className="feedback-voice" href={voice.linkedinUrl} target="_blank" rel="noreferrer" key={voice.linkedinUrl}>
                      <img src={voice.image} alt={`${voice.name} LinkedIn 프로필 사진`} style={{ objectPosition: voice.objectPosition }} />
                      <div className="feedback-bubble">
                        <p>{voice.message}</p>
                        <div><strong>{voice.name}</strong><span>{voice.role}</span></div>
                        <small>LinkedIn 프로필 보기 ↗</small>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="source-links">
                  {event.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label}</a>)}
                </div>
              </div>

              <details><summary>행사 개요 다시 보기</summary><p>{event.detail}</p></details>
            </div>
          </article>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
