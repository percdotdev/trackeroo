import type { ContentScriptContext } from '#imports';
import type { Tracker } from '@/trackers/types';
import { createDropdownMenu, createDropdownTrigger } from './create-dropdown';

type DropdownControls = {
  trigger: HTMLDivElement;
  menu: HTMLDivElement;
  setOpen: (open: boolean) => void;
  close: () => void;
};

export function mountDropdown(
  ctx: ContentScriptContext,
  container: HTMLElement,
  enabledTrackers: Tracker[],
  pageUrl: string,
): DropdownControls {
  container.className = 'trackeroo-root';

  const trigger = createDropdownTrigger();
  const menu = createDropdownMenu(enabledTrackers, pageUrl);

  const setOpen = (open: boolean) => {
    container.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
  };

  const close = () => setOpen(false);

  ctx.addEventListener(trigger, 'click', (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(menu.hidden);
  });

  ctx.addEventListener(trigger, 'keydown', (event: Event) => {
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

  ctx.addEventListener(document, 'click', (event: Event) => {
    if (!container.contains(event.target as Node)) close();
  });

  ctx.addEventListener(document, 'keydown', (event: Event) => {
    if (event instanceof KeyboardEvent && event.key === 'Escape') close();
  });

  container.append(trigger, menu);

  return { trigger, menu, setOpen, close };
}
