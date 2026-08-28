import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function renderHome() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("home-redesign", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("home hero presents the AI Playground identity and current plays", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: new Date("2026-08-26T00:00:00+09:00") });
  const response = await renderHome();
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /class="hero-play-console/);
  assert.match(html, /UP NEXT/);
  assert.match(html, /NEXT PLAY/);
  assert.match(html, /snowflake-world-tour-poster\.png/);
  assert.match(html, /Snowflake × AI Playground/);
  const strip = html.slice(html.indexOf('class="hero-now-strip"'));
  assert.ok(strip.indexOf("2026.08.27") < strip.indexOf("2026.09.01"));
});

test("home upcoming rail keeps the three nearest events fixed", async () => {
  const response = await renderHome();
  const html = await response.text();
  const strip = html.slice(html.indexOf('class="hero-now-strip"'), html.indexOf('class="manifesto manifesto-v2'));
  const dates = [...strip.matchAll(/dateTime="([0-9-]+)"/g)].map((match) => match[1]);
  assert.equal(dates.length, 3);
  assert.deepEqual(dates, [...dates].sort());
  assert.match(strip, /class="hero-now-track"/);
  assert.doesNotMatch(strip, /aria-live="polite"/);
});

test("home console gives more space to its central screen", async () => {
  const css = await readFile(new URL("../app/home-refresh.css", import.meta.url), "utf8");
  assert.match(css, /\.hero-console-body\s*\{[^}]*grid-template-columns:\s*42px minmax\(0,1fr\) 50px/);
  assert.match(css, /\.hero-console-screen\s*\{[^}]*min-height:\s*300px/);
});

test("home console posters and placeholders share a non-overlapping two-column frame", async () => {
  const css = await readFile(new URL("../app/home-refresh.css", import.meta.url), "utf8");

  assert.match(css, /\.hero-screen-event\s*\{[^}]*grid-template-columns:\s*minmax\(0,\.82fr\) minmax\(0,1\.18fr\)/);
  assert.match(css, /\.hero-screen-event\s*>\s*\*\s*\{[^}]*min-width:\s*0/);
  assert.match(css, /\.hero-screen-placeholder\s*\{[^}]*width:\s*100%;[^}]*max-width:\s*150px;[^}]*min-width:\s*0;[^}]*min-height:\s*0/);
});

test("home console keeps poster and placeholder artwork on the same stage", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: new Date("2026-08-26T00:00:00+09:00") });
  const response = await renderHome();
  const html = await response.text();
  const css = await readFile(new URL("../app/home-refresh.css", import.meta.url), "utf8");

  assert.match(html, /class="hero-screen-media"[\s\S]*snowflake-world-tour-poster\.png/);
  assert.match(css, /\.hero-screen-media\s*\{[^}]*display:\s*grid;[^}]*place-items:\s*center;[^}]*width:\s*100%;[^}]*height:\s*230px/);
  assert.match(css, /\.hero-screen-media\s*>\s*img\s*\{[^}]*width:\s*100%;[^}]*height:\s*100%/);
  assert.match(css, /\.hero-screen-media\s*>\s*\.hero-screen-placeholder\s*\{[^}]*height:\s*100%/);
});

test("home console exposes all three rolling events as numbered controls", async () => {
  const response = await renderHome();
  const html = await response.text();
  const stage = html.slice(html.indexOf('class="hero-stage"'), html.indexOf('class="hero-now-strip"'));

  assert.match(stage, /role="tablist" aria-label="롤링 행사 선택"/);
  assert.equal((stage.match(/role="tab"/g) ?? []).length, 3);
  assert.equal((stage.match(/aria-selected="true"/g) ?? []).length, 1);
  for (const number of ["01", "02", "03"]) assert.match(stage, new RegExp(`>${number}<`));
});

