import { describe, expect, it } from "vitest";
import { buildTrackerUrl } from "./build-url";
import { getTrackerHost, TRACKER_IDS, TRACKERS } from "./catalog";

const PROFILE_URL = "https://steamcommunity.com/id/gaben";

describe("tracker catalog", () => {
  it("has unique tracker ids", () => {
    expect(new Set(TRACKER_IDS).size).toBe(TRACKERS.length);
  });

  it("produces a valid url for every tracker", () => {
    for (const tracker of TRACKERS) {
      const url = buildTrackerUrl(PROFILE_URL, tracker);
      expect(url, tracker.id).not.toBeNull();
      expect(() => new URL(url as string), tracker.id).not.toThrow();
      expect(url, tracker.id).not.toBe(PROFILE_URL);
    }
  });

  it("uses valid home urls", () => {
    for (const tracker of TRACKERS) {
      expect(() => new URL(tracker.homeUrl), tracker.id).not.toThrow();
    }
  });
});

describe("getTrackerHost", () => {
  it("returns the bare hostname", () => {
    expect(
      getTrackerHost({
        id: "csstats",
        homeUrl: "https://csstats.gg",
        transform: { type: "prefix", value: "x" },
      })
    ).toBe("csstats.gg");
  });

  it("strips a www prefix", () => {
    expect(
      getTrackerHost({
        id: "leetify",
        homeUrl: "https://www.leetify.com/path",
        transform: { type: "tld", value: "gg" },
      })
    ).toBe("leetify.com");
  });
});
