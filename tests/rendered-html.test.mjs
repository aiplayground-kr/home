import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the official AI Playground home and discovery metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>AI놀이터 공식 사이트 \| 놀다 보면 알게 되는 AI<\/title>/);
  assert.match(html, /AI를 배우는 곳보다/);
  assert.match(html, /rel="describedby"[^>]+llms\.txt/);
  assert.match(html, /type="application\/ld\+json"/);
  assert.match(html, /"@type":"Organization"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/);
});

test("keeps obsolete starter-preview assets out of the production application", async () => {
  const [page, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /AI놀이터/);
  assert.match(layout, /metadataBase: new URL\("https:\/\/aiplayground-kr\.github\.io\/home\/"\)/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|_sites-preview/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});
