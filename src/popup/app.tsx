import { useState } from "react";
import { useLocale } from "@/i18n/use-locale";
import { TRACKERS } from "@/trackers/catalog";
import { useTrackerPreferences } from "@/trackers/use-tracker-preferences";
import { PopupShell } from "./components/popup-shell";
import type { PopupTab } from "./components/popup-tabs";
import { SettingsTab } from "./components/settings-tab";
import { TrackersTab } from "./components/trackers-tab";

const skeletonRows = ["first", "second", "third", "fourth"] as const;

function PopupLoadingSkeleton() {
  return (
    <div
      aria-busy="true"
      className="flex w-[280px] flex-col gap-3 bg-black px-4 pt-4 pb-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-4 w-24 animate-pulse rounded bg-neutral-900" />
          <div className="h-3 w-40 animate-pulse rounded bg-neutral-900" />
        </div>
        <div className="h-5 w-10 animate-pulse rounded-full bg-neutral-900" />
      </div>
      <div className="h-8 animate-pulse rounded-lg bg-neutral-900" />
      <div className="flex flex-col gap-1">
        {skeletonRows.map((row) => (
          <div
            className="h-9 animate-pulse rounded-md bg-neutral-900/70"
            key={row}
          />
        ))}
      </div>
    </div>
  );
}

export function PopupApp() {
  const { ready, locale, setLocale } = useLocale();
  const { error, preferences, toggle, setAll } = useTrackerPreferences();
  const [activeTab, setActiveTab] = useState<PopupTab>("trackers");

  if (!ready) {
    return <PopupLoadingSkeleton />;
  }

  const enabledCount = TRACKERS.filter(
    (tracker) => preferences[tracker.id]
  ).length;

  return (
    <PopupShell
      activeTab={activeTab}
      enabledCount={enabledCount}
      onTabChange={setActiveTab}
      totalCount={TRACKERS.length}
    >
      {activeTab === "trackers" ? (
        <TrackersTab
          error={error}
          onSetAll={setAll}
          onToggle={toggle}
          preferences={preferences}
        />
      ) : (
        <SettingsTab locale={locale} onLocaleChange={setLocale} />
      )}
    </PopupShell>
  );
}
