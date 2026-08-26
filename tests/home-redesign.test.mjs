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
  assert.match(html, /NOW PLAYING/);
  assert.match(html, /2026\.08\.27/);
  assert.match(html, /snowflake-world-tour-poster\.png/);
  assert.match(html, /Snowflake[\s\S]*World Tour/);
  assert.ok(html.indexOf("2026.08.27 THU") < html.indexOf("09.01 TUE"));
});

test("home small playground section is poster-led and links to event details", async () => {
  const response = await renderHome();
  const html = await response.text();
  assert.match(html, /class="small-program-poster/);
  assert.match(html, /small-playground\/03-github-copilot-dev-days\.png/);
  assert.match(html, /href="\/small-playground\/3"/);
  assert.match(html, /만들면서 배우는 GitHub Copilot/);
});

test("home Snowflake poster preserves its full aspect ratio", async () => {
  const css = await readFile(new URL("../app/home-refresh.css", import.meta.url), "utf8");
  assert.match(css, /\.hero-screen-snowflake img\{[^}]*height:auto;[^}]*object-fit:contain/);
  assert.doesNotMatch(css, /\.hero-screen-snowflake img\{[^}]*object-fit:cover/);
});
