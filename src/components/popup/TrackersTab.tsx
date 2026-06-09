import { Toggle } from '@/components/Toggle';
import { t } from '@/lib/i18n';
import { TRACKERS, getTrackerHost } from '@/trackers/catalog';
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
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          disabled={allOn}
          onClick={() => onSetAll(true)}
          className="rounded border border-neutral-700 px-3 py-2 text-[13px] text-white transition-colors hover:border-neutral-500 disabled:cursor-default disabled:border-neutral-800 disabled:text-neutral-600"
        >
          {t('turnAllOn')}
        </button>
        <button
          type="button"
          disabled={allOff}
          onClick={() => onSetAll(false)}
          className="rounded border border-neutral-700 px-3 py-2 text-[13px] text-white transition-colors hover:border-neutral-500 disabled:cursor-default disabled:border-neutral-800 disabled:text-neutral-600"
        >
          {t('turnAllOff')}
        </button>
      </div>

      <ul className="divide-y divide-neutral-800 border-y border-neutral-800">
        {TRACKERS.map((tracker) => (
          <li key={tracker.id}>
            <label className="flex cursor-pointer items-center justify-between gap-4 py-3.5">
              <span className="text-[15px] text-white">{getTrackerHost(tracker)}</span>
              <Toggle
                checked={preferences[tracker.id]}
                onChange={() => onToggle(tracker.id)}
                ariaLabel={
                  preferences[tracker.id]
                    ? t('trackerEnabled', getTrackerHost(tracker))
                    : t('trackerDisabled', getTrackerHost(tracker))
                }
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
