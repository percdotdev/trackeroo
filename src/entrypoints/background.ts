import {
  normalizeStoredPreferences,
  seedDefaultPreferences,
} from "@/trackers/preferences";

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === "install") {
      seedDefaultPreferences();
      return;
    }
    if (reason === "update") {
      normalizeStoredPreferences();
    }
  });
});
