import { Toggle } from '@/components/Toggle';
import { TRACKERS } from '@/trackers/catalog';
import type { TrackerId } from '@/trackers/types';
import type { TrackerPreferences } from '@/preferences/types';

type TrackersTabProps = {
  preferences: TrackerPreferences;
  onToggle: (id: TrackerId) => void;
  onSetAll: (enabled: boolean) => void;
};

export function TrackersTab({ preferences, onToggle, onSetAll }: TrackersTabProps) {
  const allOn = TRACKERS.every((tracker) => preferences[tracker.id]);
  const allOff = TRACKERS.every((tracker) => !preferences[tracker.id]);

  return (
    <div>
      <div className="mb-2 flex gap-3 text-[11px]">
        <button
          type="button"
          disabled={allOn}
          onClick={() => onSetAll(true)}
          className="text-[#66c0f4] hover:text-white disabled:cursor-default disabled:text-[#56707f]"
        >
          Enable all
        </button>
        <button
          type="button"
          disabled={allOff}
          onClick={() => onSetAll(false)}
          className="text-[#66c0f4] hover:text-white disabled:cursor-default disabled:text-[#56707f]"
        >
          Disable all
        </button>
      </div>
      <ul>
        {TRACKERS.map((tracker) => (
          <li key={tracker.id}>
            <div className="flex items-center justify-between py-[7px]">
              <a
                href={tracker.homeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#c7d5e0] hover:text-[#66c0f4]"
              >
                {tracker.label}
              </a>
              <Toggle
                checked={preferences[tracker.id]}
                onChange={() => onToggle(tracker.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
