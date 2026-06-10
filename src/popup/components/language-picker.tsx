import { type StoredLocale, SUPPORTED_LOCALES } from "@/i18n/locales";
import { t } from "@/i18n/runtime";

interface LanguagePickerProps {
  locale: StoredLocale;
  onChange: (locale: StoredLocale) => void;
}

const selectClass =
  "w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-2.5 py-2 text-[13px] text-white outline-none transition-colors hover:border-neutral-700 focus:border-neutral-600 focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export function LanguagePicker({ locale, onChange }: LanguagePickerProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[12px] text-neutral-500">{t("language")}</span>
      <select
        className={selectClass}
        onChange={(event) => onChange(event.target.value as StoredLocale)}
        value={locale}
      >
        <option value="system">{t("languageSystem")}</option>
        {SUPPORTED_LOCALES.map((entry) => (
          <option key={entry.id} value={entry.id}>
            {entry.label}
          </option>
        ))}
      </select>
    </label>
  );
}
