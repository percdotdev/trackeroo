export const SUPPORTED_LOCALES = [
  { id: 'en', label: 'English' },
  { id: 'es', label: 'Español' },
  { id: 'de', label: 'Deutsch' },
  { id: 'pt_BR', label: 'Português' },
  { id: 'fr', label: 'Français' },
  { id: 'ru', label: 'Русский' },
  { id: 'zh_CN', label: '中文' },
] as const;

export type LocaleId = (typeof SUPPORTED_LOCALES)[number]['id'];

export type StoredLocale = 'system' | LocaleId;

export const LOCALE_IDS = SUPPORTED_LOCALES.map((locale) => locale.id);

export function isLocaleId(value: string): value is LocaleId {
  return LOCALE_IDS.includes(value as LocaleId);
}
