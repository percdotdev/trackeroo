import type { ContentScriptContext } from "#imports";
import type { Tracker } from "@/trackers/types";
import { mountDropdown } from "./bind-dropdown";
import { createDirectLink, createEmptyState } from "./create-dropdown";

export function mountTrackerUi(
  ctx: ContentScriptContext,
  container: HTMLElement,
  enabledTrackers: Tracker[],
  pageUrl: string
): void {
  container.replaceChildren();

  if (enabledTrackers.length === 0) {
    container.className = "trackeroo-root trackeroo-root--empty";
    container.append(createEmptyState());
    return;
  }

  if (enabledTrackers.length === 1) {
    const link = createDirectLink(enabledTrackers[0], pageUrl);
    if (!link) {
      return;
    }

    container.className = "trackeroo-root trackeroo-root--direct";
    container.append(link);
    return;
  }

  mountDropdown(ctx, container, enabledTrackers, pageUrl);
}
