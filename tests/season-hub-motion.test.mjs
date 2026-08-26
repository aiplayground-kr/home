import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function renderSeasons() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("season-bubbles", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/seasons", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("season cards contain Microsoft-color bubble layers", async () => {
  const response = await renderSeasons();
  const html = await response.text();
  assert.equal(response.status, 200);
  const hub = html.slice(html.indexOf('class="hub-grid'), html.indexOf('class="separate-banner'));
  assert.equal((hub.match(/class="season-bubbles"/g) ?? []).length, 2);
  assert.equal((hub.match(/<i><\/i>/g) ?? []).length, 32);
});

test("season bubbles drop on hover and respect reduced motion", async () => {
  const css = await readFile(new URL("../app/season-hub-motion.css", import.meta.url), "utf8");
  assert.match(css, /@keyframes season-bubble-drop/);
  assert.match(css, /\.hub-card:hover \.season-bubbles i/);
  assert.match(css, /\.hub-card:focus-visible \.season-bubbles i/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  for (const color of ["20,92,197", "120,190,32", "255,191,0", "255,91,53"]) assert.match(css, new RegExp(color));
});
