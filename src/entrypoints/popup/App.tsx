import { PopupShell } from '@/components/popup/PopupShell';
import { TrackersTab } from '@/components/popup/TrackersTab';
import { useLocale } from '@/hooks/useLocale';
import { useTrackerPreferences } from '@/hooks/useTrackerPreferences';

function App() {
  const { ready, locale, setLocale } = useLocale();
  const { preferences, toggle, setAll } = useTrackerPreferences();

  if (!ready) return null;

  return (
    <PopupShell locale={locale} onLocaleChange={setLocale}>
      <TrackersTab
        preferences={preferences}
        onToggle={toggle}
        onSetAll={setAll}
      />
    </PopupShell>
  );
}

export default App;
