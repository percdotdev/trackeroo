import { useEffect, useState } from "react";
import { initI18n } from "@/lib/i18n";
import type { StoredLocale } from "@/lib/locales";
import { getStoredLocale, setStoredLocale } from "@/preferences/locale";

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
