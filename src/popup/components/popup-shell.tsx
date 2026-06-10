import type { ReactNode } from "react";
import { t } from "@/i18n/runtime";
import { type PopupTab, PopupTabs } from "./popup-tabs";

interface PopupShellProps {
  activeTab: PopupTab;
  children: ReactNode;
  enabledCount: number;
  onTabChange: (tab: PopupTab) => void;
  totalCount: number;
}

export function PopupShell({
  activeTab,
  children,
  enabledCount,
  onTabChange,
  totalCount,
}: PopupShellProps) {
  return (
    <div className="flex w-[280px] flex-col bg-black text-neutral-300 text-sm">
      <header className="space-y-3 px-4 pt-4 pb-3">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-medium text-[15px] text-white">{t("extName")}</h1>
          <span className="shrink-0 rounded-full bg-neutral-900 px-2 py-0.5 text-[11px] text-neutral-400 tabular-nums">
            {enabledCount}/{totalCount}
          </span>
        </div>
        <PopupTabs active={activeTab} onChange={onTabChange} />
      </header>

      <main className="max-h-[320px] overflow-y-auto px-4 pb-4">
        {children}
      </main>
    </div>
  );
}
