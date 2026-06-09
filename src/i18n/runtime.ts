import { browser } from "wxt/browser";
import type { LocaleId } from "./locales";
import { getStoredLocale, resolveLocale } from "./preference";

type MessageName = Parameters<typeof browser.i18n.getMessage>[0];

type RawMessages = Record<
  string,
  {
    message: string;
    placeholders?: Record<string, { content: string }>;
  }
>;

let activeMessages: Record<string, string> | null = null;

function applySubstitutions(
  template: string,
  substitutions?: string | string[]
): string {
  if (!substitutions) {
    return template;
  }

  const values = Array.isArray(substitutions) ? substitutions : [substitutions];
  return template.replace(/\$(\d+)\$/g, (_, token) => {
    const index = Number(token) - 1;
    return values[index] ?? `$${token}$`;
  });
}

async function loadMessages(locale: LocaleId): Promise<Record<string, string>> {
  const url = browser.runtime.getURL(`/_locales/${locale}/messages.json`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load locale: ${locale}`);
  }

  const raw = (await response.json()) as RawMessages;
  return Object.fromEntries(
    Object.entries(raw).map(([key, entry]) => [key, entry.message])
  );
}

export async function initI18n(): Promise<void> {
  const stored = await getStoredLocale();
  const resolved = resolveLocale(stored);

  if (!resolved) {
    activeMessages = null;
    return;
  }

  activeMessages = await loadMessages(resolved);
}

export function t(
  messageName: MessageName,
  substitutions?: string | string[]
): string {
  const override = activeMessages?.[messageName];
  if (override) {
    return applySubstitutions(override, substitutions);
  }

  return browser.i18n.getMessage(messageName, substitutions);
}
