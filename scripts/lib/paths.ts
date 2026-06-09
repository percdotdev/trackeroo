import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

export function fromRoot(...segments: string[]): string {
  return join(ROOT, ...segments);
}
