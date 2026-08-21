import assert from "node:assert/strict";
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
  assert.match(html, /NOW PLAYING/);
  assert.match(html, /2026\.08\.26/);
  assert.match(html, /2026\.08\.27/);
});

test("home small playground section is poster-led and links to event details", async () => {
  const response = await renderHome();
  const html = await response.text();
  assert.match(html, /class="small-program-poster/);
  assert.match(html, /small-playground\/03-copilot-homepage\.jpg/);
  assert.match(html, /href="\/small-playground\/3"/);
  assert.match(html, /나만의 에이전트 만들기/);
});
