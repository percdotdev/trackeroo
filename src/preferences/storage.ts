import { TRACKER_IDS, TRACKERS } from "@/trackers/catalog";
import type { Tracker, TrackerId } from "@/trackers/types";
import type { TrackerPreferences } from "./types";

export const SETTINGS_KEY = "trackerPreferences";

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
  const { [SETTINGS_KEY]: stored } =
    await browser.storage.local.get(SETTINGS_KEY);
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
  enabled: boolean
): Promise<void> {
  const preferences = await readPreferences();
  preferences[id] = enabled;
  await browser.storage.local.set({ [SETTINGS_KEY]: preferences });
}

export async function setAllTrackerPreferences(
  enabled: boolean
): Promise<TrackerPreferences> {
  const preferences = Object.fromEntries(
    TRACKER_IDS.map((id) => [id, enabled])
  ) as TrackerPreferences;
  await browser.storage.local.set({ [SETTINGS_KEY]: preferences });
  return preferences;
}

export async function getEnabledTrackers(): Promise<Tracker[]> {
  const preferences = await getTrackerPreferences();
  return TRACKERS.filter((tracker) => preferences[tracker.id]);
}

export async function handleExtensionInstalled(reason: string): Promise<void> {
  if (reason === "install") {
    await browser.storage.local.set({
      [SETTINGS_KEY]: getDefaultPreferences(),
    });
    return;
  }

  if (reason === "update") {
    const preferences = await getTrackerPreferences();
    await browser.storage.local.set({ [SETTINGS_KEY]: preferences });
  }
}
