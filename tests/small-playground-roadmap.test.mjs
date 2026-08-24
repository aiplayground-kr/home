import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("roadmap", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("small playground index presents programs 4 through 7", async () => {
  const response = await render("/small-playground");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /GitHub Copilot으로 만들면서 배우는 GitHub/);
  assert.match(html, /북토크: 언런/);
  assert.match(html, /Women Who Code × GitHub Copilot Dev Days/);
  assert.match(html, /Copilot으로 디자인이 가능하다고\?/);
  assert.match(html, /href="\/small-playground\/7"/);
});

test("program detail pages show the supplied schedule and audience", async () => {
  const [four, five, six, seven] = await Promise.all([
    render("/small-playground/4").then((response) => response.text()),
    render("/small-playground/5").then((response) => response.text()),
    render("/small-playground/6").then((response) => response.text()),
    render("/small-playground/7").then((response) => response.text()),
  ]);
  assert.match(four, /스킬/);
  assert.match(four, /배포/);
  assert.match(five, /2026\.10\.04/);
  assert.match(five, /오전 10:00–12:00/);
  assert.match(five, /김연지/);
  assert.match(six, /2026\.10\.10/);
  assert.match(six, /오후 4:00–7:00/);
  assert.match(six, /여성 엔지니어/);
  assert.match(six, /30명/);
  assert.match(six, /네트워킹/);
  assert.match(seven, /이미지 생성/);
  assert.match(seven, /이미지 편집/);
  assert.match(seven, /영상/);
});

test("GitHub Pages export includes the new program detail routes", async () => {
  const exporter = await readFile(new URL("../scripts/export-github-pages.mjs", import.meta.url), "utf8");
  assert.match(exporter, /"\/small-playground\/6"/);
  assert.match(exporter, /"\/small-playground\/7"/);
});
