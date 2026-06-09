import { useState } from "react";
import { PopupShell } from "@/components/popup/PopupShell";
import type { PopupTab } from "@/components/popup/PopupTabs";
import { SettingsTab } from "@/components/popup/SettingsTab";
import { TrackersTab } from "@/components/popup/TrackersTab";
import { useLocale } from "@/hooks/useLocale";
import { useTrackerPreferences } from "@/hooks/useTrackerPreferences";
import { TRACKERS } from "@/trackers/catalog";

function App() {
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

export default App;
