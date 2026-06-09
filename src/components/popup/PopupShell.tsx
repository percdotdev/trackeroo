import type { ReactNode } from 'react';
import { LanguagePicker } from '@/components/popup/LanguagePicker';
import { GITHUB_TRACKER_REQUEST_URL, GITHUB_URL } from '@/lib/constants';
import { t } from '@/lib/i18n';
import type { StoredLocale } from '@/lib/locales';

const footerLinkClass =
  'text-[13px] text-neutral-500 underline decoration-neutral-700 underline-offset-2 hover:text-white hover:decoration-neutral-500';

type PopupShellProps = {
  children: ReactNode;
  locale: StoredLocale;
  onLocaleChange: (locale: StoredLocale) => void;
};

export function PopupShell({ children, locale, onLocaleChange }: PopupShellProps) {
  return (
    <div className="flex min-h-[400px] w-[300px] flex-col bg-black text-sm text-neutral-300">
      <header className="space-y-3 border-b border-neutral-800 px-5 py-4">
        <div>
          <h1 className="text-base font-medium text-white">{t('extName')}</h1>
          <p className="mt-1 text-[13px] leading-snug text-neutral-500">
            {t('popupSubtitle')}
          </p>
        </div>
        <LanguagePicker locale={locale} onChange={onLocaleChange} />
      </header>

      <main className="flex-1 overflow-y-auto px-5 py-4">{children}</main>

      <footer className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-neutral-800 px-5 py-3">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className={footerLinkClass}
        >
          {t('openSource')}
        </a>
        <span className="text-neutral-700" aria-hidden="true">
          ·
        </span>
        <a
          href={GITHUB_TRACKER_REQUEST_URL}
          target="_blank"
          rel="noreferrer"
          className={footerLinkClass}
        >
          {t('suggestSite')}
        </a>
      </footer>
    </div>
  );
}
