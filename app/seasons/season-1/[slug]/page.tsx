import type { Metadata } from "next";
import { seasonOneEvents } from "../../../content";
import { EventGallery } from "../../../event-gallery";
import { SiteFooter, SiteHeader } from "../../../site-shell";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return seasonOneEvents.map((event) => ({ slug: event.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = seasonOneEvents.find((item) => item.slug === slug);
  return event ? { title: `${event.title} | Season 1`, description: event.summary, openGraph: { title: event.title, description: event.summary, images: [event.image] }, twitter: { title: event.title, description: event.summary, images: [event.image] } } : { title: "Season 1" };
}

export default async function SeasonOneEventPage({ params }: Props) {
  const { slug } = await params;
  const event = seasonOneEvents.find((item) => item.slug === slug);
  if (!event) return <main><SiteHeader /><section className="small-not-found"><p>행사 기록을 찾을 수 없습니다.</p><a href="/seasons/season-1">시즌 1로 돌아가기</a></section></main>;
  const gallery = [
    { src: event.image, alt: `${event.title} 공식 포스터`, caption: "공식 행사 포스터", label: "POSTER" },
    ...(event.galleryImage ? [{ src: event.galleryImage, alt: `${event.title} 현장 자료`, caption: "현장 프로그램과 함께한 기록", label: "ON SITE" }] : []),
    ...event.feedbackPeople.map((voice) => ({ src: voice.image, alt: `${voice.name} LinkedIn 프로필`, caption: `${voice.name} · ${voice.role}`, label: "VOICE" })),
  ];
  return <main><SiteHeader /><section className="archive-detail-shell">
    <a className="archive-detail-back" href="/seasons/season-1">← 시즌 1 게시판</a>
    <div className="archive-detail-hero"><img src={event.image} alt={`${event.title} 공식 포스터`} /><div className="archive-detail-copy">
      <div className="archive-detail-meta"><span>SEASON 1 · POST {event.number}</span><time>{event.date}</time></div>
      <h1>{event.title}</h1><p>{event.summary}</p>
      <div className="tags">{event.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
      <div className="archive-detail-results"><h2>이날 남긴 것</h2><ul>{event.results.map((result) => <li key={result}>{result}</li>)}</ul></div>
      <div className="archive-detail-actions">{event.sources.map((source) => <a className="button ghost" href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label} ↗</a>)}</div>
    </div></div>
    <EventGallery title={`${event.title} 갤러리`} items={gallery} />
    <div className="archive-detail-voice"><div className="voice-heading"><div><small>VOICES FROM LINKEDIN</small><h3>그날을 기록한 사람들</h3></div></div><div className="feedback-voices">{event.feedbackPeople.map((voice) => <a className="feedback-voice" href={voice.linkedinUrl} target="_blank" rel="noreferrer" key={voice.linkedinUrl}><img src={voice.image} alt={`${voice.name} LinkedIn 프로필`} style={{ objectPosition: voice.objectPosition }} /><div className="feedback-bubble"><p>{voice.message}</p><div><strong>{voice.name}</strong><span>{voice.role}</span></div><small>LinkedIn 프로필 보기 ↗</small></div></a>)}</div></div>
  </section><SiteFooter /></main>;
}
