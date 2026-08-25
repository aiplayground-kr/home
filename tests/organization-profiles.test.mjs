import assert from "node:assert/strict";
import test from "node:test";

async function renderOrganization() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("organization-profiles", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/organization", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("organization page shows verified public profile portraits and LinkedIn links", async () => {
  const response = await renderOrganization();
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /class="steering-people"/);
  assert.match(html, /src="\/host-sung-mi-kim-profile\.png"/);
  assert.match(html, /src="\/team\/jonghoon-moon\.jpg"/);
  assert.match(html, /src="\/team\/mina-jin\.jpg"/);
  assert.match(html, /src="\/team\/huh-seok\.jpg"/);
  assert.match(html, /src="\/team\/jonghyeok-lee\.jpg"/);
  assert.match(html, /src="\/team\/miyoung-youn\.jpg"/);
  assert.match(html, /linkedin\.com\/in\/hwanhee-lee-it-manager/);
  assert.match(html, /linkedin\.com\/in\/jonghyeok-lee424/);
  assert.match(html, /linkedin\.com\/in\/younni/);
  assert.match(html, /linkedin\.com\/in\/canrobot/);
  assert.match(html, /aria-label="문종훈 LinkedIn 프로필 열기"/);
  assert.match(html, /Microsoft 365 Copilot MVP/);
  assert.match(html, /AI 커뮤니티 행사 운영/);
});
