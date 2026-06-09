import { buildTrackerUrl } from '@/trackers/build-url';
import type { Tracker } from '@/trackers/types';

export function createDropdownMenu(
  enabledTrackers: Tracker[],
  pageUrl: string,
): HTMLDivElement {
  const menu = document.createElement('div');
  menu.className = 'trackeroo-menu';
  menu.setAttribute('role', 'menu');
  menu.hidden = true;

  for (const tracker of enabledTrackers) {
    const url = buildTrackerUrl(pageUrl, tracker);
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

  return menu;
}

export function createDropdownTrigger(): HTMLDivElement {
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

  return trigger;
}
