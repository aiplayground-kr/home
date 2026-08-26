import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("subpage-intro", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("shared subpage banners carry the hero image and play-console motif", async () => {
  for (const pathname of ["/seasons", "/seasons/season-1", "/seasons/season-2", "/small-playground", "/organization", "/host"]) {
    const response = await render(pathname);
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.match(html, /class="page-intro page-intro-v2"/);
    assert.match(html, /class="page-intro-visual" aria-hidden="true"/);
    assert.match(html, /src="\/hero-orbits\.png"/);
    assert.match(html, /class="page-intro-console"/);
  }
});

test("subpage banner keeps the visual partial and responsive", async () => {
  const css = await readFile(new URL("../app/subpage-intro.css", import.meta.url), "utf8");
  assert.match(css, /\.page-intro-v2 \{[\s\S]*grid-template-columns:/);
  assert.match(css, /\.page-intro-visual \{[\s\S]*overflow: hidden;/);
  assert.match(css, /@media \(max-width: 700px\)[\s\S]*\.page-intro-visual \{ position: absolute;/);
});
