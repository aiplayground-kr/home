import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.resolve(root, "_site");
const basePath = "/home";
const canonicalOrigin = "https://aiplayground-kr.github.io/home";
const routes = [
  "/",
  "/host",
  "/organization",
  "/seasons",
  "/seasons/season-1",
  "/seasons/season-1/ignite-after-party",
  "/seasons/season-1/summer-meetup",
  "/seasons/season-1/fall-meetup",
  "/seasons/season-1/winter-meetup",
  "/seasons/season-2",
  "/seasons/season-2/build",
  "/seasons/season-2/snowflake",
  "/small-playground",
  "/small-playground/1",
  "/small-playground/2",
  "/small-playground/3",
  "/small-playground/4",
  "/small-playground/5",
  "/small-playground/6",
  "/small-playground/7",
];

if (path.dirname(output) !== root || path.basename(output) !== "_site") {
  throw new Error(`Unexpected GitHub Pages output directory: ${output}`);
}

await mkdir(output, { recursive: true });
await cp(path.join(root, "public"), output, { recursive: true });
await mkdir(path.join(output, "_next"), { recursive: true });
await cp(path.join(root, "dist", "client", "_next", "static"), path.join(output, "_next", "static"), { recursive: true });

const workerUrl = pathToFileURL(path.join(root, "dist", "server", "index.js"));
workerUrl.searchParams.set("static-export", String(Date.now()));
const { default: worker } = await import(workerUrl.href);
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const context = { waitUntil() {}, passThroughOnException() {} };

function makeStatic(html, route) {
  const canonicalPath = route === "/" ? "/" : `${route}/`;
  const payloads = [];
  let firstPushBody = null;
  const placeholder = "<!--AI_PLAYGROUND_RSC_PAYLOAD-->";
  const pushPattern = /\.rsc\.push\(("(?:\\.|[^"\\])*")\)/;

  const withoutRscPushes = html.replace(/<script>([\s\S]*?)<\/script>/g, (script, body) => {
    const push = body.match(pushPattern);
    if (!push) return script;

    payloads.push(JSON.parse(push[1]));
    if (firstPushBody === null) {
      firstPushBody = body;
      return placeholder;
    }
    return "";
  });

  let staticHtml = rewriteAbsolutePaths(withoutRscPushes);

  if (firstPushBody !== null) {
    const payload = rewriteRscPayload(payloads.join(""));
    assertRscTextRecordLengths(payload, route);
    const pushBody = firstPushBody.replace(pushPattern, `.rsc.push(${JSON.stringify(payload)})`);
    staticHtml = staticHtml.replace(placeholder, `<script>${pushBody}</script>`);
  }

  return staticHtml.replace(
    "</head>",
    `<link rel="canonical" href="${canonicalOrigin}${canonicalPath}"><meta name="github-pages-base" content="${basePath}"></head>`,
  );
}

function rewriteAbsolutePaths(value) {
  return value
    .replace(/(["'`])\/(?!\/|>)/g, `$1${basePath}/`)
    .replaceAll("https://ai-noriter-season2.youni.chatgpt.site", canonicalOrigin);
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

  if (bytes !== byteLength) {
    throw new Error(`RSC text record ended in the middle of a UTF-8 character (${bytes}/${byteLength})`);
  }
  return index;
}

function rewriteRscPayload(payload) {
  const recordPattern = /([0-9a-f]+):T([0-9a-f]+),/g;
  let cursor = 0;
  let rewritten = "";
  let record;

  while ((record = recordPattern.exec(payload)) !== null) {
    rewritten += rewriteAbsolutePaths(payload.slice(cursor, record.index));

    const contentStart = record.index + record[0].length;
    const contentEnd = utf8EndIndex(payload, contentStart, Number.parseInt(record[2], 16));
    const content = rewriteAbsolutePaths(payload.slice(contentStart, contentEnd));
    rewritten += `${record[1]}:T${Buffer.byteLength(content).toString(16)},${content}`;

    cursor = contentEnd;
    recordPattern.lastIndex = contentEnd;
  }

  return rewritten + rewriteAbsolutePaths(payload.slice(cursor));
}

function assertRscTextRecordLengths(payload, route) {
  for (const record of payload.matchAll(/[0-9a-f]+:T([0-9a-f]+),/g)) {
    const contentStart = record.index + record[0].length;
    const contentEnd = utf8EndIndex(payload, contentStart, Number.parseInt(record[1], 16));
    if (!/^(?:[0-9a-f]+:|:[A-Z]|$)/.test(payload.slice(contentEnd))) {
      throw new Error(`Invalid RSC text record while exporting ${route}: ${record[0]}`);
    }
  }
}

for (const route of routes) {
  const response = await worker.fetch(new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }), env, context);
  if (!response.ok) throw new Error(`Static render failed for ${route}: ${response.status}`);
  const routeDirectory = route === "/" ? output : path.join(output, ...route.slice(1).split("/"));
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(path.join(routeDirectory, "index.html"), makeStatic(await response.text(), route), "utf8");
}

async function rewriteCss(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) await rewriteCss(target);
    if (entry.isFile() && entry.name.endsWith(".css")) {
      const css = await readFile(target, "utf8");
      await writeFile(target, css.replace(/url\((['"]?)\/(?!\/)/g, `url($1${basePath}/`), "utf8");
    }
  }
}

async function rewriteClientChunks(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) await rewriteClientChunks(target);
    if (entry.isFile() && /^(home-event-console|program-grid|event-gallery|season-event-components)-.*\.js$/.test(entry.name)) {
      const source = await readFile(target, "utf8");
      await writeFile(target, source.replace(/(["'`])\/(?!\/)/g, `$1${basePath}/`), "utf8");
    }
  }
}

await rewriteCss(path.join(output, "_next", "static", "css"));
await rewriteClientChunks(path.join(output, "_next", "static", "chunks"));
await writeFile(path.join(output, ".nojekyll"), "", "utf8");
await cp(path.join(output, "index.html"), path.join(output, "404.html"));
console.log(`Exported ${routes.length} routes to ${output}`);
