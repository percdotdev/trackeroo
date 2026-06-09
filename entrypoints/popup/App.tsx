import { useEffect, useState } from 'react';
import { TRACKERS, type TrackerId } from '@/utils/trackers';
import {
  getDefaultPreferences,
  getTrackerPreferences,
  setTrackerPreference,
  type TrackerPreferences,
} from '@/utils/settings';

const GITHUB_URL = 'https://github.com/kWAYTV/trackeroo';

function App() {
  const [preferences, setPreferences] = useState<TrackerPreferences>(
    getDefaultPreferences,
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getTrackerPreferences().then((prefs) => {
      setPreferences(prefs);
      setReady(true);
    });
  }, []);

  const toggle = async (id: TrackerId) => {
    const enabled = !preferences[id];
    setPreferences((current) => ({ ...current, [id]: enabled }));
    await setTrackerPreference(id, enabled);
  };

  return (
    <div className="max-h-[580px] w-[360px] overflow-y-auto bg-[#1b2838] text-[#c7d5e0]">
      <header className="border-b border-[#2a475e] px-4 py-3">
        <h1 className="text-lg font-semibold text-white">Trackeroo</h1>
        <p className="mt-1 text-xs text-[#8f98a0]">
          CS2 stat trackers on Steam profile pages
        </p>
      </header>

      <section className="px-4 py-3">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8f98a0]">
          Visible trackers
        </h2>
        <ul className="space-y-1">
          {TRACKERS.map((tracker) => (
            <li key={tracker.id}>
              <label className="flex cursor-pointer items-center justify-between rounded px-2 py-2 hover:bg-[#2a475e]/40">
                <span className="text-sm">{tracker.label}</span>
                <input
                  type="checkbox"
                  className="size-4 accent-[#66c0f4]"
                  checked={preferences[tracker.id]}
                  disabled={!ready}
                  onChange={() => toggle(tracker.id)}
                />
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[#2a475e] px-4 py-3">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8f98a0]">
          Manual access
        </h2>
        <p className="mb-3 text-xs leading-relaxed text-[#8f98a0]">
          On any Steam profile URL, edit the hostname:
        </p>
        <ul className="space-y-2">
          {TRACKERS.map((tracker) => (
            <li
              key={tracker.id}
              className="rounded border border-[#2a475e] bg-[#16202d] px-3 py-2"
            >
              <div className="text-sm font-medium text-[#66c0f4]">
                {tracker.label}
              </div>
              <div className="mt-1 text-xs text-[#8f98a0]">
                {tracker.manualHint}
              </div>
              <code className="mt-1 block truncate text-[11px] text-[#acb2b8]">
                {tracker.manualExample}
              </code>
            </li>
          ))}
        </ul>
      </section>

      <footer className="border-t border-[#2a475e] px-4 py-3 text-center text-xs text-[#8f98a0]">
        Open source on{' '}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="text-[#66c0f4] hover:text-white"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}

export default App;
