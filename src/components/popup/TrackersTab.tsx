import { Toggle } from "@/components/popup/Toggle";
import { t } from "@/i18n/runtime";
import type { TrackerPreferences } from "@/preferences/types";
import { getTrackerHost, TRACKERS } from "@/trackers/catalog";
import type { TrackerId } from "@/trackers/types";

interface TrackersTabProps {
  onSetAll: (enabled: boolean) => void;
  onToggle: (id: TrackerId) => void;
  preferences: TrackerPreferences;
}

export function TrackersTab({
  preferences,
  onToggle,
  onSetAll,
}: TrackersTabProps) {
  const allOn = TRACKERS.every((tracker) => preferences[tracker.id]);
  const allOff = TRACKERS.every((tracker) => !preferences[tracker.id]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2">
        <button
          className="rounded border border-neutral-700 px-3 py-2 text-[13px] text-white transition-colors hover:border-neutral-500 disabled:cursor-default disabled:border-neutral-800 disabled:text-neutral-600"
          disabled={allOn}
          onClick={() => onSetAll(true)}
          type="button"
        >
          {t("turnAllOn")}
        </button>
        <button
          className="rounded border border-neutral-700 px-3 py-2 text-[13px] text-white transition-colors hover:border-neutral-500 disabled:cursor-default disabled:border-neutral-800 disabled:text-neutral-600"
          disabled={allOff}
          onClick={() => onSetAll(false)}
          type="button"
        >
          {t("turnAllOff")}
        </button>
      </div>

      <ul className="divide-y divide-neutral-800 border-neutral-800 border-y">
        {TRACKERS.map((tracker) => (
          <li key={tracker.id}>
            <div className="flex items-center justify-between gap-4 py-3.5">
              <span className="text-[15px] text-white">
                {getTrackerHost(tracker)}
              </span>
              <Toggle
                ariaLabel={
                  preferences[tracker.id]
                    ? t("trackerEnabled", getTrackerHost(tracker))
                    : t("trackerDisabled", getTrackerHost(tracker))
                }
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
