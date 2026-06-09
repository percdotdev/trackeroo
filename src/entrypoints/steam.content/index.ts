import { SETTINGS_KEY, handleExtensionInstalled } from '@/preferences/storage';
import { STEAM_PROFILE_MATCHES } from '@/lib/constants';
import { createTrackerDropdownController } from '@/steam-ui/controller';
import './style.css';

export default defineContentScript({
  matches: [...STEAM_PROFILE_MATCHES],
  runAt: 'document_idle',

  main(ctx) {
    const dropdown = createTrackerDropdownController(ctx);

    dropdown.sync();

    ctx.addEventListener(window, 'popstate', () => {
      dropdown.invalidate();
      dropdown.sync();
    });

    browser.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes[SETTINGS_KEY]) {
        dropdown.invalidate();
        dropdown.sync();
      }
    });
  },
});
