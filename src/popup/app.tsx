import { useState } from "react";
import { useLocale } from "@/i18n/use-locale";
import { TRACKERS } from "@/trackers/catalog";
import { useTrackerPreferences } from "@/trackers/use-tracker-preferences";
import { PopupShell } from "./components/popup-shell";
import type { PopupTab } from "./components/popup-tabs";
import { SettingsTab } from "./components/settings-tab";
import { TrackersTab } from "./components/trackers-tab";

export function PopupApp() {
  const { ready, locale, setLocale } = useLocale();
  const { preferences, toggle, setAll } = useTrackerPreferences();
  const [activeTab, setActiveTab] = useState<PopupTab>("trackers");

  if (!ready) {
    return null;
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
