import { describe, expect, it } from "vitest";
import { applySubstitutions, flattenMessages } from "./messages";

describe("applySubstitutions", () => {
  it("returns the template when there are no substitutions", () => {
    expect(applySubstitutions("Trackers ($1)")).toBe("Trackers ($1)");
  });

  it("substitutes a single value", () => {
    expect(applySubstitutions("Trackers ($1)", "3")).toBe("Trackers (3)");
  });

  it("substitutes multiple positional values", () => {
    expect(applySubstitutions("$1 and $2", ["a", "b"])).toBe("a and b");
  });

  it("keeps placeholders without a matching value", () => {
    expect(applySubstitutions("$1 and $2", ["a"])).toBe("a and $2");
  });
});

describe("flattenMessages", () => {
  it("maps raw chrome i18n entries to plain strings", () => {
    expect(
      flattenMessages({
        extName: { message: "Trackeroo" },
        trackersWithCount: {
          message: "Trackers ($1)",
          placeholders: { count: { content: "$1" } },
        },
      })
    ).toEqual({
      extName: "Trackeroo",
      trackersWithCount: "Trackers ($1)",
    });
  });
});
