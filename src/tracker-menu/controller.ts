import type { ContentScriptContext } from "#imports";
import { initI18n } from "@/i18n/runtime";
import { getSteamProfileBaseUrl } from "@/steam/profile-url";
import { getEnabledTrackers } from "@/trackers/preferences";
import { resolveSidebarAnchor } from "./anchors";
import { TRACKEROO_ROOT_ATTR } from "./constants";
import { mountTrackerUi } from "./mount";

export function createTrackerMenuController(ctx: ContentScriptContext) {
  let ui: ReturnType<typeof createIntegratedUi> | null = null;
  let mountedFor: string | null = null;
  let mountedKey = "";

  const teardown = () => {
    ui?.remove();
    ui = null;
    mountedFor = null;
    mountedKey = "";
  };

  const sync = async () => {
    await initI18n();

    const baseUrl = getSteamProfileBaseUrl(location.href);
    const sidebar = resolveSidebarAnchor();
    const enabledTrackers = await getEnabledTrackers();

    if (!(baseUrl && sidebar)) {
      teardown();
      return;
    }

    const trackerKey = enabledTrackers.map((tracker) => tracker.id).join(",");
    if (
      mountedFor === baseUrl &&
      mountedKey === trackerKey &&
      document.querySelector(`[${TRACKEROO_ROOT_ATTR}]`)
    ) {
      return;
    }

    teardown();
    mountedFor = baseUrl;
    mountedKey = trackerKey;

    ui = createIntegratedUi(ctx, {
      position: "inline",
      anchor: sidebar.selector,
      append: "first",
      onMount(container) {
        let mountTarget = container;

        if (sidebar.isFallback) {
          const wrapper = document.createElement("div");
          wrapper.className = "responsive_count_link_area";
          container.append(wrapper);
          mountTarget = wrapper;
        }

        mountTarget.setAttribute(TRACKEROO_ROOT_ATTR, "");
        mountTrackerUi(ctx, mountTarget, enabledTrackers, location.href);
      },
    });

    ui.mount();
  };

  const invalidate = () => {
    mountedFor = null;
    mountedKey = "";
  };

  return { sync, invalidate, teardown };
}
