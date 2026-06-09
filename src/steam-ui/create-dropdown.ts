import { t } from '@/lib/i18n';
import { getTrackerHost } from '@/trackers/catalog';
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
    item.textContent = getTrackerHost(tracker);
    menu.append(item);
  }

  return menu;
}

export function createDropdownTrigger(count: number): HTMLDivElement {
  const trigger = document.createElement('div');
  trigger.className = 'profile_count_link ellipsis trackeroo-trigger';
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('tabindex', '0');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-haspopup', 'true');

  const label = count > 0 ? t('trackersWithCount', String(count)) : t('trackers');
  trigger.innerHTML =
    '<a href="#" class="trackeroo-trigger-link" tabindex="-1">' +
    `<span class="count_link_label">${label}</span>&nbsp;` +
    '<span class="profile_count_link_total">▾</span>' +
    '</a>';

  return trigger;
}

export function createDirectLink(tracker: Tracker, pageUrl: string): HTMLAnchorElement | null {
  const url = buildTrackerUrl(pageUrl, tracker);
  if (!url) return null;

  const link = document.createElement('a');
  link.className = 'profile_count_link ellipsis trackeroo-direct-link';
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.innerHTML = `<span class="count_link_label">${getTrackerHost(tracker)}</span>`;
  return link;
}

export function createEmptyState(): HTMLDivElement {
  const el = document.createElement('div');
  el.className = 'profile_count_link ellipsis trackeroo-empty';
  el.title = t('emptyStateTitle');
  el.innerHTML = `<span class="count_link_label">${t('noTrackersEnabled')}</span>`;
  return el;
}
