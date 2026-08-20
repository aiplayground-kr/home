import { smallPlaygroundPrograms } from "./data";
import { PageIntro, SiteFooter, SiteHeader } from "../site-shell";
import { ProgramGrid } from "./program-grid";

export default function SmallPlaygroundPage() { return <main><SiteHeader />
  <PageIntro eyebrow="SMALL PLAYGROUND · OFFICIAL SERIES" title="작게 모여, 한 가지를 깊게" description="시즌 행사와 별개로 계속 확장되는 공식 시리즈입니다. 번호별 포스터와 프로그램 기록을 각각 열어보세요." />
  <section className="small-archive section-pad compact"><ProgramGrid programs={smallPlaygroundPrograms} /></section><SiteFooter /></main> }
