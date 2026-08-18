"use client";

import { useEffect, useRef } from "react";

export function ScrollInteractions() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );
    revealItems.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${(index % 3) * 90}ms`);
      observer.observe(item);
    });

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      progressRef.current?.style.setProperty("transform", `scaleX(${ratio})`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const cleanups: Array<() => void> = [];
    if (!reduceMotion) {
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((element) => {
        const move = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          element.style.setProperty("--px", `${x * 22}px`);
          element.style.setProperty("--py", `${y * 18}px`);
        };
        const leave = () => {
          element.style.setProperty("--px", "0px");
          element.style.setProperty("--py", "0px");
        };
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", leave);
        cleanups.push(() => { element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", leave); });
      });

      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((element) => {
        const move = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          element.style.setProperty("--tilt-x", `${((event.clientY - rect.top) / rect.height - 0.5) * -5}deg`);
          element.style.setProperty("--tilt-y", `${((event.clientX - rect.left) / rect.width - 0.5) * 6}deg`);
        };
        const leave = () => { element.style.setProperty("--tilt-x", "0deg"); element.style.setProperty("--tilt-y", "0deg"); };
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", leave);
        cleanups.push(() => { element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", leave); });
      });

      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((element) => {
        const move = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          element.style.setProperty("--mx", `${(event.clientX - rect.left - rect.width / 2) * 0.1}px`);
          element.style.setProperty("--my", `${(event.clientY - rect.top - rect.height / 2) * 0.1}px`);
        };
        const leave = () => { element.style.setProperty("--mx", "0px"); element.style.setProperty("--my", "0px"); };
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", leave);
        cleanups.push(() => { element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", leave); });
      });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return <div className="scroll-progress" ref={progressRef} aria-hidden="true" />;
}
