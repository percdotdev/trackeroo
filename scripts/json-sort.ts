#!/usr/bin/env bun
/**
 * Sort all workspace package.json files.
 * Discovers packages/* and apps/* dynamically.
 * Usage: bun run scripts/json-sort.ts
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sortPackageJson from "sort-package-json";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function packageJsonPaths(base: string): string[] {
  const paths = [join(base, "package.json")];
  for (const dir of ["packages", "apps"]) {
    const dirPath = join(base, dir);
    if (!existsSync(dirPath)) {
      continue;
    }
    for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        paths.push(join(dirPath, entry.name, "package.json"));
      }
    }
  }
  return paths;
}

let exitCode = 0;
for (const file of packageJsonPaths(root)) {
  try {
    const original = readFileSync(file, "utf8");
    const sorted = sortPackageJson(original);
    if (sorted === original) {
      console.log(`${file} was already sorted.`);
    } else {
      writeFileSync(file, sorted);
      console.log(`${file} is sorted!`);
    }
  } catch (error) {
    console.error(`Failed to sort ${file}:`, error);
    exitCode = 1;
  }
}

process.exit(exitCode);
