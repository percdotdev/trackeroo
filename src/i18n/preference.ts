import type { LocaleId, StoredLocale } from "./locales";
import { isLocaleId, LOCALE_IDS } from "./locales";

export const LOCALE_KEY = "locale";

export function normalizeStoredLocale(value: unknown): StoredLocale {
  if (value === "system") {
    return "system";
  }
  if (typeof value === "string" && isLocaleId(value)) {
    return value;
  }
  return "system";
}

export async function getStoredLocale(): Promise<StoredLocale> {
  try {
    const { [LOCALE_KEY]: stored } =
      await browser.storage.local.get(LOCALE_KEY);
    return normalizeStoredLocale(stored);
  } catch {
    return "system";
  }
}

export async function setStoredLocale(locale: StoredLocale): Promise<void> {
  await browser.storage.local.set({ [LOCALE_KEY]: locale });
}

export function resolveLocale(stored: StoredLocale): LocaleId | null {
  if (stored !== "system") {
    return stored;
  }

  const uiLocale = browser.i18n.getMessage("@@ui_locale").replace("-", "_");
  if (isLocaleId(uiLocale)) {
    return uiLocale;
  }

  const base = uiLocale.split("_")[0];
  if (base && isLocaleId(base)) {
    return base;
  }

  const match = LOCALE_IDS.find((id) => id.startsWith(`${base}_`));
  return match ?? null;
}
