import assert from "node:assert/strict";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const validator = fileURLToPath(new URL("../scripts/validate-static-images.mjs", import.meta.url));

async function fixture(source, images = []) {
  const root = await mkdtemp(path.join(os.tmpdir(), "ai-playground-images-"));
  await mkdir(path.join(root, "app"), { recursive: true });
  await mkdir(path.join(root, "public", "images"), { recursive: true });
  await writeFile(path.join(root, "app", "page.tsx"), source, "utf8");
  for (const image of images) {
    await writeFile(path.join(root, "public", "images", image), "image", "utf8");
  }
  return root;
}

function validate(root) {
  return spawnSync(process.execPath, [validator, "--root", root], {
    encoding: "utf8",
  });
}

test("fails the build when a referenced local image is missing", async () => {
  const root = await fixture('export default () => <img src="/images/missing.png" />;');
  const result = validate(root);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /images\/missing\.png/);
});

test("passes when every referenced local image exists", async () => {
  const root = await fixture('export default () => <img src="/images/present.png" />;', ["present.png"]);
  const result = validate(root);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Validated 1 local image reference/);
});
