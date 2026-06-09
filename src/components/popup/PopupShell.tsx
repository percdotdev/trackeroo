import type { ReactNode } from 'react';
import { GITHUB_URL } from '@/lib/constants';

type PopupShellProps = {
  children: ReactNode;
};

export function PopupShell({ children }: PopupShellProps) {
  return (
    <div className="flex h-[280px] w-[260px] flex-col bg-[#1b2838] text-[13px] leading-none text-[#c7d5e0]">
      <header className="flex items-baseline justify-between px-3 pt-3">
        <h1 className="text-[15px] font-normal text-white">Trackeroo</h1>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="text-[11px] text-[#56707f] hover:text-[#66c0f4]"
        >
          github
        </a>
      </header>
      {children}
    </div>
  );
}
