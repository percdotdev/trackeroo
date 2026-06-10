import { useEffect, useState } from "react";
import type { StoredLocale } from "./locales";
import { getStoredLocale, setStoredLocale } from "./preference";
import { initI18n } from "./runtime";

export function useLocale() {
  const [ready, setReady] = useState(false);
  const [locale, setLocaleState] = useState<StoredLocale>("system");

  useEffect(() => {
    getStoredLocale()
      .then(async (stored) => {
        await initI18n();
        setLocaleState(stored);
        setReady(true);
      })
      .catch(() => {
        setReady(true);
      });
  }, []);

  const setLocale = async (next: StoredLocale) => {
    await setStoredLocale(next);
    await initI18n();
    setLocaleState(next);
  };

  return { ready, locale, setLocale };
}
