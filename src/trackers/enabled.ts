import { getTrackerPreferences } from "@/preferences/storage";
import { TRACKERS } from "./catalog";
import type { Tracker } from "./types";

export async function getEnabledTrackers(): Promise<Tracker[]> {
  const preferences = await getTrackerPreferences();
  return TRACKERS.filter((tracker) => preferences[tracker.id]);
}
