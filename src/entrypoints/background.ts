import { handleExtensionInstalled } from '@/preferences/storage';

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(({ reason }) => {
    handleExtensionInstalled(reason);
  });
});
