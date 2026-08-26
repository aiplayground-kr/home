import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const siteUrl = "https://aiplayground-kr.github.io/home";

async function text(path) {
  return readFile(new URL(path, root), "utf8");
}

test("publishes official AI Playground discovery files for search and LLMs", async () => {
  const [layout, llms, llmAlias, llmsFull, robots, sitemap] = await Promise.all([
    text("app/layout.tsx"),
    text("public/llms.txt"),
    text("public/llm.txt"),
    text("public/llms-full.txt"),
    text("public/robots.txt"),
    text("public/sitemap.xml"),
  ]);

  assert.match(layout, /https:\/\/aiplayground-kr\.github\.io\/home/);
  assert.match(layout, /application\/ld\+json/);
  assert.match(layout, /"@type": "Organization"/);
  assert.match(layout, /AI놀이터 공식 사이트/);
  assert.match(layout, /rel="describedby"/);
  assert.match(layout, /href=\{`\$\{siteUrl\}\/llms\.txt`\}/);

  assert.match(llms, /^# AI놀이터/m);
  assert.match(llms, /> AI놀이터의 공식 웹사이트/);
  assert.match(llms, /## 공식 행사/);
  assert.match(llms, /\[시즌 2 Snowflake/);
  assert.equal(llmAlias, llms);
  assert.match(llmsFull, /# AI놀이터 공식 사이트 전체 안내/);
  assert.match(llmsFull, /Microsoft Korea/);

  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Allow: \//);
  assert.match(robots, new RegExp(`Sitemap: ${siteUrl.replaceAll("/", "\\/")}\\/sitemap\\.xml`));

  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.equal(locations.length, 20);
  assert.equal(locations[0], `${siteUrl}/`);
  assert.ok(locations.includes(`${siteUrl}/seasons/season-2/snowflake/`));
  assert.ok(locations.includes(`${siteUrl}/small-playground/7/`));
});

test("GitHub Pages export uses the lowercase project path and a non-destructive output", async () => {
  const [exportScript, workflow] = await Promise.all([
    text("scripts/export-github-pages.mjs"),
    text(".github/workflows/deploy-pages.yml"),
  ]);

  assert.match(exportScript, /const basePath = "\/home"/);
  assert.match(exportScript, /const output = path\.resolve\(root, "_site"\)/);
  assert.match(exportScript, /canonicalOrigin = "https:\/\/aiplayground-kr\.github\.io\/home"/);
  assert.doesNotMatch(exportScript, /rm\(output, \{ recursive: true/);
  assert.doesNotMatch(exportScript, /<script\\b\[\^>\]\*>/);
  assert.match(exportScript, /dist", "client", "_next", "static"/);
  assert.match(exportScript, /rewriteClientChunks/);
  assert.match(workflow, /npm run build:github-pages/);
  assert.match(workflow, /path: _site/);
  assert.match(workflow, /actions\/upload-pages-artifact@v4/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
});
