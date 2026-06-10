import { t } from "@/i18n/runtime";
import { buildTrackerUrl } from "@/trackers/build-url";
import { getTrackerHost } from "@/trackers/catalog";
import type { Tracker } from "@/trackers/types";

function createCountLabel(text: string): HTMLSpanElement {
  const label = document.createElement("span");
  label.className = "count_link_label";
  label.textContent = text;
  return label;
}

function createTrackerAnchor(tracker: Tracker, url: string): HTMLAnchorElement {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.textContent = getTrackerHost(tracker);
  return anchor;
}

export function createDropdownMenu(
  enabledTrackers: Tracker[],
  pageUrl: string
): HTMLDivElement {
  const menu = document.createElement("div");
  menu.className = "trackeroo-menu";
  menu.setAttribute("role", "menu");
  menu.hidden = true;

  for (const tracker of enabledTrackers) {
    const url = buildTrackerUrl(pageUrl, tracker);
    if (!url) {
      continue;
    }

    const item = createTrackerAnchor(tracker, url);
    item.className = "trackeroo-menu-item";
    item.setAttribute("role", "menuitem");
    menu.append(item);
  }

  return menu;
}

export function createDropdownTrigger(count: number): HTMLDivElement {
  const trigger = document.createElement("div");
  trigger.className = "profile_count_link ellipsis trackeroo-trigger";
  trigger.setAttribute("role", "button");
  trigger.setAttribute("tabindex", "0");
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-haspopup", "true");

  const link = document.createElement("a");
  link.href = "#";
  link.className = "trackeroo-trigger-link";
  link.tabIndex = -1;

  const label =
    count > 0 ? t("trackersWithCount", String(count)) : t("trackers");
  const caret = document.createElement("span");
  caret.className = "profile_count_link_total";
  caret.textContent = "▾";

  link.append(createCountLabel(label), "\u00a0", caret);
  trigger.append(link);

  return trigger;
}

export function createDirectLink(
  tracker: Tracker,
  pageUrl: string
): HTMLAnchorElement | null {
  const url = buildTrackerUrl(pageUrl, tracker);
  if (!url) {
    return null;
  }

  const link = createTrackerAnchor(tracker, url);
  link.className = "profile_count_link ellipsis trackeroo-direct-link";
  link.replaceChildren(createCountLabel(getTrackerHost(tracker)));
  return link;
}

export function createEmptyState(): HTMLDivElement {
  const el = document.createElement("div");
  el.className = "profile_count_link ellipsis trackeroo-empty";
  el.title = t("emptyStateTitle");
  el.append(createCountLabel(t("noTrackersEnabled")));
  return el;
}
