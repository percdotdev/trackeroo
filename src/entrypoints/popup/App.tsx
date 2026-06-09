import { PopupShell } from '@/components/popup/PopupShell';
import { TrackersTab } from '@/components/popup/TrackersTab';
import { useTrackerPreferences } from '@/hooks/useTrackerPreferences';

function App() {
  const { preferences, toggle, setAll } = useTrackerPreferences();

  return (
    <PopupShell>
      <TrackersTab
        preferences={preferences}
        onToggle={toggle}
        onSetAll={setAll}
      />
    </PopupShell>
  );
}

export default App;
