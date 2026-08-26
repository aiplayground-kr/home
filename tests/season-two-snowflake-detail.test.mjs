import assert from "node:assert/strict";
import test from "node:test";

async function renderSnowflakeDetail() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("season-two-snowflake", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/seasons/season-2/snowflake", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("Snowflake detail flows from poster to host, sessions, and program", async () => {
  const response = await renderSnowflakeDetail();
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /class="season-event-cover cover-tone-snowflake"/);
  assert.match(html, /snowflake-world-tour-poster\.png/);
  assert.match(html, /SNOWFLAKE × MICROSOFT · SEOUL/);
  assert.match(html, /Snowflake World Tour에서[\s\S]*AI놀이터를 만나요/);
  assert.match(html, /2026년 8월 27일/);
  assert.match(html, /class="snowflake-host/);
  assert.match(html, /김성미/);
  assert.match(html, /host-sung-mi-kim-profile\.png/);
  assert.match(html, /class="snowflake-sessions/);
  assert.match(html, /class="snowflake-program/);
  assert.ok(html.indexOf("season-event-cover") < html.indexOf("snowflake-host"));
  assert.ok(html.indexOf("snowflake-host") < html.indexOf("snowflake-sessions"));
  assert.ok(html.indexOf("snowflake-sessions") < html.indexOf("snowflake-program"));
});

test("Snowflake detail publishes six sessions without a quiz action", async () => {
  const response = await renderSnowflakeDetail();
  const html = await response.text();
  assert.match(html, /class="snowflake-session-table"/);
  assert.equal((html.match(/<tr>/g) ?? []).length, 7);
  assert.match(html, /전대호/);
  assert.match(html, /진미나/);
  assert.match(html, /이재석/);
  assert.match(html, /허석/);
  assert.match(html, /이보라/);
  assert.match(html, /서동훈/);
  assert.match(html, /AI 퀴즈/);
  assert.match(html, /Lucky Draw/);
  assert.match(html, /MVP 특별 시연/);
  assert.doesNotMatch(html, /snowflake-program-link/);
  assert.doesNotMatch(html, /snowflake-ai-playground-quiz/);
  assert.doesNotMatch(html, /<iframe/);
  assert.doesNotMatch(html, /class="quiz-question/);
});

test("Snowflake session table shows a real portrait for every speaker", async () => {
  const response = await renderSnowflakeDetail();
  const html = await response.text();
  const sessions = html.slice(html.indexOf('class="snowflake-sessions"'), html.indexOf('class="snowflake-program"'));
  assert.equal((sessions.match(/class="snowflake-speaker-avatar(?: |")/g) ?? []).length, 6);
  assert.equal((sessions.match(/<img /g) ?? []).length, 6);
  assert.doesNotMatch(sessions, /class="snowflake-speaker-avatar"><span>/);
});
