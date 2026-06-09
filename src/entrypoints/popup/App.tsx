import { useState } from 'react';
import { InfoTab } from '@/components/popup/InfoTab';
import { ManualTab } from '@/components/popup/ManualTab';
import { PopupShell } from '@/components/popup/PopupShell';
import { TabBar } from '@/components/popup/TabBar';
import { TrackersTab } from '@/components/popup/TrackersTab';
import { useTrackerPreferences } from '@/hooks/useTrackerPreferences';
import type { PopupTab } from '@/lib/popup-tabs';

function App() {
  const [tab, setTab] = useState<PopupTab>('trackers');
  const { preferences, toggle, setAll } = useTrackerPreferences();

  return (
    <PopupShell>
      <TabBar activeTab={tab} onChange={setTab} />
      <main className="flex-1 overflow-y-auto px-3 py-2.5">
        {tab === 'trackers' && (
          <TrackersTab
            preferences={preferences}
            onToggle={toggle}
            onSetAll={setAll}
          />
        )}
        {tab === 'manual' && <ManualTab />}
        {tab === 'info' && <InfoTab />}
      </main>
    </PopupShell>
  );
}

export default App;
