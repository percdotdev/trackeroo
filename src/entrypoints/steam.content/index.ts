import type { Browser } from "wxt/browser";
import { LOCALE_KEY } from "@/i18n/preference";
import { STEAM_PROFILE_MATCHES } from "@/steam/matches";
import { createTrackerMenuController } from "@/tracker-menu/controller";
import { TRACKER_PREFERENCES_KEY } from "@/trackers/preferences";
import "./style.css";

export default defineContentScript({
  matches: [...STEAM_PROFILE_MATCHES],
  runAt: "document_idle",

  main(ctx) {
    const menu = createTrackerMenuController(ctx);

    menu.sync();

    ctx.addEventListener(window, "popstate", () => {
      menu.invalidate();
      menu.sync();
    });

    const onStorageChanged = (
      changes: Record<string, Browser.storage.StorageChange>,
      area: string
    ) => {
      if (area !== "local") {
        return;
      }
      if (changes[TRACKER_PREFERENCES_KEY] || changes[LOCALE_KEY]) {
        menu.invalidate();
        menu.sync();
      }
    };

    browser.storage.onChanged.addListener(onStorageChanged);
    ctx.onInvalidated(() => {
      browser.storage.onChanged.removeListener(onStorageChanged);
    });
  },
});
