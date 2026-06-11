import { describe, expect, it } from "vitest";
import { getSteamProfileBaseUrl, parseSteamProfilePath } from "./profile-url";

describe("parseSteamProfilePath", () => {
  it("parses vanity profile urls", () => {
    expect(parseSteamProfilePath("https://steamcommunity.com/id/gaben")).toBe(
      "id/gaben"
    );
  });

  it("parses steam64 profile urls", () => {
    expect(
      parseSteamProfilePath(
        "https://steamcommunity.com/profiles/76561197960287930"
      )
    ).toBe("profiles/76561197960287930");
  });

  it("strips sub-pages, queries, and hashes", () => {
    expect(
      parseSteamProfilePath(
        "https://steamcommunity.com/id/gaben/games/?tab=all#section"
      )
    ).toBe("id/gaben");
  });

  it("handles trailing slashes", () => {
    expect(parseSteamProfilePath("https://steamcommunity.com/id/gaben/")).toBe(
      "id/gaben"
    );
  });

  it("accepts http urls", () => {
    expect(parseSteamProfilePath("http://steamcommunity.com/id/gaben")).toBe(
      "id/gaben"
    );
  });

  it("accepts vanity ids with underscores and hyphens", () => {
    expect(
      parseSteamProfilePath("https://steamcommunity.com/id/ttv_gaben-2")
    ).toBe("id/ttv_gaben-2");
  });

  it("rejects non-numeric steam64 ids", () => {
    expect(
      parseSteamProfilePath("https://steamcommunity.com/profiles/notanid")
    ).toBeNull();
  });

  it("rejects steam64 ids with trailing junk", () => {
    expect(
      parseSteamProfilePath("https://steamcommunity.com/profiles/123abc")
    ).toBeNull();
  });

  it("rejects vanity ids with invalid or percent-encoded characters", () => {
    expect(
      parseSteamProfilePath("https://steamcommunity.com/id/..%2F..%2Fevil")
    ).toBeNull();
    expect(
      parseSteamProfilePath("https://steamcommunity.com/id/foo bar")
    ).toBeNull();
    expect(
      parseSteamProfilePath("https://steamcommunity.com/id/foo.bar")
    ).toBeNull();
  });

  it("rejects other steamcommunity pages", () => {
    expect(
      parseSteamProfilePath("https://steamcommunity.com/market/listings/730")
    ).toBeNull();
  });

  it("rejects other hosts", () => {
    expect(parseSteamProfilePath("https://example.com/id/gaben")).toBeNull();
    expect(
      parseSteamProfilePath("https://fakesteamcommunity.com/id/gaben")
    ).toBeNull();
  });

  it("rejects invalid urls", () => {
    expect(parseSteamProfilePath("not a url")).toBeNull();
    expect(parseSteamProfilePath("")).toBeNull();
  });
});

describe("getSteamProfileBaseUrl", () => {
  it("normalizes to a canonical https base url", () => {
    expect(
      getSteamProfileBaseUrl("http://steamcommunity.com/id/gaben/badges?l=en")
    ).toBe("https://steamcommunity.com/id/gaben");
  });

  it("returns null for non-profile urls", () => {
    expect(getSteamProfileBaseUrl("https://steamcommunity.com/")).toBeNull();
  });
});
