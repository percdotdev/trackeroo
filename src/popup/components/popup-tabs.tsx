import type { KeyboardEvent } from "react";
import { t } from "@/i18n/runtime";

export type PopupTab = "trackers" | "settings";

interface PopupTabsProps {
  active: PopupTab;
  onChange: (tab: PopupTab) => void;
}

const tabs: PopupTab[] = ["trackers", "settings"];

export function getPopupTabId(tab: PopupTab): string {
  return `popup-tab-${tab}`;
}

export function getPopupTabPanelId(tab: PopupTab): string {
  return `popup-tab-panel-${tab}`;
}

function tabLabel(tab: PopupTab): string {
  return tab === "trackers" ? t("tabTrackers") : t("tabSettings");
}

export function PopupTabs({ active, onChange }: PopupTabsProps) {
  const selectTab = (tab: PopupTab) => {
    onChange(tab);
    requestAnimationFrame(() =>
      document.getElementById(getPopupTabId(tab))?.focus()
    );
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const activeIndex = tabs.indexOf(active);
    const selectByIndex = (index: number) => {
      selectTab(tabs[(index + tabs.length) % tabs.length] ?? tabs[0]);
    };

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        selectByIndex(activeIndex - 1);
        break;
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        selectByIndex(activeIndex + 1);
        break;
      case "Home":
        event.preventDefault();
        selectTab(tabs[0]);
        break;
      case "End":
        event.preventDefault();
        selectTab(tabs.at(-1) ?? tabs[0]);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="flex rounded-lg bg-neutral-900 p-0.5"
      onKeyDown={onKeyDown}
      role="tablist"
    >
      {tabs.map((tab) => {
        const selected = active === tab;
        return (
          <button
            aria-controls={getPopupTabPanelId(tab)}
            aria-selected={selected}
            className={`flex-1 rounded-md px-2 py-1.5 text-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 ${
              selected
                ? "bg-neutral-800 font-medium text-white"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
            id={getPopupTabId(tab)}
            key={tab}
            onClick={() => onChange(tab)}
            role="tab"
            tabIndex={selected ? 0 : -1}
            type="button"
          >
            {tabLabel(tab)}
          </button>
        );
      })}
    </div>
  );
}
