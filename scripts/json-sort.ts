#!/usr/bin/env bun
/** Sort package.json with sort-package-json. */
import { readFileSync, writeFileSync } from "node:fs";
import sortPackageJson from "sort-package-json";
import { fromRoot } from "./lib/paths.ts";

const file = fromRoot("package.json");
const original = readFileSync(file, "utf8");
const sorted = sortPackageJson(original);

if (sorted === original) {
  console.log("package.json already sorted");
} else {
  writeFileSync(file, sorted);
  console.log("package.json sorted");
}
