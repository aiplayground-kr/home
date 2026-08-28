import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("space-invaders", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("small playground 4 publishes the confirmed Space Invaders event", async () => {
  const response = await render("/small-playground/4");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /스페이스 인베이더/);
  assert.match(html, /GitHub Copilot 앱/);
  assert.match(html, /2026\.09\.12/);
  assert.match(html, /오후 3:00–5:00/);
  assert.match(html, /한국마이크로소프트 13층/);
  assert.match(html, /허석 Microsoft MVP/);
  assert.match(html, /Instructions/);
  assert.match(html, /MCP Server/);
  assert.match(html, /small-playground\/04-space-invaders\.webp/);
});

test("home console advances from small playground 3 to 4 by Korea date", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: new Date("2026-09-02T00:00:00+09:00") });
  const response = await render("/");
  const html = await response.text();
  const stage = html.slice(html.indexOf('class="hero-stage"'), html.indexOf('class="hero-now-strip"'));

  assert.match(stage, /href="\/small-playground\/4"/);
  assert.match(stage, /2026\.09\.12/);
  assert.match(stage, /small-playground\/04-space-invaders\.webp/);
  assert.doesNotMatch(stage, /snowflake-world-tour-poster/);
});
