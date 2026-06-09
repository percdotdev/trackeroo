import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const LOCALES_DIR = 'public/_locales';
const BASE_LOCALE = 'en';

const baseMessages = JSON.parse(
  await readFile(join(LOCALES_DIR, BASE_LOCALE, 'messages.json'), 'utf8'),
) as Record<string, unknown>;

const baseKeys = new Set(Object.keys(baseMessages));
const locales = await readdir(LOCALES_DIR);

let failed = false;

for (const locale of locales.sort()) {
  if (locale === BASE_LOCALE) continue;

  const messages = JSON.parse(
    await readFile(join(LOCALES_DIR, locale, 'messages.json'), 'utf8'),
  ) as Record<string, unknown>;

  const keys = new Set(Object.keys(messages));

  for (const key of baseKeys) {
    if (!keys.has(key)) {
      console.error(`${locale}: missing key "${key}"`);
      failed = true;
    }
  }

  for (const key of keys) {
    if (!baseKeys.has(key)) {
      console.error(`${locale}: extra key "${key}"`);
      failed = true;
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log(`All ${locales.length - 1} locale files match ${BASE_LOCALE} keys`);
