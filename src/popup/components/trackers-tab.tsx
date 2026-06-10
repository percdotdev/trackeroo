import { t } from "@/i18n/runtime";
import { getTrackerHost, TRACKERS } from "@/trackers/catalog";
import type { TrackerId, TrackerPreferences } from "@/trackers/types";
import { Toggle } from "./toggle";

interface TrackersTabProps {
  error: boolean;
  onSetAll: (enabled: boolean) => void;
  onToggle: (id: TrackerId) => void;
  preferences: TrackerPreferences;
}

const actionClass =
  "rounded-sm text-[12px] text-neutral-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-default disabled:text-neutral-700";

export function TrackersTab({
  error,
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
          title={allOn ? t("allTrackersAlreadyEnabled") : undefined}
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
          title={allOff ? t("allTrackersAlreadyDisabled") : undefined}
          type="button"
        >
          {t("turnAllOff")}
        </button>
      </div>

      {error ? (
        <p className="px-1 text-[12px] text-red-300" role="alert">
          {t("preferencesSaveError")}
        </p>
      ) : null}

      <ul className="flex flex-col gap-0.5">
        {TRACKERS.map((tracker) => {
          const host = getTrackerHost(tracker);

          return (
            <li key={tracker.id}>
              <Toggle
                ariaLabel={
                  preferences[tracker.id]
                    ? t("trackerEnabled", host)
                    : t("trackerDisabled", host)
                }
                checked={preferences[tracker.id]}
                label={host}
                onChange={() => onToggle(tracker.id)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
