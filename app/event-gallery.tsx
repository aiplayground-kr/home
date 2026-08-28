"use client";

import { useEffect, useRef, useState } from "react";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  label?: string;
};

type GalleryMode = "mosaic" | "slider" | "thumbnail-lightbox";

export function EventGallery({ title, items, eyebrow = "PHOTO ARCHIVE", emptyMessage = "행사 사진은 기록이 정리되는 대로 이곳에 업데이트됩니다.", mode = "mosaic" }: { title: string; items: GalleryItem[]; eyebrow?: string; emptyMessage?: string; mode?: GalleryMode }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const activeItem = items[activeIndex ?? 0];

  const closeLightbox = () => {
    setActiveIndex(null);
    requestAnimationFrame(() => openerRef.current?.focus());
  };

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => current === null ? 0 : (current + direction + items.length) % items.length);
  };

  const moveSlide = (direction: -1 | 1) => {
    const next = (slideIndex + direction + items.length) % items.length;
    setSlideIndex(next);
    const slider = sliderRef.current;
    const slide = slider?.children.item(next) as HTMLElement | null;
    if (slider && slide) slider.scrollTo({ left: slide.offsetLeft - slider.offsetLeft, behavior: "smooth" });
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    document.body.classList.add("gallery-lightbox-open");
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("gallery-lightbox-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  return <section className="event-gallery" aria-label={`${title} 갤러리`} data-gallery-mode={mode}>
    <div className="gallery-heading">
      <div><span>{eyebrow}</span><h2>{title}</h2></div>
      <strong>{String(items.length).padStart(2, "0")} CUTS</strong>
    </div>
    {items.length && mode === "slider" ? <>
      <div className="gallery-slider-controls">
        <button type="button" aria-label="이전 기록 이미지" onClick={() => moveSlide(-1)} disabled={items.length < 2}>←</button>
        <span>{String(slideIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
        <button type="button" aria-label="다음 기록 이미지" onClick={() => moveSlide(1)} disabled={items.length < 2}>→</button>
      </div>
      <div className="gallery-slider" ref={sliderRef} onScroll={(event) => {
        const slider = event.currentTarget;
        const slides = Array.from(slider.children) as HTMLElement[];
        const next = slides.reduce((closest, slide, index) =>
          Math.abs(slide.offsetLeft - slider.offsetLeft - slider.scrollLeft) < Math.abs(slides[closest].offsetLeft - slider.offsetLeft - slider.scrollLeft) ? index : closest, 0);
        setSlideIndex(next);
      }}>
        {items.map((item, index) => <figure key={`${item.src}-${index}`}>
          <img src={item.src} alt={item.alt} loading="lazy" />
          <figcaption><small>{item.label ?? `CUT ${String(index + 1).padStart(2, "0")}`}</small><span>{item.caption}</span></figcaption>
        </figure>)}
      </div>
    </> : items.length && mode === "thumbnail-lightbox" ? <>
      <div className="gallery-grid gallery-thumbnail-grid">
        {items.map((item, index) => <figure key={`${item.src}-${index}`}>
          <button className="gallery-thumbnail" type="button" aria-label={`${item.caption} 크게 보기`} onClick={(event) => {
            openerRef.current = event.currentTarget;
            setActiveIndex(index);
          }}>
            <img src={item.src} alt={item.alt} loading="lazy" />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        </figure>)}
      </div>
      <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${title} 큰 이미지 보기`} hidden={activeIndex === null} onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeLightbox();
      }}>
        <button className="gallery-lightbox-close" type="button" aria-label="큰 이미지 닫기" onClick={closeLightbox}>×</button>
        <button className="gallery-lightbox-nav previous" type="button" aria-label="이전 이미지" onClick={() => move(-1)}>‹</button>
        <figure>
          {activeItem && <img src={activeItem.src} alt={activeItem.alt} />}
          {activeItem && <figcaption><small>{activeItem.label ?? `CUT ${String((activeIndex ?? 0) + 1).padStart(2, "0")}`}</small><span>{activeItem.caption}</span><b>{String((activeIndex ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</b></figcaption>}
        </figure>
        <button className="gallery-lightbox-nav next" type="button" aria-label="다음 이미지" onClick={() => move(1)}>›</button>
      </div>
    </> : items.length ? <div className={`gallery-grid gallery-count-${Math.min(items.length, 4)}`}>
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
