import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function renderHost() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("host-photo", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/host", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("host page presents Sung Mi Kim with the supplied portrait", async () => {
  const response = await renderHost();
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /class="host-photo-card"/);
  assert.match(html, /src="\/host-sung-mi-kim-profile\.png"/);
  assert.match(html, /alt="김성미 AI놀이터 모임장 프로필 사진"/);
  assert.doesNotMatch(html, /프로필 사진은 LinkedIn 공식 이미지 확인 후 반영합니다/);
});

test("host portrait styling preserves the face-centered crop", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.host-photo-card\s*>\s*img/);
  assert.match(css, /object-fit:\s*cover/);
  assert.match(css, /object-position:\s*50%\s+40%/);
});
