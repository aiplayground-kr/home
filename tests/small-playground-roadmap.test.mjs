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
  assert.match(html, /GitHub Copilot Dev Days: 스페이스 인베이더 게임 만들며 배우는 GitHub Copilot 앱/);
  assert.match(html, /북토크: 언런/);
  assert.match(html, /Women Who Code × GitHub Copilot Dev Days/);
  assert.match(html, /Copilot으로 디자인이 가능하다고\?/);
  assert.match(html, /href="\/small-playground\/7"/);
});

test("placeholder posters use the four-tile Microsoft mark on index and detail", async () => {
  const [index, detail] = await Promise.all([
    render("/small-playground").then((response) => response.text()),
    render("/small-playground/5").then((response) => response.text()),
  ]);

  for (const html of [index, detail]) {
    const start = html.indexOf('class="ms-tile-mark"');
    assert.notEqual(start, -1);
    const mark = html.slice(start, html.indexOf("</div>", start));
    assert.equal((mark.match(/<i/g) ?? []).length, 4);
  }
});

test("program detail pages show the supplied schedule and audience", async () => {
  const [four, five, six, seven] = await Promise.all([
    render("/small-playground/4").then((response) => response.text()),
    render("/small-playground/5").then((response) => response.text()),
    render("/small-playground/6").then((response) => response.text()),
    render("/small-playground/7").then((response) => response.text()),
  ]);
  assert.match(four, /스페이스 인베이더/);
  assert.match(four, /Instructions/);
  assert.match(four, /MCP Server/);
  assert.match(four, /오후 3:00–5:00/);
  assert.match(five, /2026\.10\.04/);
    assert.match(five, /오전 10:00–12:00/);
    assert.match(five, /김연지/);
    const hero = five.slice(five.indexOf('class="detail-hero"'), five.indexOf('class="detail-content"'));
    const titleBlock = hero.slice(hero.indexOf('class="detail-title-block"'), hero.indexOf('class="detail-poster"'));
    assert.ok(titleBlock.indexOf('class="detail-number"') < titleBlock.indexOf("<h1>"));
    assert.ok(titleBlock.indexOf("<h1>") < titleBlock.indexOf('class="detail-description"'));
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

test("small playground detail hero gives the poster a prominent desktop size", async () => {
  const typography = await readFile(new URL("../app/typography.css", import.meta.url), "utf8");
  assert.match(typography, /\.small-detail-page \.detail-hero > \.program-cover[\s\S]*?width: min\(100%, 360px\);[\s\S]*?max-width: 360px;/);
});

test("small playground detail actions keep breathing room above the buttons", async () => {
  const css = await readFile(new URL("../app/typography.css", import.meta.url), "utf8");
  const rule = css.match(/\.small-detail-page \.detail-actions\s*\{([^}]*)\}/)?.[1] ?? "";
  const marginTop = Number(rule.match(/margin-top:\s*(\d+)px/)?.[1] ?? 0);
  assert.ok(marginTop >= 28, `expected at least 28px above detail actions, received ${marginTop}px`);
});
