import type { StoredLocale } from "@/i18n/locales";
import { t } from "@/i18n/runtime";
import { GITHUB_TRACKER_REQUEST_URL, GITHUB_URL } from "@/meta/links";
import { LanguagePicker } from "./language-picker";

interface SettingsTabProps {
  locale: StoredLocale;
  onLocaleChange: (locale: StoredLocale) => void;
}

const linkClass =
  "block rounded-md px-2 py-2 text-[13px] text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white";

export function SettingsTab({ locale, onLocaleChange }: SettingsTabProps) {
  return (
    <div className="flex flex-col gap-5">
      <LanguagePicker locale={locale} onChange={onLocaleChange} />

      <div className="flex flex-col gap-0.5">
        <p className="px-2 text-[11px] text-neutral-600 uppercase tracking-wide">
          {t("settingsLinks")}
        </p>
        <a
          className={linkClass}
          href={GITHUB_URL}
          rel="noreferrer"
          target="_blank"
        >
          {t("openSource")}
        </a>
        <a
          className={linkClass}
          href={GITHUB_TRACKER_REQUEST_URL}
          rel="noreferrer"
          target="_blank"
        >
          {t("suggestSite")}
        </a>
      </div>
    </div>
  );
}
