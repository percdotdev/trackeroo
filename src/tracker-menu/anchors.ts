import {
  STEAM_SIDEBAR_ANCHOR,
  STEAM_SIDEBAR_FALLBACK_ANCHOR,
} from "./constants";

export interface SidebarAnchor {
  isFallback: boolean;
  selector: string;
}

export function resolveSidebarAnchor(): SidebarAnchor | null {
  if (document.querySelector(STEAM_SIDEBAR_ANCHOR)) {
    return { selector: STEAM_SIDEBAR_ANCHOR, isFallback: false };
  }

  if (document.querySelector(STEAM_SIDEBAR_FALLBACK_ANCHOR)) {
    return { selector: STEAM_SIDEBAR_FALLBACK_ANCHOR, isFallback: true };
  }

  return null;
}
