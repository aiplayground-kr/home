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
  return html
    .replace(/(["'`])\/(?!\/|>)/g, `$1${basePath}/`)
    .replaceAll("https://ai-noriter-season2.youni.chatgpt.site", canonicalOrigin)
    .replace("</head>", `<link rel="canonical" href="${canonicalOrigin}${canonicalPath}"><meta name="github-pages-base" content="${basePath}"></head>`);
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
