import type { Metadata } from "next";
import { seasonTwoEvents } from "../../../content";
import { EventGallery } from "../../../event-gallery";
import { SiteFooter, SiteHeader } from "../../../site-shell";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return seasonTwoEvents.map((event) => ({ slug: event.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = seasonTwoEvents.find((item) => item.slug === slug);
  return event ? { title: `${event.title} | Season 2`, description: event.description } : { title: "Season 2" };
}

export default async function SeasonTwoEventPage({ params }: Props) {
  const { slug } = await params;
  const event = seasonTwoEvents.find((item) => item.slug === slug);
  if (!event) return <main><SiteHeader /><section className="small-not-found"><p>행사를 찾을 수 없습니다.</p><a href="/seasons/season-2">시즌 2로 돌아가기</a></section></main>;
  return <main><SiteHeader /><section className="event-detail-shell">
    <a className="archive-detail-back" href="/seasons/season-2">← 시즌 2 공식 행사</a>
    <div className={`event-detail-hero ${event.accent}`}><span>{event.eyebrow} · {event.state}</span><h1>{event.title}</h1><p>{event.description}</p></div>
    <EventGallery title={`${event.title} 갤러리`} items={[]} emptyMessage={event.slug === "snowflake" ? "8월 27일 Snowflake 행사 사진과 발표 자료가 정리되는 대로 이곳에 공개됩니다." : "BUILD 행사의 현장 사진과 결과물을 정리해 이곳에 차례로 추가합니다."} />
  </section><SiteFooter /></main>;
}
