import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");
let flattened = 0;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith("__next.")) {
        await flatten(fullPath);
      } else {
        await walk(fullPath);
      }
    }
  }
}

async function flatten(segmentDir) {
  const parent = path.dirname(segmentDir);
  const files = [];
  await collect(segmentDir, files);

  for (const file of files) {
    const relative = path.relative(parent, file);
    const flatName = relative.split(path.sep).join(".");
    await mkdir(parent, { recursive: true });
    await cp(file, path.join(parent, flatName));
    flattened += 1;
  }

  await rm(segmentDir, { recursive: true, force: true });
}

async function collect(dir, files) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await collect(fullPath, files);
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }
}

try {
  const outStats = await stat(outDir);
  if (!outStats.isDirectory()) throw new Error("out is not a directory");
  await walk(outDir);
  console.log(
    flattened === 0
      ? "RSC segment paths already flat; nothing to do."
      : `Flattened ${flattened} RSC segment file(s).`,
  );
} catch (error) {
  if (error.code === "ENOENT") {
    console.log("No static export found; skipping RSC segment flattening.");
  } else {
    throw error;
  }
}
