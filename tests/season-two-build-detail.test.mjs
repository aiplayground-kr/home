import assert from "node:assert/strict";
import test from "node:test";

async function renderBuildDetail() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("season-two-build", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/seasons/season-2/build", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("BUILD detail publishes the event facts and session schedule as a table", async () => {
  const response = await renderBuildDetail();
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /2026년 6월 14일/);
  assert.match(html, /class="build-session-table"/);
  assert.match(html, /Claw and Agent Harness/);
  assert.match(html, /Copilot Cowork로 업무 자동화/);
  assert.match(html, /GitHub Copilot 3종 기능/);
  assert.match(html, /송주현/);
  assert.match(html, /유승호/);
});

test("BUILD detail credits sponsors and shows the supplied sponsor board", async () => {
  const response = await renderBuildDetail();
  const html = await response.text();
  assert.match(html, /함께한 스폰서/);
  assert.match(html, /Microsoft/);
  assert.match(html, /GitHub/);
  assert.match(html, /빽다방/);
  assert.match(html, /PMI/);
  assert.match(html, /Eden House/);
  assert.match(html, /build\/build-sponsors\.png/);
});

test("BUILD detail restores event imagery and speaker LinkedIn links", async () => {
  const response = await renderBuildDetail();
  const html = await response.text();
  assert.match(html, /class="build-visual-story"/);
  for (const image of ["32", "33", "35", "37", "41", "46", "50"]) {
    assert.match(html, new RegExp(`build\/archive\/${image}\\.png`));
  }
  assert.match(html, /17(?:<!-- -->)? CUTS/);
  for (const profile of ["hoondong-kim", "canrobot", "learner-bora", "youngbinlee", "younni", "hahahaysh"]) {
    assert.match(html, new RegExp(`linkedin\\.com\\/in\\/${profile}`));
  }
});

test("BUILD section headings flow from label to title to description before the table", async () => {
  const response = await renderBuildDetail();
  const html = await response.text();
  const section = html.slice(html.indexOf('aria-labelledby="build-sessions-title"'), html.indexOf('class="build-sponsors"'));
  assert.ok(section.indexOf("TRACK 1 · JEJU ROOM") < section.indexOf("세션 일정"));
  assert.ok(section.indexOf("세션 일정") < section.indexOf("오후 1시부터 7개의 발표와 실습"));
  assert.ok(section.indexOf("오후 1시부터 7개의 발표와 실습") < section.indexOf('class="build-session-table"'));
});
