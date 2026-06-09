import type { ContentScriptContext } from '#imports';
import { initI18n } from '@/lib/i18n';
import { getEnabledTrackers } from '@/preferences/storage';
import { getSteamProfileBaseUrl } from '@/steam/profile-url';
import { STEAM_SIDEBAR_ANCHOR, TRACKEROO_ROOT_ATTR } from './constants';
import { mountTrackerUi } from './mount-ui';

export function createTrackerDropdownController(ctx: ContentScriptContext) {
  let ui: ReturnType<typeof createIntegratedUi> | null = null;
  let mountedFor: string | null = null;
  let mountedKey = '';

  const teardown = () => {
    ui?.remove();
    ui = null;
    mountedFor = null;
    mountedKey = '';
  };

  const sync = async () => {
    await initI18n();

    const baseUrl = getSteamProfileBaseUrl(location.href);
    const anchor = document.querySelector(STEAM_SIDEBAR_ANCHOR);
    const enabledTrackers = await getEnabledTrackers();

    if (!baseUrl || !anchor) {
      teardown();
      return;
    }

    const trackerKey = enabledTrackers.map((tracker) => tracker.id).join(',');
    if (
      mountedFor === baseUrl
      && mountedKey === trackerKey
      && document.querySelector(`[${TRACKEROO_ROOT_ATTR}]`)
    ) {
      return;
    }

    teardown();
    mountedFor = baseUrl;
    mountedKey = trackerKey;

    ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: STEAM_SIDEBAR_ANCHOR,
      append: 'first',
      onMount(container) {
        container.setAttribute(TRACKEROO_ROOT_ATTR, '');
        mountTrackerUi(ctx, container, enabledTrackers, location.href);
      },
    });

    ui.mount();
  };

  const invalidate = () => {
    mountedFor = null;
    mountedKey = '';
  };

  return { sync, invalidate, teardown };
}
