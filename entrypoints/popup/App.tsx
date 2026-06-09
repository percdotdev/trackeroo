import { useEffect, useState } from 'react';
import { TRACKERS, type TrackerId } from '@/utils/trackers';
import {
  getDefaultPreferences,
  getTrackerPreferences,
  setTrackerPreference,
  type TrackerPreferences,
} from '@/utils/settings';

const GITHUB_URL = 'https://github.com/kWAYTV/trackeroo';
const GITHUB_ISSUES_URL = 'https://github.com/kWAYTV/trackeroo/issues';
type Tab = 'trackers' | 'manual' | 'info';

const TABS: { id: Tab; label: string }[] = [
  { id: 'trackers', label: 'Trackers' },
  { id: 'manual', label: 'Manual' },
  { id: 'info', label: 'Info' },
];

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative h-[18px] w-[34px] shrink-0 rounded-full transition-colors ${
        checked ? 'bg-[#417a9b]' : 'bg-[#3d4450]'
      }`}
    >
      <span
        className="absolute top-[2px] size-[14px] rounded-full bg-white transition-[left] duration-150"
        style={{ left: checked ? 18 : 2 }}
      />
    </button>
  );
}

function App() {
  const [tab, setTab] = useState<Tab>('trackers');
  const [preferences, setPreferences] = useState<TrackerPreferences>(
    getDefaultPreferences,
  );

  useEffect(() => {
    getTrackerPreferences().then(setPreferences);
  }, []);

  const toggle = (id: TrackerId) => {
    const enabled = !preferences[id];
    setPreferences((current) => ({ ...current, [id]: enabled }));
    setTrackerPreference(id, enabled).catch(() => {
      setPreferences((current) => ({ ...current, [id]: !enabled }));
    });
  };

  return (
    <div className="flex h-[280px] w-[260px] flex-col bg-[#1b2838] text-[13px] leading-none text-[#c7d5e0]">
      <div className="flex items-baseline justify-between px-3 pt-3">
        <h1 className="text-[15px] font-normal text-white">Trackeroo</h1>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="text-[11px] text-[#56707f] hover:text-[#66c0f4]"
        >
          github
        </a>
      </div>

      <div className="mt-3 flex gap-3 border-b border-[#2a475e]/80 px-3">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`-mb-px border-b pb-2 transition-colors ${
              tab === id
                ? 'border-[#66c0f4] text-white'
                : 'border-transparent text-[#56707f] hover:text-[#8f98a0]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2.5">
        {tab === 'trackers' && (
          <ul>
            {TRACKERS.map((tracker) => (
              <li key={tracker.id}>
                <div className="flex items-center justify-between py-[7px]">
                  <span>{tracker.label}</span>
                  <Toggle
                    checked={preferences[tracker.id]}
                    onChange={() => toggle(tracker.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}

        {tab === 'manual' && (
          <div className="space-y-2.5">
            <p className="text-[11px] leading-snug text-[#56707f]">
              Edit the hostname on any{' '}
              <span className="text-[#8f98a0]">steamcommunity.com</span> profile
              URL.
            </p>
            <table className="w-full text-left text-[11px]">
              <tbody>
                {TRACKERS.map((tracker) => (
                  <tr key={tracker.id} className="align-top">
                    <td className="w-[72px] shrink-0 py-1 pr-2 text-[#8f98a0]">
                      {tracker.label}
                    </td>
                    <td className="py-1">
                      <div className="text-[#acb2b8]">{tracker.manualHint}</div>
                      <div className="mt-0.5 font-mono text-[10px] text-[#56707f]">
                        {tracker.manualExample}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'info' && (
          <div className="space-y-3 text-[11px] leading-relaxed text-[#8f98a0]">
            <p>
              Know or run a tracker site that fits the Steam profile URL trick?
              I&apos;m happy to add it.
            </p>
            <p>
              Open an{' '}
              <a
                href={GITHUB_ISSUES_URL}
                target="_blank"
                rel="noreferrer"
                className="text-[#66c0f4] hover:text-white"
              >
                issue
              </a>{' '}
              or send a{' '}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="text-[#66c0f4] hover:text-white"
              >
                PR
              </a>{' '}
              on GitHub — or just tell me.
            </p>
            <p className="text-[#56707f]">
              Trackeroo is open source.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
