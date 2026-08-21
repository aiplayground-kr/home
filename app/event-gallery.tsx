export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  label?: string;
};

export function EventGallery({ title, items, emptyMessage = "행사 사진은 기록이 정리되는 대로 이곳에 업데이트됩니다." }: { title: string; items: GalleryItem[]; emptyMessage?: string }) {
  return <section className="event-gallery" aria-label={`${title} 갤러리`}>
    <div className="gallery-heading">
      <div><span>PHOTO ARCHIVE</span><h2>{title}</h2></div>
      <strong>{String(items.length).padStart(2, "0")} CUTS</strong>
    </div>
    {items.length ? <div className={`gallery-grid gallery-count-${Math.min(items.length, 4)}`}>
      {items.map((item, index) => <figure key={`${item.src}-${index}`}>
        <a href={item.src} target="_blank" rel="noreferrer" aria-label={`${item.caption} 원본 이미지 열기`}>
          <img src={item.src} alt={item.alt} loading="lazy" />
          <span>크게 보기 ↗</span>
        </a>
        <figcaption><small>{item.label ?? `CUT ${String(index + 1).padStart(2, "0")}`}</small>{item.caption}</figcaption>
      </figure>)}
    </div> : <div className="gallery-empty"><span aria-hidden="true">+</span><div><strong>NEXT PHOTO DROP</strong><p>{emptyMessage}</p></div></div>}
  </section>;
}
