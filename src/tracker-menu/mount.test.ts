import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ContentScriptContext } from "#imports";
import type { Tracker } from "@/trackers/types";
import { mountTrackerUi } from "./mount";

vi.mock("@/i18n/runtime", () => ({
  t: (messageName: string) => messageName,
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

// Forwards listener registration like the real context, minus auto-cleanup.
const ctx = {
  addEventListener: (
    target: EventTarget,
    type: string,
    handler: EventListenerOrEventListenerObject
  ) => {
    target.addEventListener(type, handler);
  },
} as unknown as ContentScriptContext;

function mount(enabledTrackers: Tracker[]): HTMLElement {
  const container = document.createElement("div");
  document.body.append(container);
  mountTrackerUi(ctx, container, enabledTrackers, PROFILE_URL);
  return container;
}

beforeEach(() => {
  document.body.replaceChildren();
});

describe("mountTrackerUi", () => {
  it("shows the empty state when no trackers are enabled", () => {
    const container = mount([]);

    expect(container.className).toContain("trackeroo-root--empty");
    expect(container.querySelector(".trackeroo-empty")).not.toBeNull();
  });

  it("renders a direct link for a single enabled tracker", () => {
    const container = mount([trackers[0]]);

    const link = container.querySelector<HTMLAnchorElement>(
      ".trackeroo-direct-link"
    );
    expect(container.className).toContain("trackeroo-root--direct");
    expect(link?.href).toBe("https://xsteamcommunity.com/id/gaben");
  });

  it("renders a dropdown for multiple enabled trackers", () => {
    const container = mount(trackers);

    expect(container.querySelector(".trackeroo-trigger")).not.toBeNull();
    expect(
      container.querySelector<HTMLElement>(".trackeroo-menu")?.hidden
    ).toBe(true);
  });
});

describe("dropdown interaction", () => {
  it("opens on trigger click and closes on escape", () => {
    const container = mount(trackers);
    const trigger = container.querySelector<HTMLElement>(".trackeroo-trigger");
    const menu = container.querySelector<HTMLElement>(".trackeroo-menu");

    trigger?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(menu?.hidden).toBe(false);
    expect(trigger?.getAttribute("aria-expanded")).toBe("true");
    expect(container.classList.contains("is-open")).toBe(true);

    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true })
    );
    expect(menu?.hidden).toBe(true);
    expect(trigger?.getAttribute("aria-expanded")).toBe("false");
  });

  it("closes when clicking outside", () => {
    const container = mount(trackers);
    const trigger = container.querySelector<HTMLElement>(".trackeroo-trigger");
    const menu = container.querySelector<HTMLElement>(".trackeroo-menu");

    trigger?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(menu?.hidden).toBe(false);

    document.body.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(menu?.hidden).toBe(true);
  });

  it("supports keyboard navigation between menu items", () => {
    const container = mount(trackers);
    const trigger = container.querySelector<HTMLElement>(".trackeroo-trigger");
    const menu = container.querySelector<HTMLElement>(".trackeroo-menu");
    const items = [
      ...container.querySelectorAll<HTMLElement>(".trackeroo-menu-item"),
    ];

    trigger?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
    );
    expect(menu?.hidden).toBe(false);
    expect(document.activeElement).toBe(items[0]);

    menu?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
    );
    expect(document.activeElement).toBe(items[1]);

    menu?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
    );
    expect(document.activeElement).toBe(items[0]);

    menu?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "End", bubbles: true })
    );
    expect(document.activeElement).toBe(items.at(-1));
  });
});
