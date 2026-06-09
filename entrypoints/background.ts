import {
  getDefaultPreferences,
  getTrackerPreferences,
  SETTINGS_KEY,
} from '@/utils/settings';

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(async ({ reason }) => {
    if (reason === 'install') {
      await browser.storage.local.set({
        [SETTINGS_KEY]: getDefaultPreferences(),
      });
      return;
    }

    if (reason === 'update') {
      const preferences = await getTrackerPreferences();
      await browser.storage.local.set({ [SETTINGS_KEY]: preferences });
    }
  });
});
