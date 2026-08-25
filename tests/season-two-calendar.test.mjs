import assert from "node:assert/strict";
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
