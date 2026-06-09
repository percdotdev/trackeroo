import {
  TRACKERS,
  type Tracker,
  type TrackerId,
  TRACKER_IDS,
} from './trackers';

export const SETTINGS_KEY = 'trackerPreferences';

export type TrackerPreferences = Record<TrackerId, boolean>;

export function getDefaultPreferences(): TrackerPreferences {
  return Object.fromEntries(
    TRACKER_IDS.map((id) => [id, true]),
  ) as TrackerPreferences;
}

function normalizePreferences(stored: unknown): TrackerPreferences {
  const source =
    stored && typeof stored === 'object'
      ? (stored as Partial<TrackerPreferences>)
      : {};

  return Object.fromEntries(
    TRACKER_IDS.map((id) => [id, source[id] ?? true]),
  ) as TrackerPreferences;
}

async function readPreferences(): Promise<TrackerPreferences> {
  const { [SETTINGS_KEY]: stored } = await browser.storage.local.get(SETTINGS_KEY);
  const preferences = normalizePreferences(stored);

  if (!stored) {
    await browser.storage.local.set({ [SETTINGS_KEY]: preferences });
  }

  return preferences;
}

export async function getTrackerPreferences(): Promise<TrackerPreferences> {
  try {
    return await readPreferences();
  } catch {
    return getDefaultPreferences();
  }
}

export async function setTrackerPreference(
  id: TrackerId,
  enabled: boolean,
): Promise<void> {
  const preferences = await readPreferences();
  preferences[id] = enabled;
  await browser.storage.local.set({ [SETTINGS_KEY]: preferences });
}

export async function getEnabledTrackers(): Promise<Tracker[]> {
  const preferences = await getTrackerPreferences();
  return TRACKERS.filter((tracker) => preferences[tracker.id]);
}
