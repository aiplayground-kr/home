"use client";

import { useEffect, useState } from "react";
import { smallPlaygroundPrograms } from "./small-playground/data";

type HomeEvent = {
  date: string;
  href: string;
  label: string;
  title: string;
  subtitle: string;
  number?: string;
  image?: string;
};

const officialEvents: HomeEvent[] = [
  {
    date: "2026-08-27",
    href: "/seasons/season-2/snowflake",
    label: "SEASON 2",
    title: "Season 2",
    subtitle: "Snowflake × AI Playground",
  },
];

const smallEvents: HomeEvent[] = smallPlaygroundPrograms
  .filter((program) => /^\d{4}\.\d{2}\.\d{2}$/.test(program.date))
  .map((program) => ({
    date: program.date.replaceAll(".", "-"),
    href: `/small-playground/${program.slug}`,
    label: `SMALL PLAYGROUND · ${program.number}`,
    title: `작은 놀이터 ${program.number}`,
    subtitle: program.shortTitle,
    number: program.number,
    image: program.image,
  }))
  .sort((a, b) => a.date.localeCompare(b.date));

const timelineEvents = [...officialEvents, ...smallEvents].sort((a, b) => a.date.localeCompare(b.date));

function koreaDateKey(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

function useKoreaToday() {
  const [today, setToday] = useState(koreaDateKey);
  useEffect(() => {
    const timer = window.setInterval(() => setToday(koreaDateKey()), 60_000);
    return () => window.clearInterval(timer);
  }, []);
  return today;
}

function weekday(date: string) {
  return new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "Asia/Seoul" })
    .format(new Date(`${date}T00:00:00+09:00`))
    .toUpperCase();
}

function displayDate(date: string, includeYear = false) {
  const [year, month, day] = date.split("-");
  return `${includeYear ? `${year}.` : ""}${month}.${day}`;
}

function upcoming(events: HomeEvent[], today: string, count: number) {
  const future = events.filter((event) => event.date >= today);
  return (future.length ? future : events.slice(-count)).slice(0, count);
}

export function HomeEventStage() {
  const today = useKoreaToday();
  const nextSmall = upcoming(smallEvents, today, 1)[0];
  if (!nextSmall) return null;

  const coverNumber = Number(nextSmall.number?.replace("#", "")) || 1;
  return (
    <div className="hero-stage" aria-label="가장 가까운 다음 작은 놀이터">
      <div className="hero-orbit orbit-one" aria-hidden="true" /><div className="hero-orbit orbit-two" aria-hidden="true" />
      <article className="hero-play-console">
        <div className="hero-console-top"><span>AI PLAYGROUND</span><b><i /> PLAY MODE</b></div>
        <div className="hero-console-body">
          <div className="hero-console-left" aria-hidden="true"><span /><span /></div>
          <div className="hero-console-screen">
            <div className="hero-screen-meta"><strong>NEXT SMALL PLAY</strong><time dateTime={nextSmall.date}>{displayDate(nextSmall.date, true)}</time></div>
            <a href={nextSmall.href} className="hero-screen-event hero-screen-small">
              {nextSmall.image ? (
                <img src={nextSmall.image} alt={`${nextSmall.title} 공식 포스터`} />
              ) : (
                <div className={`hero-screen-placeholder cover-${((coverNumber - 1) % 4) + 1}`} aria-hidden="true">
                  <span>AI PLAYGROUND</span><b>{nextSmall.number}</b><small>SMALL PLAYGROUND</small><strong>{nextSmall.subtitle}</strong>
                </div>
              )}
              <div className="hero-screen-copy"><span>{nextSmall.label}</span><strong>{nextSmall.subtitle}</strong><small>게임 시작하기 →</small></div>
            </a>
          </div>
          <div className="hero-console-buttons" aria-hidden="true"><i /><i /><i /><i /></div>
        </div>
        <div className="hero-console-slot" aria-label="Microsoft">
          <span className="microsoft-mark" aria-hidden="true"><i /><i /><i /><i /></span>
          <strong>Microsoft</strong>
        </div>
      </article>
      <a className="hero-floating-date" href={nextSmall.href}><span>{nextSmall.label}</span><strong>{displayDate(nextSmall.date)}</strong><small>{weekday(nextSmall.date)} · NEXT PLAY →</small></a>
    </div>
  );
}

export function HomeEventStrip() {
  const today = useKoreaToday();
  const nextEvents = upcoming(timelineEvents, today, 3);
  return (
    <div className="hero-now-strip" aria-label="다가오는 AI놀이터 일정">
      <span className="now-strip-label"><i /> UP NEXT</span>
      {nextEvents.map((event) => (
        <a href={event.href} key={`${event.date}-${event.href}`}>
          <time dateTime={event.date}>{displayDate(event.date, true)} {weekday(event.date)}</time>
          <strong>{event.title}</strong>
          <span>{event.subtitle}</span>
        </a>
      ))}
    </div>
  );
}
