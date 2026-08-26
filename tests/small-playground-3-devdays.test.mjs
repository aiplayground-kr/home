import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("devdays", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("home promotes the updated small playground 3 Dev Days poster", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /small-playground\/03-github-copilot-dev-days\.png/);
  assert.match(html, /2026\.09\.01/);
  assert.match(html, /GitHub Copilot Dev Days/);
  assert.doesNotMatch(html, /2026\.08\.26/);
});

test("small playground 3 detail shows the revised event facts", async () => {
  const response = await render("/small-playground/3");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /GitHub Copilot Dev Days/);
  assert.match(html, /2026\.09\.01/);
  assert.match(html, /오후 7:30–9:30/);
  assert.match(html, /Microsoft Korea 13층/);
  assert.match(html, /전대호 Microsoft MVP/);
  assert.match(html, /small-playground\/03-github-copilot-dev-days\.png/);
  const hero = html.slice(html.indexOf('class="detail-hero"'), html.indexOf('class="detail-content"'));
  assert.ok(hero.indexOf('class="detail-status"') < hero.indexOf('class="detail-number"'));
  assert.ok(hero.indexOf('class="detail-number"') < hero.indexOf("<h1>"));
  const story = html.indexOf('class="detail-story"');
  const speakers = html.indexOf('class="small-speakers"');
  assert.ok(speakers > story);
  assert.match(html, /class="small-speaker-card"/);
  assert.match(html, /src="\/team\/daeho-jeon\.jpg"/);
  assert.match(html, /linkedin\.com\/in\/canrobot/);
  assert.match(html, /전대호 LinkedIn 프로필 열기/);
});
