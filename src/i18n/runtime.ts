import { browser } from "wxt/browser";
import type { LocaleId } from "./locales";
import {
  applySubstitutions,
  flattenMessages,
  type RawMessages,
} from "./messages";
import { getStoredLocale } from "./preference";

type MessageName = Parameters<typeof browser.i18n.getMessage>[0];

let activeMessages: Record<string, string> | null = null;

async function loadMessages(locale: LocaleId): Promise<Record<string, string>> {
  const url = browser.runtime.getURL(`/_locales/${locale}/messages.json`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load locale: ${locale}`);
  }

  return flattenMessages((await response.json()) as RawMessages);
}

export async function initI18n(): Promise<void> {
  const stored = await getStoredLocale();

  if (stored === "system") {
    activeMessages = null;
    return;
  }

  activeMessages = await loadMessages(stored);
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
