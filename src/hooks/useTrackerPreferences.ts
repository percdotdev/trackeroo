import { useEffect, useState } from "react";
import {
  getDefaultPreferences,
  getTrackerPreferences,
  setAllTrackerPreferences,
  setTrackerPreference,
} from "@/preferences/storage";
import type { TrackerPreferences } from "@/preferences/types";
import type { TrackerId } from "@/trackers/types";

export function useTrackerPreferences() {
  const [preferences, setPreferences] = useState<TrackerPreferences>(
    getDefaultPreferences
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

  const setAll = (enabled: boolean) => {
    const previous = preferences;
    setPreferences(
      Object.fromEntries(
        Object.keys(preferences).map((id) => [id, enabled])
      ) as TrackerPreferences
    );
    setAllTrackerPreferences(enabled).catch(() => {
      setPreferences(previous);
    });
  };

  return { preferences, toggle, setAll };
}
