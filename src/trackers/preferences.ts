import { TRACKER_IDS, TRACKERS } from "./catalog";
import type { Tracker, TrackerId, TrackerPreferences } from "./types";

export const TRACKER_PREFERENCES_KEY = "trackerPreferences";

export function getDefaultPreferences(): TrackerPreferences {
  return Object.fromEntries(
    TRACKER_IDS.map((id) => [id, true])
  ) as TrackerPreferences;
}

function normalizePreferences(stored: unknown): TrackerPreferences {
  const source =
    stored && typeof stored === "object"
      ? (stored as Partial<TrackerPreferences>)
      : {};

  return Object.fromEntries(
    TRACKER_IDS.map((id) => [id, source[id] ?? true])
  ) as TrackerPreferences;
}

async function readPreferences(): Promise<TrackerPreferences> {
  const { [TRACKER_PREFERENCES_KEY]: stored } = await browser.storage.local.get(
    TRACKER_PREFERENCES_KEY
  );
  return normalizePreferences(stored);
}

export async function getTrackerPreferences(): Promise<TrackerPreferences> {
  try {
    return await readPreferences();
  } catch {
    return getDefaultPreferences();
  }
}

export async function getEnabledTrackers(): Promise<Tracker[]> {
  const preferences = await getTrackerPreferences();
  return TRACKERS.filter((tracker) => preferences[tracker.id]);
}

export async function setTrackerPreference(
  id: TrackerId,
  enabled: boolean
): Promise<void> {
  const preferences = await readPreferences();
  preferences[id] = enabled;
  await browser.storage.local.set({
    [TRACKER_PREFERENCES_KEY]: preferences,
  });
}

export async function setAllTrackerPreferences(
  enabled: boolean
): Promise<TrackerPreferences> {
  const preferences = Object.fromEntries(
    TRACKER_IDS.map((id) => [id, enabled])
  ) as TrackerPreferences;
  await browser.storage.local.set({
    [TRACKER_PREFERENCES_KEY]: preferences,
  });
  return preferences;
}

/** Write defaults on first install so the content script sees a full record. */
export async function seedDefaultPreferences(): Promise<void> {
  await browser.storage.local.set({
    [TRACKER_PREFERENCES_KEY]: getDefaultPreferences(),
  });
}

/** Re-persist stored preferences so added/removed trackers are reconciled. */
export async function normalizeStoredPreferences(): Promise<void> {
  const preferences = await readPreferences();
  await browser.storage.local.set({
    [TRACKER_PREFERENCES_KEY]: preferences,
  });
}
