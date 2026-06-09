import { TRACKERS, buildTrackerUrl } from '@/utils/trackers';
import { getSteamProfileBaseUrl } from '@/utils/steam-profile';
import './style.css';

const ROOT_ATTR = 'data-trackeroo';
const ANCHOR = '.responsive_count_link_area';

export default defineContentScript({
  matches: [
    '*://steamcommunity.com/id/*',
    '*://steamcommunity.com/profiles/*',
  ],
  runAt: 'document_idle',

  main(ctx) {
    let ui: ReturnType<typeof createIntegratedUi> | null = null;
    let mountedFor: string | null = null;

    const sync = () => {
      const baseUrl = getSteamProfileBaseUrl(location.href);
      const anchor = document.querySelector(ANCHOR);

      if (!baseUrl || !anchor) {
        ui?.remove();
        ui = null;
        mountedFor = null;
        return;
      }

      if (mountedFor === baseUrl && document.querySelector(`[${ROOT_ATTR}]`)) {
        return;
      }

      ui?.remove();
      mountedFor = baseUrl;

      ui = createIntegratedUi(ctx, {
        position: 'inline',
        anchor: ANCHOR,
        append: 'first',
        onMount(container) {
          container.setAttribute(ROOT_ATTR, '');
          container.className = 'trackeroo-root';

          const trigger = document.createElement('div');
          trigger.className = 'profile_count_link ellipsis trackeroo-trigger';
          trigger.setAttribute('role', 'button');
          trigger.setAttribute('tabindex', '0');
          trigger.setAttribute('aria-expanded', 'false');
          trigger.setAttribute('aria-haspopup', 'true');
          trigger.innerHTML =
            '<a href="#" class="trackeroo-trigger-link" tabindex="-1">' +
            '<span class="count_link_label">CS2 Trackers</span>&nbsp;' +
            '<span class="profile_count_link_total">▾</span>' +
            '</a>';

          const menu = document.createElement('div');
          menu.className = 'trackeroo-menu';
          menu.setAttribute('role', 'menu');
          menu.hidden = true;

          for (const tracker of TRACKERS) {
            const url = buildTrackerUrl(location.href, tracker);
            if (!url) continue;

            const item = document.createElement('a');
            item.className = 'trackeroo-menu-item';
            item.href = url;
            item.target = '_blank';
            item.rel = 'noopener noreferrer';
            item.setAttribute('role', 'menuitem');
            item.textContent = tracker.label;
            menu.append(item);
          }

          const setOpen = (open: boolean) => {
            container.classList.toggle('is-open', open);
            trigger.setAttribute('aria-expanded', String(open));
            menu.hidden = !open;
          };

          const close = () => setOpen(false);

          ctx.addEventListener(trigger, 'click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            setOpen(menu.hidden);
          });

          ctx.addEventListener(trigger, 'keydown', (event) => {
            if (!(event instanceof KeyboardEvent)) return;
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setOpen(menu.hidden);
            }
            if (event.key === 'ArrowDown' && menu.hidden) {
              event.preventDefault();
              setOpen(true);
              menu.querySelector<HTMLElement>('.trackeroo-menu-item')?.focus();
            }
          });

          ctx.addEventListener(document, 'click', (event) => {
            if (!container.contains(event.target as Node)) close();
          });

          ctx.addEventListener(document, 'keydown', (event) => {
            if (event instanceof KeyboardEvent && event.key === 'Escape') {
              close();
            }
          });

          container.append(trigger, menu);
        },
      });

      ui.mount();
    };

    sync();
    ctx.addEventListener(window, 'popstate', sync);
  },
});
