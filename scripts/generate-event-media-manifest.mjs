import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const eventsRoot = path.join(root, "public", "events");
const output = path.join(root, "app", "generated", "event-media.ts");
const imagePattern = /\.(?:avif|gif|jpe?g|png|webp)$/i;
const folders = {};

async function visit(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const images = entries.filter((entry) => entry.isFile() && imagePattern.test(entry.name));
  if (images.length && ["archive", "gallery"].includes(path.basename(directory).toLowerCase())) {
    const key = path.relative(eventsRoot, directory).replaceAll("\\", "/");
    folders[key] = images
      .map((entry) => `/events/${key}/${entry.name}`)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }
  await Promise.all(entries.filter((entry) => entry.isDirectory()).map((entry) => visit(path.join(directory, entry.name))));
}

await visit(eventsRoot);
await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, `/* Generated from archive and gallery folders under public/events. Add images there and run npm run build. */\nexport const eventMediaByFolder = ${JSON.stringify(folders, null, 2)} as const;\n`, "utf8");
console.log(`Generated event media manifest for ${Object.keys(folders).length} folder(s).`);
