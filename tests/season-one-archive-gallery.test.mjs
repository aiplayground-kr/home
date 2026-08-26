import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("season-one-gallery", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("Season 1 record galleries use slides without repeating posters or profile photos", async () => {
  const response = await render("/seasons/season-1");
  const html = await response.text();
  const gallerySections = [...html.matchAll(/<section class="event-gallery"[\s\S]*?<\/section>/g)].map((match) => match[0]);
  const galleries = gallerySections.join("\n");

  assert.equal(response.status, 200);
  assert.equal(gallerySections.length, 4);
  assert.equal((galleries.match(/data-gallery-mode="slider"/g) ?? []).length, 4);
  assert.match(galleries, /class="gallery-slider"/);
  assert.match(galleries, /aria-label="이전 기록 이미지"/);
  assert.match(galleries, /aria-label="다음 기록 이미지"/);
  assert.match(galleries, /03-fall-gifts\.png/);
  assert.doesNotMatch(galleries, /0[1-4]-(?:ignite-after-party|summer-meetup|fall-meetup|winter-meetup)\.png/);
  assert.doesNotMatch(galleries, /feedback-(?:david-yoon|bora-lee|kate-baek)\.jpg|host-sung-mi-kim-current\.jpg/);
});

test("Season 1 detail gallery also uses only separately uploaded record photos", async () => {
  const response = await render("/seasons/season-1/fall-meetup");
  const html = await response.text();
  const gallery = html.slice(html.indexOf('class="event-gallery"'), html.indexOf('class="archive-detail-voice"'));

  assert.match(gallery, /data-gallery-mode="slider"/);
  assert.match(gallery, /03-fall-gifts\.png/);
  assert.doesNotMatch(gallery, /03-fall-meetup\.png|feedback-bora-lee\.jpg/);
});
