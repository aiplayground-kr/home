import type { Metadata } from "next";
import { getSmallPlaygroundProgram, smallPlaygroundPrograms } from "../data";
import { communityUrl } from "../../content";
import { SiteFooter, SiteHeader } from "../../site-shell";
import { EventGallery } from "../../event-gallery";

type DetailPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return smallPlaygroundPrograms.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getSmallPlaygroundProgram(slug);
  return {
    title: program ? `${program.number} ${program.title} | 작은 놀이터` : "작은 놀이터",
    description: program?.description,
    openGraph: program ? { title: `${program.number} ${program.title}`, description: program.description, images: program.image ? [program.image] : [] } : undefined,
    twitter: program ? { title: `${program.number} ${program.title}`, description: program.description, images: program.image ? [program.image] : [] } : undefined,
  };
}

export default async function SmallPlaygroundDetail({ params }: DetailPageProps) {
  const { slug } = await params;
  const program = getSmallPlaygroundProgram(slug);

  if (!program) {
    return (
      <main className="small-detail-page"><SiteHeader />
        <section className="small-not-found">
          <p>찾으시는 작은 놀이터가 없습니다.</p>
          <a href="/small-playground">목록으로 돌아가기</a>
        </section>
      </main>
    );
  }

  const currentIndex = smallPlaygroundPrograms.findIndex((item) => item.slug === slug);
  const previous = smallPlaygroundPrograms[currentIndex - 1];
  const next = smallPlaygroundPrograms[currentIndex + 1];

  return (
    <main className={`small-detail-page small-detail-${program.slug}`}>
      <SiteHeader />

      <section className="detail-hero">
        <div className="detail-title-block">
          <div className="detail-number">{program.number}</div>
          <div className="detail-status"><i /> {program.status}</div>
          <p>SMALL PLAYGROUND · SEASON SERIES</p>
          <h1>{program.title}</h1>
          <p className="detail-description">{program.description}</p>
        </div>
        {program.image ? <figure className="detail-poster"><img src={program.image} alt={`${program.number} ${program.title} 행사 포스터`} /><figcaption>OFFICIAL POSTER</figcaption></figure> : <div className={`program-cover cover-${((Number(program.slug) - 1) % 4) + 1}`}><span>AI PLAYGROUND</span><b>{program.number}</b><small>SMALL PLAYGROUND</small><h2>{program.shortTitle}</h2><time>{program.date}</time></div>}
      </section>

      <section className="detail-content">
        <div className="detail-facts">
          <article><span>DATE</span><strong>{program.date}</strong></article>
          <article><span>TIME</span><strong>{program.time}</strong></article>
          <article><span>PLACE</span><strong>{program.venue}</strong></article>
          <article><span>DURATION</span><strong>{program.duration}</strong></article>
        </div>

        <div className="detail-story">
          <div className="detail-main-copy">
            <p className="eyebrow">WHAT WE WILL PLAY</p>
            <h2>이 작은 놀이터에서<br />함께 해볼 것</h2>
            <ol>
              {program.topics.map((topic, index) => (
                <li key={topic}><span>0{index + 1}</span>{topic}</li>
              ))}
            </ol>
          </div>
          <aside className="detail-aside">
            <div><span>WHO</span><p>{program.audience}</p></div>
            <div><span>SIZE</span><p>{program.capacity}</p></div>
            <div><span>FORMAT</span><p>{program.format}</p></div>
            <blockquote>{program.note}</blockquote>
          </aside>
        </div>

        <EventGallery
          title={`${program.number} ${program.shortTitle}`}
          items={program.image ? [{ src: program.image, alt: `${program.title} 공식 포스터`, caption: "작은 놀이터 공식 포스터", label: "POSTER" }] : []}
          emptyMessage="포스터와 현장 사진이 공개되면 이 상세 페이지에 순서대로 추가됩니다."
        />

        <div className="detail-actions">
          {program.externalUrl ? (
            <a className="button primary" href={program.externalUrl} target="_blank" rel="noreferrer">현장 포스팅 보기</a>
          ) : (
            <a className="button primary" href={communityUrl} target="_blank" rel="noreferrer">최신 공지 확인하기</a>
          )}
          <a className="button ghost" href="/small-playground">전체 시리즈로 돌아가기</a>
        </div>
      </section>

      <nav className="detail-pagination" aria-label="작은 놀이터 이전 다음 프로그램">
        {previous ? <a href={`/small-playground/${previous.slug}`}><span>PREVIOUS</span><strong>{previous.number} {previous.shortTitle}</strong></a> : <span />}
        {next ? <a href={`/small-playground/${next.slug}`}><span>NEXT</span><strong>{next.number} {next.shortTitle}</strong></a> : <span />}
      </nav>
      <SiteFooter />
    </main>
  );
}