test("home small playground section is poster-led and links to event details", async () => {
  const response = await renderHome();
  const html = await response.text();
  assert.match(html, /class="small-program-poster/);
  assert.match(html, /small-playground\/03-github-copilot-dev-days\.png/);
  assert.match(html, /href="\/small-playground\/3"/);
  assert.match(html, /스페이스 인베이더 × GitHub Copilot/);
});

test("home small playground orders the next programs by date and features the nearest one", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: new Date("2026-08-26T00:00:00+09:00") });
  const response = await renderHome();
  const html = await response.text();
  const showcase = html.slice(html.indexOf('class="small-program-showcase"'), html.indexOf('class="join join-v2'));
  const slugs = [...showcase.matchAll(/href="\/small-playground\/(\d+)"/g)].map((match) => match[1]);

  assert.deepEqual(slugs, ["3", "4", "5", "6", "7", "2", "1"]);
  assert.match(showcase, /class="small-program-card status-next featured" href="\/small-playground\/3"/);
});

test("home small playground advances the featured card after an event date passes", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: new Date("2026-09-02T00:00:00+09:00") });
  const response = await renderHome();
  const html = await response.text();
  const showcase = html.slice(html.indexOf('class="small-program-showcase"'), html.indexOf('class="join join-v2'));
  const slugs = [...showcase.matchAll(/href="\/small-playground\/(\d+)"/g)].map((match) => match[1]);

  assert.deepEqual(slugs, ["4", "5", "6", "7", "3", "2", "1"]);
  assert.match(showcase, /class="small-program-card status-next featured" href="\/small-playground\/4"/);
  assert.match(showcase, /class="small-program-card status-archive " href="\/small-playground\/3"/);
});

test("home small playground heading keeps its description and index action left-aligned together", async () => {
  const response = await renderHome();
  const html = await response.text();
  const heading = html.slice(html.indexOf('class="small-showcase-head"'), html.indexOf('class="small-program-showcase"'));
  assert.match(heading, /class="small-showcase-title-row"[\s\S]*작지만 진짜로 만들어보는[\s\S]*전체 프로그램 보기[\s\S]*큰 시즌 행사와 별개로 이어지는 실습 시리즈입니다\./);
});

test("home Season 1 archive shows all four event posters", async () => {
  const response = await renderHome();
  const html = await response.text();
  const stack = html.slice(html.indexOf('class="poster-stack"'), html.indexOf('시즌 1 기록 보기'));
  assert.equal((stack.match(/<img /g) ?? []).length, 4);
  for (const poster of ["01-ignite-after-party.png", "02-summer-meetup.png", "03-fall-meetup.png", "04-winter-meetup.png"]) {
    assert.match(stack, new RegExp(poster));
  }
});

