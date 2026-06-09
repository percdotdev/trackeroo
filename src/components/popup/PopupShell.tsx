import type { ReactNode } from "react";
import { LanguagePicker } from "@/components/popup/LanguagePicker";
import { GITHUB_TRACKER_REQUEST_URL, GITHUB_URL } from "@/lib/constants";
import { t } from "@/lib/i18n";
import type { StoredLocale } from "@/lib/locales";

const footerLinkClass =
  "text-[13px] text-neutral-500 underline decoration-neutral-700 underline-offset-2 hover:text-white hover:decoration-neutral-500";

interface PopupShellProps {
  children: ReactNode;
  locale: StoredLocale;
  onLocaleChange: (locale: StoredLocale) => void;
}

export function PopupShell({
  children,
  locale,
  onLocaleChange,
}: PopupShellProps) {
  return (
    <div className="flex min-h-[400px] w-[300px] flex-col bg-black text-neutral-300 text-sm">
      <header className="space-y-3 border-neutral-800 border-b px-5 py-4">
        <div>
          <h1 className="font-medium text-base text-white">{t("extName")}</h1>
          <p className="mt-1 text-[13px] text-neutral-500 leading-snug">
            {t("popupSubtitle")}
          </p>
        </div>
        <LanguagePicker locale={locale} onChange={onLocaleChange} />
      </header>

      <main className="flex-1 overflow-y-auto px-5 py-4">{children}</main>

      <footer className="flex flex-wrap items-center gap-x-3 gap-y-1 border-neutral-800 border-t px-5 py-3">
        <a
          className={footerLinkClass}
          href={GITHUB_URL}
          rel="noreferrer"
          target="_blank"
        >
          {t("openSource")}
        </a>
        <span aria-hidden="true" className="text-neutral-700">
          ·
        </span>
        <a
          className={footerLinkClass}
          href={GITHUB_TRACKER_REQUEST_URL}
          rel="noreferrer"
          target="_blank"
        >
          {t("suggestSite")}
        </a>
      </footer>
    </div>
  );
}
