import { useEffect, useState } from "react";
import {
  getDefaultPreferences,
  getTrackerPreferences,
  setAllTrackerPreferences,
  setTrackerPreference,
} from "./preferences";
import type { TrackerId, TrackerPreferences } from "./types";

export function useTrackerPreferences() {
  const [preferences, setPreferences] = useState<TrackerPreferences>(
    getDefaultPreferences
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    getTrackerPreferences().then(setPreferences);
  }, []);

  const toggle = (id: TrackerId) => {
    const enabled = !preferences[id];
    setError(false);
    setPreferences((current) => ({ ...current, [id]: enabled }));
    setTrackerPreference(id, enabled).catch(() => {
      setPreferences((current) => ({ ...current, [id]: !enabled }));
      setError(true);
    });
  };

  const setAll = (enabled: boolean) => {
    const previous = preferences;
    setError(false);
    setPreferences(
      Object.fromEntries(
        Object.keys(preferences).map((id) => [id, enabled])
      ) as TrackerPreferences
    );
    setAllTrackerPreferences(enabled).catch(() => {
      setPreferences(previous);
      setError(true);
    });
  };

  return { error, preferences, toggle, setAll };
}
