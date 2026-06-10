import { describe, expect, it, vi } from "vitest";
import type { Tracker } from "@/trackers/types";
import {
  createDirectLink,
  createDropdownMenu,
  createDropdownTrigger,
  createEmptyState,
} from "./elements";

vi.mock("@/i18n/runtime", () => ({
  t: (messageName: string, substitutions?: string | string[]) => {
    const values = Array.isArray(substitutions)
      ? substitutions.join(",")
      : substitutions;
    return values ? `${messageName}:${values}` : messageName;
  },
}));

const PROFILE_URL = "https://steamcommunity.com/id/gaben";

const trackers: Tracker[] = [
  {
    id: "csstats",
    homeUrl: "https://csstats.gg",
    transform: { type: "prefix", value: "x" },
  },
  {
    id: "leetify",
    homeUrl: "https://leetify.com",
    transform: { type: "tld", value: "gg" },
  },
];

describe("createDropdownMenu", () => {
  it("renders a menu item per tracker", () => {
    const menu = createDropdownMenu(trackers, PROFILE_URL);
    const items = [...menu.querySelectorAll(".trackeroo-menu-item")];

    expect(menu.getAttribute("role")).toBe("menu");
    expect(menu.hidden).toBe(true);
    expect(items).toHaveLength(2);

    const [first, second] = items as HTMLAnchorElement[];
    expect(first.href).toBe("https://xsteamcommunity.com/id/gaben");
    expect(first.textContent).toBe("csstats.gg");
    expect(first.getAttribute("role")).toBe("menuitem");
    expect(first.target).toBe("_blank");
    expect(first.rel).toBe("noopener noreferrer");
    expect(second.href).toBe("https://steamcommunity.gg/id/gaben");
  });

  it("skips trackers when the page url is not a profile", () => {
    const menu = createDropdownMenu(trackers, "https://example.com");
    expect(menu.querySelectorAll(".trackeroo-menu-item")).toHaveLength(0);
  });
});

describe("createDropdownTrigger", () => {
  it("renders an accessible trigger with a count label", () => {
    const trigger = createDropdownTrigger(2);

    expect(trigger.getAttribute("role")).toBe("button");
    expect(trigger.getAttribute("aria-haspopup")).toBe("true");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.querySelector(".count_link_label")?.textContent).toBe(
      "trackersWithCount:2"
    );
  });

  it("omits the count when no trackers are enabled", () => {
    const trigger = createDropdownTrigger(0);
    expect(trigger.querySelector(".count_link_label")?.textContent).toBe(
      "trackers"
    );
  });
});

describe("createDirectLink", () => {
  it("links straight to the tracker", () => {
    const link = createDirectLink(trackers[0], PROFILE_URL);

    expect(link?.href).toBe("https://xsteamcommunity.com/id/gaben");
    expect(link?.querySelector(".count_link_label")?.textContent).toBe(
      "csstats.gg"
    );
  });

  it("returns null for non-profile urls", () => {
    expect(createDirectLink(trackers[0], "https://example.com")).toBeNull();
  });
});

describe("createEmptyState", () => {
  it("explains how to enable trackers", () => {
    const empty = createEmptyState();

    expect(empty.title).toBe("emptyStateTitle");
    expect(empty.querySelector(".count_link_label")?.textContent).toBe(
      "noTrackersEnabled"
    );
  });
});
