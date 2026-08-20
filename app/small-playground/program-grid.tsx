"use client";

import { useState } from "react";
import type { SmallPlaygroundProgram } from "./data";

export function ProgramGrid({ programs }: { programs: SmallPlaygroundProgram[] }) {
  const [filter, setFilter] = useState<"all" | "upcoming" | "archive">("all");
  const visible = programs.filter((p) => filter === "all" || (filter === "archive" ? p.status === "ARCHIVE" : p.status !== "ARCHIVE"));
  return <><div className="archive-toolbar"><p><strong>{visible.length}</strong>개의 프로그램</p><div role="group" aria-label="프로그램 상태 필터">
    <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>전체</button>
    <button className={filter === "upcoming" ? "active" : ""} onClick={() => setFilter("upcoming")}>진행 예정</button>
    <button className={filter === "archive" ? "active" : ""} onClick={() => setFilter("archive")}>아카이브</button>
  </div></div><div className="small-grid">{visible.map((p) => <a href={`/small-playground/${p.slug}`} key={p.slug}>
    <div className={`program-cover cover-${(Number(p.slug) % 4) + 1}`}><span>AI PLAYGROUND</span><b>{p.number}</b><small>SMALL PLAYGROUND</small><h2>{p.shortTitle}</h2><time>{p.date}</time></div>
    <div className="program-info"><span>{p.status}</span><h3>{p.title}</h3><p>{p.description}</p><b>자세히 보기</b></div>
  </a>)}</div></>;
}
