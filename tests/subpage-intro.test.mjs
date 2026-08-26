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

test("shared subpage banners use the hero image without the play-console illustration", async () => {
  for (const pathname of ["/seasons", "/seasons/season-1", "/seasons/season-2", "/small-playground", "/organization", "/host"]) {
    const response = await render(pathname);
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.match(html, /class="page-intro page-intro-v2"/);
    assert.match(html, /class="page-intro-visual" aria-hidden="true"/);
    assert.match(html, /src="\/hero-orbits\.png"/);
    assert.doesNotMatch(html, /class="page-intro-console"/);
    assert.doesNotMatch(html, /page-intro-(?:dpad|screen|buttons)/);
  }
});

test("subpage banner uses the hero image as a full background without the decorative ring", async () => {
  const css = await readFile(new URL("../app/subpage-intro.css", import.meta.url), "utf8");
  assert.doesNotMatch(css, /\.page-intro-v2::before\s*\{/);
  assert.match(css, /\.page-intro-visual\s*\{[\s\S]*?position:\s*absolute;[\s\S]*?inset:\s*0;/);
  assert.match(css, /\.page-intro-visual\s*>\s*img\s*\{[\s\S]*?width:\s*100%;[\s\S]*?height:\s*100%;[\s\S]*?object-fit:\s*cover;/);
  assert.match(css, /\.page-intro-visual::after\s*\{[\s\S]*?linear-gradient\(90deg,/);
});
