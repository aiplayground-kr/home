import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

function collectRscPayload(html) {
  return [...html.matchAll(/\.rsc\.push\(("(?:\\.|[^"\\])*")\)/g)]
    .map((match) => JSON.parse(match[1]))
    .join("");
}

function utf8EndIndex(value, start, byteLength) {
  let bytes = 0;
  let index = start;

  while (index < value.length && bytes < byteLength) {
    const codePoint = value.codePointAt(index);
    const character = String.fromCodePoint(codePoint);
    bytes += Buffer.byteLength(character);
    index += character.length;
  }

  assert.equal(bytes, byteLength, "RSC text record ended in the middle of a UTF-8 character");
  return index;
}

async function findHtmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await findHtmlFiles(target));
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(target);
  }
  return files;
}

test("GitHub Pages HTML preserves React RSC text-record byte lengths", async () => {
  const siteDirectory = fileURLToPath(new URL("../_site/", import.meta.url));
  const htmlFiles = await findHtmlFiles(siteDirectory);
  let recordCount = 0;

  assert.ok(htmlFiles.length >= 20, "expected every exported route to produce HTML");

  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, "utf8");
    const payload = collectRscPayload(html);
    const records = [...payload.matchAll(/[0-9a-f]+:T([0-9a-f]+),/g)];
    recordCount += records.length;

    for (const record of records) {
      const contentStart = record.index + record[0].length;
      const contentEnd = utf8EndIndex(payload, contentStart, Number.parseInt(record[1], 16));
      assert.match(
        payload.slice(contentEnd),
        /^(?:[0-9a-f]+:|:[A-Z]|$)/,
        `${htmlFile}: RSC text record ${record[0]} must end at the next Flight record boundary`,
      );
    }
  }

  assert.ok(recordCount > 0, "expected exported pages to contain length-prefixed RSC text records");
});
