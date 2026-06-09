import { Toggle } from '@/components/Toggle';
import { TRACKERS } from '@/trackers/catalog';
import type { TrackerId } from '@/trackers/types';
import type { TrackerPreferences } from '@/preferences/types';

type TrackersTabProps = {
  preferences: TrackerPreferences;
  onToggle: (id: TrackerId) => void;
};

export function TrackersTab({ preferences, onToggle }: TrackersTabProps) {
  return (
    <ul>
      {TRACKERS.map((tracker) => (
        <li key={tracker.id}>
          <div className="flex items-center justify-between py-[7px]">
            <span>{tracker.label}</span>
            <Toggle
              checked={preferences[tracker.id]}
              onChange={() => onToggle(tracker.id)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
