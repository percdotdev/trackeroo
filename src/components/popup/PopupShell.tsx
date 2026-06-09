import type { ReactNode } from 'react';
import { GITHUB_TRACKER_REQUEST_URL, GITHUB_URL } from '@/lib/constants';

const footerLinkClass =
  'text-[13px] text-neutral-500 underline decoration-neutral-700 underline-offset-2 hover:text-white hover:decoration-neutral-500';

type PopupShellProps = {
  children: ReactNode;
};

export function PopupShell({ children }: PopupShellProps) {
  return (
    <div className="flex min-h-[400px] w-[300px] flex-col bg-black text-sm text-neutral-300">
      <header className="border-b border-neutral-800 px-5 py-4">
        <h1 className="text-base font-medium text-white">Trackeroo</h1>
        <p className="mt-1 text-[13px] leading-snug text-neutral-500">
          Choose which stat sites appear on Steam profiles.
        </p>
      </header>

      <main className="flex-1 overflow-y-auto px-5 py-4">{children}</main>

      <footer className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-neutral-800 px-5 py-3">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className={footerLinkClass}
        >
          Open source
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
          Suggest a site
        </a>
      </footer>
    </div>
  );
}
