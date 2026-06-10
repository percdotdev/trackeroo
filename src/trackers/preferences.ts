import { TRACKER_IDS, TRACKERS } from "./catalog";
import type { Tracker, TrackerId, TrackerPreferences } from "./types";

export const TRACKER_PREFERENCES_KEY = "trackerPreferences";

// Serializes read-modify-write cycles so concurrent toggles (e.g. rapid
// clicks in the popup) cannot clobber each other's writes.
let pendingWrite: Promise<unknown> = Promise.resolve();

function enqueueWrite<T>(task: () => Promise<T>): Promise<T> {
  const run = pendingWrite.then(task);
  pendingWrite = run.catch(() => undefined);
  return run;
}

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

export function setTrackerPreference(
  id: TrackerId,
  enabled: boolean
): Promise<void> {
  return enqueueWrite(async () => {
    const preferences = await readPreferences();
    preferences[id] = enabled;
    await browser.storage.local.set({
      [TRACKER_PREFERENCES_KEY]: preferences,
    });
  });
}

export function setAllTrackerPreferences(
  enabled: boolean
): Promise<TrackerPreferences> {
  return enqueueWrite(async () => {
    const preferences = Object.fromEntries(
      TRACKER_IDS.map((id) => [id, enabled])
    ) as TrackerPreferences;
    await browser.storage.local.set({
      [TRACKER_PREFERENCES_KEY]: preferences,
    });
    return preferences;
  });
}

/** Write defaults on first install so the content script sees a full record. */
export function seedDefaultPreferences(): Promise<void> {
  return enqueueWrite(async () => {
    await browser.storage.local.set({
      [TRACKER_PREFERENCES_KEY]: getDefaultPreferences(),
    });
  });
}

/** Re-persist stored preferences so added/removed trackers are reconciled. */
export function normalizeStoredPreferences(): Promise<void> {
  return enqueueWrite(async () => {
    const preferences = await readPreferences();
    await browser.storage.local.set({
      [TRACKER_PREFERENCES_KEY]: preferences,
    });
  });
}