test("home Season 2 panel uses a brighter Microsoft blue treatment", async () => {
  const css = await readFile(new URL("../app/home-refresh.css", import.meta.url), "utf8");
  assert.match(css, /\.season-panel\.current\s*\{[^}]*linear-gradient\([^}]*#145cc5/i);
  assert.match(css, /\.season-panel\.current::before\s*\{[^}]*#ffbf00/i);
  assert.match(css, /\.season-panel\.current \.mini-events a\s*\{[^}]*rgba\(255,\s*255,\s*255,\s*\.16\)/i);
});

test("home Season 2 panel links the overview and each event to their own pages", async () => {
  const response = await renderHome();
  const html = await response.text();
  const panel = html.slice(html.indexOf('class="season-panel current"'), html.indexOf('class="season-panel archive"'));

  assert.match(panel, /href="\/seasons\/season-2">시즌 2 자세히 보기/);
  assert.match(panel, /href="\/seasons\/season-2\/build"/);
  assert.match(panel, /href="\/seasons\/season-2\/snowflake"/);
});

test("home manifesto turns the playground philosophy into three experience steps", async () => {
  const response = await renderHome();
  const html = await response.text();
  assert.match(html, /class="manifesto manifesto-v2 section-pad"/);
  assert.match(html, /class="manifesto-steps"/);
  for (const text of ["QUESTION", "PLAY", "SHARE", "편하게 질문하고", "직접 해보고", "함께 나눠요"]) {
    assert.match(html, new RegExp(text));
  }
});

test("home manifesto places WHY WE PLAY above the title without a separate left rail", async () => {
  const response = await renderHome();
  const html = await response.text();
  const manifesto = html.slice(html.indexOf('class="manifesto manifesto-v2'), html.indexOf('class="season-preview'));
  const message = manifesto.slice(manifesto.indexOf('class="manifesto-message"'), manifesto.indexOf('class="manifesto-steps"'));
  assert.doesNotMatch(manifesto, /class="manifesto-intro"/);
  assert.ok(message.indexOf("WHY WE PLAY") < message.indexOf("설명보다 한 번의 경험이"));
  assert.ok(message.indexOf("설명보다 한 번의 경험이") < message.indexOf("누군가는 처음이라서"));
});

test("home manifesto uses the reclaimed rail space for one full-width content column", async () => {
  const css = await readFile(new URL("../app/home-refresh.css", import.meta.url), "utf8");
  assert.match(css, /\.manifesto-v2\s*\{[^}]*grid-template-columns:\s*1fr/);
  assert.doesNotMatch(css, /\.manifesto-v2\s*>\s*\.manifesto-intro\s*\{/);
  assert.match(css, /\.manifesto-v2\s*>\s*\.manifesto-content\s*\{[^}]*grid-template-columns:\s*1fr/);
  assert.match(css, /\.manifesto-message\s*\{[^}]*grid-template-columns:\s*1fr/);
  assert.match(css, /\.manifesto-message\s*>\s*p\s*\{[^}]*max-width:/);
});

test("home Snowflake poster preserves its full aspect ratio", async () => {
  const css = await readFile(new URL("../app/home-refresh.css", import.meta.url), "utf8");
  assert.match(css, /\.hero-screen-snowflake img\{[^}]*height:auto;[^}]*object-fit:contain/);
  assert.doesNotMatch(css, /\.hero-screen-snowflake img\{[^}]*object-fit:cover/);
});

test("home events advance automatically from the current Korea date", async () => {
  const component = await readFile(new URL("../app/home-event-console.tsx", import.meta.url), "utf8");
  assert.match(component, /timeZone: "Asia\/Seoul"/);
  assert.match(component, /event\.date >= today/);
  assert.match(component, /setInterval\([\s\S]*60_000/);
  assert.match(component, /upcoming\(timelineEvents, today, 3\)/);
  assert.match(component, /setActiveIndex\(\(index\) => \(index \+ 1\) % nextEvents\.length\)/);
  assert.match(component, /const activeEvent = nextEvents\[activeIndex\]/);
  assert.doesNotMatch(component, /slice\(rollIndex \* 3, rollIndex \* 3 \+ 3\)/);
  assert.match(component, /4_500/);
});

test("home console drops past official events from the next schedule", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: new Date("2026-08-28T00:00:00+09:00") });
  const response = await renderHome();
  const html = await response.text();
  const stage = html.slice(html.indexOf('class="hero-stage"'), html.indexOf('class="hero-now-strip"'));

  assert.match(stage, /href="\/small-playground\/3"/);
  assert.match(stage, /2026\.09\.01/);
  assert.doesNotMatch(stage, /snowflake-world-tour-poster/);
});

test("home Snowflake screen uses the smaller AI playground and Snowflake label", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: new Date("2026-08-26T00:00:00+09:00") });
  const response = await renderHome();
  const html = await response.text();
  const stage = html.slice(html.indexOf('class="hero-stage"'), html.indexOf('class="hero-now-strip"'));
  const css = await readFile(new URL("../app/home-refresh.css", import.meta.url), "utf8");
  assert.match(stage, /class="hero-screen-event hero-screen-snowflake"[\s\S]*<strong>AI놀이터 \+ Snowflake<\/strong>/);
  assert.match(css, /\.hero-screen-snowflake \.hero-screen-copy strong\s*\{[^}]*font-size:\s*clamp\(14px,\s*1\.4vw,\s*18px\)/);
});

