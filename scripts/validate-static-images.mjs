import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rootFlag = process.argv.indexOf("--root");
const root = rootFlag >= 0 ? path.resolve(process.argv[rootFlag + 1]) : scriptRoot;
const sourceExtensions = new Set([".css", ".js", ".jsx", ".ts", ".tsx"]);
const imageReference = /(["'`])(\/[^"'`]+?\.(?:avif|gif|jpe?g|png|svg|webp))(?:\?[^"'`]*)?\1/gi;
const references = new Map();

async function walk(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error?.code === "ENOENT") return;
    throw error;
  }

  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(target);
      continue;
    }
    if (!entry.isFile() || !sourceExtensions.has(path.extname(entry.name).toLowerCase())) continue;

    const source = await readFile(target, "utf8");
    for (const match of source.matchAll(imageReference)) {
      const image = decodeURI(match[2]);
      if (!references.has(image)) references.set(image, []);
      references.get(image).push(path.relative(root, target));
    }
  }
}

await walk(path.join(root, "app"));
await walk(path.join(root, "components"));

const missing = [];
for (const [image, sources] of references) {
  try {
    await access(path.join(root, "public", image.slice(1)));
  } catch {
    missing.push({ image, sources });
  }
}

if (missing.length) {
  console.error("Missing local image files:");
  for (const { image, sources } of missing) {
    console.error(`- ${image} (referenced by ${sources.join(", ")})`);
  }
  process.exitCode = 1;
} else {
  const suffix = references.size === 1 ? "" : "s";
  console.log(`Validated ${references.size} local image reference${suffix}.`);
}
