import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function renderSeasonTwo() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("season-two-calendar", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/seasons/season-2", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("Snowflake calendar keeps Google Calendar without the TimeTree action", async () => {
  const response = await renderSeasonTwo();
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /Google 캘린더/);
  assert.doesNotMatch(html, /TimeTree에 담기/);
  assert.doesNotMatch(html, /timetreeapp\.com\/calendars\/events\/new/);
});

test("BUILD season card shows the supplied official poster without people", async () => {
  const response = await renderSeasonTwo();
  const html = await response.text();
  const buildCard = html.slice(html.lastIndexOf("<article", html.indexOf('id="build"')), html.indexOf('id="snowflake"'));
  assert.match(buildCard, /class="build-card-poster"/);
  assert.match(buildCard, /events\/season-2\/build\/archive\/32\.png/);
  assert.match(buildCard, /2026년 6월 14일/);
});

test("Snowflake season card shows the official event poster", async () => {
  const response = await renderSeasonTwo();
  const html = await response.text();
  const snowflakeCard = html.slice(html.lastIndexOf("<article", html.indexOf('id="snowflake"')));
  assert.match(snowflakeCard, /class="build-card-poster snowflake-card-poster"/);
  assert.match(snowflakeCard, /events\/season-2\/snowflake\/snowflake-world-tour-poster\.png/);
  assert.match(snowflakeCard, /2026년 8월 27일 공식 포스터/);
  assert.doesNotMatch(snowflakeCard, /class="snow-console"/);
});

test("Season 2 event introductions stay within a compact two-line title scale", async () => {
  const css = await readFile(new URL("../app/season-two.css", import.meta.url), "utf8");
  assert.match(css, /\.event-list \.event-copy h2\s*\{[^}]*font-size:\s*clamp\(34px,\s*3\.4vw,\s*46px\)[^}]*text-wrap:\s*balance/s);
});
