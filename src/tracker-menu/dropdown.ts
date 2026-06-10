import type { ContentScriptContext } from "#imports";
import type { Tracker } from "@/trackers/types";
import { createDropdownMenu, createDropdownTrigger } from "./elements";

interface DropdownControls {
  close: () => void;
  menu: HTMLDivElement;
  setOpen: (open: boolean) => void;
  trigger: HTMLDivElement;
}

function getMenuItems(menu: HTMLDivElement): HTMLElement[] {
  return [...menu.querySelectorAll<HTMLElement>(".trackeroo-menu-item")];
}

function bindMenuKeyboard(
  ctx: ContentScriptContext,
  menu: HTMLDivElement,
  close: () => void
): void {
  ctx.addEventListener(menu, "keydown", (event: Event) => {
    if (!(event instanceof KeyboardEvent)) {
      return;
    }

    const items = getMenuItems(menu);
    if (items.length === 0) {
      return;
    }

    const index = items.indexOf(document.activeElement as HTMLElement);

    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        const next = index < 0 ? 0 : (index + 1) % items.length;
        items[next]?.focus();
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        const prev =
          index < 0
            ? items.length - 1
            : (index - 1 + items.length) % items.length;
        items[prev]?.focus();
        break;
      }
      case "Home":
        event.preventDefault();
        items[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        items.at(-1)?.focus();
        break;
      case "Escape":
        event.preventDefault();
        close();
        break;
      default:
        break;
    }
  });
}

export function mountDropdown(
  ctx: ContentScriptContext,
  container: HTMLElement,
  enabledTrackers: Tracker[],
  pageUrl: string
): DropdownControls {
  container.className = "trackeroo-root";

  const trigger = createDropdownTrigger(enabledTrackers.length);
  const menu = createDropdownMenu(enabledTrackers, pageUrl);

  const setOpen = (open: boolean) => {
    container.classList.toggle("is-open", open);
    trigger.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
  };

  const close = () => setOpen(false);

  ctx.addEventListener(trigger, "click", (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(menu.hidden);
  });

  ctx.addEventListener(trigger, "keydown", (event: Event) => {
    if (!(event instanceof KeyboardEvent)) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(menu.hidden);
      if (!menu.hidden) {
        getMenuItems(menu)[0]?.focus();
      }
    }
    if (event.key === "ArrowDown" && menu.hidden) {
      event.preventDefault();
      setOpen(true);
      getMenuItems(menu)[0]?.focus();
    }
  });

  ctx.addEventListener(document, "click", (event: Event) => {
    if (!container.contains(event.target as Node)) {
      close();
    }
  });

  ctx.addEventListener(document, "keydown", (event: Event) => {
    if (!(event instanceof KeyboardEvent) || event.key !== "Escape") {
      return;
    }
    if (!menu.hidden) {
      close();
    }
  });

  bindMenuKeyboard(ctx, menu, close);

  container.append(trigger, menu);

  return { trigger, menu, setOpen, close };
}
