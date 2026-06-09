import { SUPPORTED_LOCALES, type StoredLocale } from '@/lib/locales';
import { t } from '@/lib/i18n';

type LanguagePickerProps = {
  locale: StoredLocale;
  onChange: (locale: StoredLocale) => void;
};

const selectClass =
  'w-full rounded border border-neutral-700 bg-black px-2.5 py-1.5 text-[13px] text-white outline-none transition-colors hover:border-neutral-500 focus:border-neutral-500';

export function LanguagePicker({ locale, onChange }: LanguagePickerProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[12px] text-neutral-500">{t('language')}</span>
      <select
        className={selectClass}
        value={locale}
        onChange={(event) => onChange(event.target.value as StoredLocale)}
      >
        <option value="system">{t('languageSystem')}</option>
        {SUPPORTED_LOCALES.map((entry) => (
          <option key={entry.id} value={entry.id}>
            {entry.label}
          </option>
        ))}
      </select>
    </label>
  );
}
