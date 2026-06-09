import type { ContentScriptContext } from '#imports';
import { getEnabledTrackers } from '@/preferences/storage';
import { getSteamProfileBaseUrl } from '@/steam/profile-url';
import { mountDropdown } from './bind-dropdown';
import { STEAM_SIDEBAR_ANCHOR, TRACKEROO_ROOT_ATTR } from './constants';

export function createTrackerDropdownController(ctx: ContentScriptContext) {
  let ui: ReturnType<typeof createIntegratedUi> | null = null;
  let mountedFor: string | null = null;

  const teardown = () => {
    ui?.remove();
    ui = null;
    mountedFor = null;
  };

  const sync = async () => {
    const baseUrl = getSteamProfileBaseUrl(location.href);
    const anchor = document.querySelector(STEAM_SIDEBAR_ANCHOR);
    const enabledTrackers = await getEnabledTrackers();

    if (!baseUrl || !anchor || enabledTrackers.length === 0) {
      teardown();
      return;
    }

    if (mountedFor === baseUrl && document.querySelector(`[${TRACKEROO_ROOT_ATTR}]`)) {
      return;
    }

    teardown();
    mountedFor = baseUrl;

    ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: STEAM_SIDEBAR_ANCHOR,
      append: 'first',
      onMount(container) {
        container.setAttribute(TRACKEROO_ROOT_ATTR, '');
        mountDropdown(ctx, container, enabledTrackers, location.href);
      },
    });

    ui.mount();
  };

  const invalidate = () => {
    mountedFor = null;
  };

  return { sync, invalidate, teardown };
}
