import { t } from "@/i18n/runtime";

export type PopupTab = "trackers" | "settings";

interface PopupTabsProps {
  active: PopupTab;
  onChange: (tab: PopupTab) => void;
}

const tabs: PopupTab[] = ["trackers", "settings"];

function tabLabel(tab: PopupTab): string {
  return tab === "trackers" ? t("tabTrackers") : t("tabSettings");
}

export function PopupTabs({ active, onChange }: PopupTabsProps) {
  return (
    <div className="flex rounded-lg bg-neutral-900 p-0.5" role="tablist">
      {tabs.map((tab) => {
        const selected = active === tab;
        return (
          <button
            aria-selected={selected}
            className={`flex-1 rounded-md px-2 py-1.5 text-[12px] transition-colors ${
              selected
                ? "bg-neutral-800 font-medium text-white"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
            key={tab}
            onClick={() => onChange(tab)}
            role="tab"
            type="button"
          >
            {tabLabel(tab)}
          </button>
        );
      })}
    </div>
  );
}
