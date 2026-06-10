#!/usr/bin/env bun
/** Verify every locale has the same keys and $n placeholders as the base. */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const LOCALES_DIR = "public/_locales";
const BASE_LOCALE = "en";
const SUBSTITUTION_RE = /\$\d+/g;

type Messages = Record<string, { message: string }>;

async function loadMessages(locale: string): Promise<Messages> {
  const raw = await readFile(
    join(LOCALES_DIR, locale, "messages.json"),
    "utf8"
  );
  return JSON.parse(raw) as Messages;
}

function substitutionTokens(message: string): string {
  return [...message.matchAll(SUBSTITUTION_RE)]
    .map((match) => match[0])
    .sort()
    .join(",");
}

const baseMessages = await loadMessages(BASE_LOCALE);
const baseKeys = new Set(Object.keys(baseMessages));
const locales = (await readdir(LOCALES_DIR)).sort();

let failed = false;

function fail(message: string): void {
  console.error(message);
  failed = true;
}

for (const locale of locales) {
  if (locale === BASE_LOCALE) {
    continue;
  }

  const messages = await loadMessages(locale);
  const keys = new Set(Object.keys(messages));

  for (const key of baseKeys) {
    if (!keys.has(key)) {
      fail(`${locale}: missing key "${key}"`);
      continue;
    }

    const expected = substitutionTokens(baseMessages[key].message);
    const actual = substitutionTokens(messages[key].message);
    if (expected !== actual) {
      fail(
        `${locale}: key "${key}" placeholders [${actual}] do not match ${BASE_LOCALE} [${expected}]`
      );
    }
  }

  for (const key of keys) {
    if (!baseKeys.has(key)) {
      fail(`${locale}: extra key "${key}"`);
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log(
  `All ${locales.length - 1} locale files match ${BASE_LOCALE} keys and placeholders`
);
