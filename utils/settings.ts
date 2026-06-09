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

export async function getTrackerPreferences(): Promise<TrackerPreferences> {
  const { [SETTINGS_KEY]: stored } = await browser.storage.sync.get(SETTINGS_KEY);
  const defaults = getDefaultPreferences();

  if (!stored || typeof stored !== 'object') return defaults;

  return {
    ...defaults,
    ...(stored as Partial<TrackerPreferences>),
  };
}

export async function setTrackerPreference(
  id: TrackerId,
  enabled: boolean,
): Promise<void> {
  const preferences = await getTrackerPreferences();
  preferences[id] = enabled;
  await browser.storage.sync.set({ [SETTINGS_KEY]: preferences });
}

export async function getEnabledTrackers(): Promise<Tracker[]> {
  const preferences = await getTrackerPreferences();
  return TRACKERS.filter((tracker) => preferences[tracker.id]);
}
