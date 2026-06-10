import { describe, expect, it } from "vitest";
import { buildTrackerUrl } from "./build-url";
import type { Tracker } from "./types";

const PROFILE_URL = "https://steamcommunity.com/id/gaben";

const prefixTracker: Tracker = {
  id: "csstats",
  homeUrl: "https://csstats.gg",
  transform: { type: "prefix", value: "x" },
};

const tldTracker: Tracker = {
  id: "leetify",
  homeUrl: "https://leetify.com",
  transform: { type: "tld", value: "gg" },
};

describe("buildTrackerUrl", () => {
  it("applies prefix transforms to the steam hostname", () => {
    expect(buildTrackerUrl(PROFILE_URL, prefixTracker)).toBe(
      "https://xsteamcommunity.com/id/gaben"
    );
  });

  it("applies tld transforms to the steam hostname", () => {
    expect(buildTrackerUrl(PROFILE_URL, tldTracker)).toBe(
      "https://steamcommunity.gg/id/gaben"
    );
  });

  it("works for steam64 profile urls", () => {
    expect(
      buildTrackerUrl(
        "https://steamcommunity.com/profiles/76561197960287930",
        tldTracker
      )
    ).toBe("https://steamcommunity.gg/profiles/76561197960287930");
  });

  it("normalizes sub-pages before transforming", () => {
    expect(
      buildTrackerUrl(`${PROFILE_URL}/games/?tab=all`, prefixTracker)
    ).toBe("https://xsteamcommunity.com/id/gaben");
  });

  it("returns null for non-profile urls", () => {
    expect(
      buildTrackerUrl("https://steamcommunity.com/market", prefixTracker)
    ).toBeNull();
    expect(buildTrackerUrl("not a url", prefixTracker)).toBeNull();
  });
});
