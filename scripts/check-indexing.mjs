import fs from "node:fs";
import path from "node:path";

const outDir = "out";
const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function read(file) {
  return fs.readFileSync(path.join(outDir, file), "utf8");
}

function htmlPathForUrl(url) {
  const pathname = decodeURIComponent(new URL(url).pathname);
  if (pathname === "/") return "index.html";
  return path.join(pathname.replace(/^\//, ""), "index.html");
}

if (!fs.existsSync(outDir)) {
  console.error("No out/ directory. Run npm run build first.");
  process.exit(1);
}

const sitemap = read("sitemap.xml");
const originMatch = /<loc>(https?:\/\/[^/<]+)/.exec(sitemap);
const origin = originMatch?.[1];

if (!origin) {
  fail("Could not determine the site origin from out/sitemap.xml.");
} else if (/localhost|127\.0\.0\.1|your-domain\.example/i.test(origin)) {
  fail(
    `Sitemap origin is ${origin}. Set NEXT_PUBLIC_SITE_URL to the final HTTPS domain and rebuild before requesting indexing.`,
  );
}

const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (locs.length !== new Set(locs).size) fail("Sitemap contains duplicate URLs.");
if (locs.length < 40) fail(`Sitemap has only ${locs.length} URLs; expected at least 40.`);

const titles = new Map();
const descriptions = new Map();

for (const loc of locs) {
  const file = htmlPathForUrl(loc);
  if (!fs.existsSync(path.join(outDir, file))) {
    fail(`Sitemap URL has no static file: ${loc} -> ${file}`);
    continue;
  }

  const html = read(file);
  const canonical = /rel="canonical" href="([^"]+)"/.exec(html)?.[1];
  const ogUrl = /property="og:url" content="([^"]+)"/.exec(html)?.[1];
  const title = /<title>([^<]+)<\/title>/.exec(html)?.[1];
  const description = /<meta name="description" content="([^"]*)"/.exec(html)?.[1];
  const noindex = /<meta name="robots" content="[^"]*noindex/i.test(html);

  if (!canonical) fail(`Missing canonical: ${loc}`);
  else if (canonical !== loc) fail(`Canonical mismatch: ${loc} -> ${canonical}`);
  if (!ogUrl) fail(`Missing og:url: ${loc}`);
  else if (ogUrl !== canonical) fail(`og:url mismatch: ${loc} -> ${ogUrl}`);
  if (!title) fail(`Missing title: ${loc}`);
  if (!description) fail(`Missing meta description: ${loc}`);
  if (noindex) fail(`Indexable page is noindex: ${loc}`);

  for (const block of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      JSON.parse(block[1]);
    } catch {
      fail(`Invalid JSON-LD: ${loc}`);
    }
  }

  if (title) {
    const previous = titles.get(title);
    if (previous) fail(`Duplicate title: ${loc} and ${previous}`);
    else titles.set(title, loc);
  }
  if (description) {
    const previous = descriptions.get(description);
    if (previous) fail(`Duplicate description: ${loc} and ${previous}`);
    else descriptions.set(description, loc);
  }
}

const robots = read("robots.txt");
if (/noindex/i.test(robots)) fail("robots.txt contains noindex.");
if (origin && !robots.includes(`Sitemap: ${origin}/sitemap.xml`)) {
  fail("robots.txt does not point at the canonical sitemap URL.");
}

const feed = read("feed.xml");
if (origin) {
  const itemLinks = [...feed.matchAll(/<link>([^<]+)<\/link>/g)].map((match) => match[1]);
  const offOrigin = itemLinks.filter((link) => !link.startsWith(`${origin}/`));
  if (offOrigin.length > 0) fail(`RSS has ${offOrigin.length} off-origin links.`);
}

if (!fs.existsSync(path.join(outDir, "404.html"))) {
  fail("Missing 404.html.");
} else if (!/noindex/i.test(read("404.html"))) {
  warnings.push("404.html is not marked noindex.");
}

for (const warning of warnings) console.warn(`WARN ${warning}`);

if (errors.length > 0) {
  for (const error of errors) console.error(`FAIL ${error}`);
  console.error(`\nIndexing check failed with ${errors.length} problem(s).`);
  process.exit(1);
}

console.log(`Indexing check passed: ${locs.length} canonical URLs, ${titles.size} unique titles.`);
