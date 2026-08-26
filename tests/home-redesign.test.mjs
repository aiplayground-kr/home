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

test("home hero presents the AI Playground identity and current plays", async () => {
  const response = await renderHome();
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /class="hero-play-console/);
  assert.match(html, /UP NEXT/);
  assert.match(html, /NEXT SMALL PLAY/);
  assert.match(html, /03-github-copilot-dev-days\.png/);
  assert.match(html, /GitHub Copilot Dev Days/);
  const strip = html.slice(html.indexOf('class="hero-now-strip"'));
  assert.ok(strip.indexOf("2026.08.27") < strip.indexOf("2026.09.01"));
});

test("home upcoming rail shows three chronological events in a rolling live region", async () => {
  const response = await renderHome();
  const html = await response.text();
  const strip = html.slice(html.indexOf('class="hero-now-strip"'), html.indexOf('class="manifesto manifesto-v2'));
  const dates = [...strip.matchAll(/dateTime="([0-9-]+)"/g)].map((match) => match[1]);
  assert.equal(dates.length, 3);
  assert.deepEqual(dates, [...dates].sort());
  assert.match(strip, /class="hero-now-track"/);
  assert.match(strip, /aria-live="polite"/);
});

test("home console gives more space to its central screen", async () => {
  const css = await readFile(new URL("../app/home-refresh.css", import.meta.url), "utf8");
  assert.match(css, /\.hero-console-body\s*\{[^}]*grid-template-columns:\s*42px minmax\(0,1fr\) 50px/);
  assert.match(css, /\.hero-console-screen\s*\{[^}]*min-height:\s*300px/);
});

test("home small playground section is poster-led and links to event details", async () => {
  const response = await renderHome();
  const html = await response.text();
  assert.match(html, /class="small-program-poster/);
  assert.match(html, /small-playground\/03-github-copilot-dev-days\.png/);
  assert.match(html, /href="\/small-playground\/3"/);
  assert.match(html, /만들면서 배우는 GitHub Copilot/);
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

test("home manifesto turns the playground philosophy into three experience steps", async () => {
  const response = await renderHome();
  const html = await response.text();
  assert.match(html, /class="manifesto manifesto-v2 section-pad"/);
  assert.match(html, /class="manifesto-steps"/);
  for (const text of ["QUESTION", "PLAY", "SHARE", "편하게 질문하고", "직접 해보고", "함께 나눠요"]) {
    assert.match(html, new RegExp(text));
  }
});

test("home manifesto keeps the left rail concise so the main content can move left", async () => {
  const response = await renderHome();
  const html = await response.text();
  const intro = html.slice(html.indexOf('class="manifesto-intro"'), html.indexOf('class="manifesto-content"'));
  assert.match(intro, /WHY WE PLAY/);
  assert.doesNotMatch(intro, /PLAYGROUND PHILOSOPHY/);
});

test("home manifesto overrides the legacy direct-child grid so its message and steps stack", async () => {
  const css = await readFile(new URL("../app/home-refresh.css", import.meta.url), "utf8");
  assert.match(css, /\.manifesto-v2\s*>\s*\.manifesto-intro\s*\{[^}]*display:\s*flex/);
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
  assert.match(component, /upcoming\(smallEvents, today, 1\)/);
  assert.match(component, /upcoming\(timelineEvents, today, timelineEvents\.length\)/);
  assert.match(component, /Math\.ceil\(nextEvents\.length \/ 3\)/);
  assert.match(component, /slice\(rollIndex \* 3, rollIndex \* 3 \+ 3\)/);
  assert.match(component, /4_500/);
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

test("site footer echoes the bright hero palette", async () => {
  const css = await readFile(new URL("../app/footer.css", import.meta.url), "utf8");
  assert.match(css, /linear-gradient\(145deg, #f9fcff 0%, #eaf5fb/);
  assert.match(css, /linear-gradient\(90deg, var\(--blue\)/);
  assert.doesNotMatch(css, /#fff8e9|#f1e4cf/);
});
