"use client";

import { useRef } from "react";

export type SeasonEventFact = { label: string; value: string };
export type SeasonSpeaker = { name: string; role: string; topic: string; image: string; linkedin?: string };

export function SeasonEventCover({ id, tone, image, imageAlt, eyebrow, title, description, facts, tags }: { id: string; tone: "build" | "snowflake"; image: string; imageAlt: string; eyebrow: string; title: React.ReactNode; description: string; facts: SeasonEventFact[]; tags: string[] }) {
  return <section className={`season-event-cover cover-tone-${tone}`} aria-labelledby={id}>
    <figure><img src={image} alt={imageAlt} /><figcaption>OFFICIAL EVENT POSTER</figcaption></figure>
    <div className="season-event-cover-copy">
      <span>{eyebrow}</span>
      <h1 id={id}>{title}</h1>
      <p>{description}</p>
      <dl>{facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
      <div className="season-event-cover-tags" aria-label="행사 키워드">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    </div>
  </section>;
}

export function SpeakerCarousel({ title, eyebrow, description, speakers }: { title: string; eyebrow: string; description: string; speakers: SeasonSpeaker[] }) {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: -1 | 1) => track.current?.scrollBy({ left: direction * Math.max(300, track.current.clientWidth * .72), behavior: "smooth" });
  return <section className="season-speakers" aria-labelledby="season-speakers-title">
    <header><div><span>{eyebrow}</span><h2 id="season-speakers-title">{title}</h2><p>{description}</p></div><div className="speaker-carousel-controls" aria-label="연사 슬라이드 이동"><button type="button" onClick={() => move(-1)} aria-label="이전 연사">←</button><button type="button" onClick={() => move(1)} aria-label="다음 연사">→</button></div></header>
    <div className="speaker-carousel-track" ref={track} tabIndex={0} aria-label="연사 카드, 가로로 넘겨볼 수 있습니다">
      {speakers.map((speaker, index) => <article className="speaker-slide" key={speaker.name}>
        <div className="speaker-slide-image"><img src={speaker.image} alt={`${speaker.name} 연사 세션 소개`} loading={index > 1 ? "lazy" : undefined} /><span>{String(index + 1).padStart(2, "0")}</span></div>
        <div><small>{speaker.role}</small><h3>{speaker.name}</h3><p>{speaker.topic}</p>{speaker.linkedin && <a href={speaker.linkedin} target="_blank" rel="noreferrer">LinkedIn 프로필 ↗</a>}</div>
      </article>)}
    </div>
  </section>;
}
