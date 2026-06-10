import { t } from "@/i18n/runtime";
import { getTrackerHost, TRACKERS } from "@/trackers/catalog";
import type { TrackerId, TrackerPreferences } from "@/trackers/types";
import { Toggle } from "./toggle";

interface TrackersTabProps {
  onSetAll: (enabled: boolean) => void;
  onToggle: (id: TrackerId) => void;
  preferences: TrackerPreferences;
}

const actionClass =
  "text-[12px] text-neutral-500 transition-colors hover:text-white disabled:cursor-default disabled:text-neutral-700";

export function TrackersTab({
  preferences,
  onToggle,
  onSetAll,
}: TrackersTabProps) {
  const allOn = TRACKERS.every((tracker) => preferences[tracker.id]);
  const allOff = TRACKERS.every((tracker) => !preferences[tracker.id]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-end gap-1 px-1">
        <button
          className={actionClass}
          disabled={allOn}
          onClick={() => onSetAll(true)}
          type="button"
        >
          {t("turnAllOn")}
        </button>
        <span aria-hidden="true" className="text-neutral-800">
          ·
        </span>
        <button
          className={actionClass}
          disabled={allOff}
          onClick={() => onSetAll(false)}
          type="button"
        >
          {t("turnAllOff")}
        </button>
      </div>

      <ul className="flex flex-col gap-0.5">
        {TRACKERS.map((tracker) => (
          <li key={tracker.id}>
            <div className="flex items-center justify-between gap-3 rounded-md px-2 py-2 transition-colors hover:bg-neutral-900/60">
              <span className="truncate text-[13px] text-white">
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