test("home console uses the Microsoft logo below the screen", async () => {
  const response = await renderHome();
  const html = await response.text();
  assert.match(html, /class="hero-console-slot" aria-label="Microsoft"/);
  assert.match(html, /class="microsoft-mark"/);
  assert.match(html, />Microsoft<\/strong>/);
  assert.doesNotMatch(html, /INSERT CURIOSITY/);
});

test("home closes with an inclusive community invitation", async () => {
  const response = await renderHome();
  const html = await response.text();
  const join = html.slice(html.indexOf('class="join join-v2 section-pad"'), html.indexOf("<footer"));
  assert.match(join, /class="join join-v2 section-pad"/);
  assert.match(join, /호기심과 열정만 있다면/);
  assert.match(join, /누구나 함께할 수 있어요/);
  assert.match(join, /AI놀이터 커뮤니티 참여/);
  assert.doesNotMatch(join, /class="join-tags"/);
  assert.doesNotMatch(join, /class="join-play-card"/);
});

test("home offers the supplied sponsorship and promotion form immediately before joining", async () => {
  const response = await renderHome();
  const html = await response.text();
  const supportIndex = html.indexOf('class="support-opportunity section-pad"');
  const joinIndex = html.indexOf('class="join join-v2 section-pad"');

  assert.ok(supportIndex >= 0, "expected a sponsorship opportunity section");
  assert.ok(supportIndex < joinIndex, "expected sponsorship immediately before the join section");

  const support = html.slice(supportIndex, joinIndex);
  assert.match(support, /후원·홍보 협업/);
  assert.match(support, /href="https:\/\/forms\.cloud\.microsoft\/Pages\/ResponsePage\.aspx\?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__tX6uDRUOVM1NE1RUFFKOEk4QVVBOTlFWkFWTERTUi4u"/);
  assert.match(support, /target="_blank"/);
});

test("sponsorship background floats Microsoft symbols without affecting accessibility", async () => {
  const response = await renderHome();
  const html = await response.text();
  const supportIndex = html.indexOf('class="support-opportunity section-pad"');
  const joinIndex = html.indexOf('class="join join-v2 section-pad"');
  const support = html.slice(supportIndex, joinIndex);
  const css = await readFile(new URL("../app/home-refresh.css", import.meta.url), "utf8");

  assert.match(support, /class="support-logo-cloud" aria-hidden="true"/);
  assert.equal([...support.matchAll(/class="support-ms-mark"/g)].length, 6);
  assert.match(css, /@keyframes support-logo-float/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.support-ms-mark[\s\S]*animation:\s*none/);
});

test("site footer echoes the bright hero palette", async () => {
  const css = await readFile(new URL("../app/footer.css", import.meta.url), "utf8");
  assert.match(css, /linear-gradient\(145deg, #f9fcff 0%, #eaf5fb/);
  assert.match(css, /linear-gradient\(90deg, var\(--blue\)/);
  assert.doesNotMatch(css, /#fff8e9|#f1e4cf/);
});

test("site footer keeps its desktop height compact", async () => {
  const css = await readFile(new URL("../app/footer.css", import.meta.url), "utf8");
  assert.match(css, /\.site-footer\s*\{[^}]*padding-top:\s*30px;[^}]*padding-bottom:\s*30px;/);
  assert.match(css, /\.site-footer \.footer-brand-stack > img\s*\{[^}]*width:\s*180px;/);
  assert.match(css, /\.site-footer::after\s*\{[^}]*width:\s*210px;[^}]*height:\s*210px;/);
});
