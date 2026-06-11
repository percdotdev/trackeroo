import { beforeEach, describe, expect, it } from "vitest";
import { fakeBrowser } from "wxt/testing";
import { TRACKER_IDS, TRACKERS } from "./catalog";
import {
  getDefaultPreferences,
  getEnabledTrackers,
  getTrackerPreferences,
  normalizeStoredPreferences,
  seedDefaultPreferences,
  setAllTrackerPreferences,
  setTrackerPreference,
  TRACKER_PREFERENCES_KEY,
} from "./preferences";

beforeEach(() => {
  fakeBrowser.reset();
});

describe("getTrackerPreferences", () => {
  it("defaults every tracker to enabled when nothing is stored", async () => {
    expect(await getTrackerPreferences()).toEqual(getDefaultPreferences());
  });

  it("merges partial stored preferences with defaults", async () => {
    await fakeBrowser.storage.local.set({
      [TRACKER_PREFERENCES_KEY]: { csstats: false },
    });

    const preferences = await getTrackerPreferences();
    expect(preferences.csstats).toBe(false);
    expect(preferences.leetify).toBe(true);
  });

  it("ignores corrupt stored values", async () => {
    await fakeBrowser.storage.local.set({
      [TRACKER_PREFERENCES_KEY]: "garbage",
    });

    expect(await getTrackerPreferences()).toEqual(getDefaultPreferences());
  });

  it("falls back to enabled for non-boolean stored values", async () => {
    await fakeBrowser.storage.local.set({
      [TRACKER_PREFERENCES_KEY]: { csstats: "nope", csrep: 0, leetify: false },
    });

    const preferences = await getTrackerPreferences();
    expect(preferences.csstats).toBe(true);
    expect(preferences.csrep).toBe(true);
    expect(preferences.leetify).toBe(false);
  });

  it("drops keys for removed trackers", async () => {
    await fakeBrowser.storage.local.set({
      [TRACKER_PREFERENCES_KEY]: { ghostTracker: true, csstats: false },
    });

    const preferences = await getTrackerPreferences();
    expect(Object.keys(preferences).sort()).toEqual([...TRACKER_IDS].sort());
  });
});

describe("setTrackerPreference", () => {
  it("persists a single toggle", async () => {
    await setTrackerPreference("csstats", false);

    const preferences = await getTrackerPreferences();
    expect(preferences.csstats).toBe(false);
    expect(preferences.csrep).toBe(true);
  });

  it("does not clobber concurrent writes", async () => {
    await Promise.all([
      setTrackerPreference("csstats", false),
      setTrackerPreference("csrep", false),
      setTrackerPreference("leetify", false),
    ]);

    const preferences = await getTrackerPreferences();
    expect(preferences.csstats).toBe(false);
    expect(preferences.csrep).toBe(false);
    expect(preferences.leetify).toBe(false);
  });
});

describe("setAllTrackerPreferences", () => {
  it("turns every tracker off", async () => {
    await setAllTrackerPreferences(false);

    const preferences = await getTrackerPreferences();
    expect(Object.values(preferences).every((value) => !value)).toBe(true);
  });
});

describe("getEnabledTrackers", () => {
  it("returns only enabled trackers in catalog order", async () => {
    await setTrackerPreference("csstats", false);

    const enabled = await getEnabledTrackers();
    expect(enabled.map((tracker) => tracker.id)).toEqual(
      TRACKERS.filter((tracker) => tracker.id !== "csstats").map(
        (tracker) => tracker.id
      )
    );
  });
});

describe("install lifecycle", () => {
  it("seeds defaults on install", async () => {
    await seedDefaultPreferences();

    const { [TRACKER_PREFERENCES_KEY]: stored } =
      await fakeBrowser.storage.local.get(TRACKER_PREFERENCES_KEY);
    expect(stored).toEqual(getDefaultPreferences());
  });

  it("reconciles stored preferences on update", async () => {
    await fakeBrowser.storage.local.set({
      [TRACKER_PREFERENCES_KEY]: { ghostTracker: false, csstats: false },
    });

    await normalizeStoredPreferences();

    const { [TRACKER_PREFERENCES_KEY]: stored } =
      await fakeBrowser.storage.local.get(TRACKER_PREFERENCES_KEY);
    expect(stored).toEqual({ ...getDefaultPreferences(), csstats: false });
  });
});
