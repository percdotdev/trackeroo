import { getSteamProfileBaseUrl } from "@/steam/profile-url";
import type { HostTransform, Tracker } from "./types";

const COM_TLD_SUFFIX = /\.com$/;

function applyHostTransform(baseUrl: string, transform: HostTransform): string {
  const url = new URL(baseUrl);

  if (transform.type === "prefix") {
    url.hostname = `${transform.value}${url.hostname}`;
  } else {
    url.hostname = url.hostname.replace(COM_TLD_SUFFIX, `.${transform.value}`);
  }

  return url.toString();
}

export function buildTrackerUrl(
  pageUrl: string,
  tracker: Tracker
): string | null {
  const baseUrl = getSteamProfileBaseUrl(pageUrl);
  if (!baseUrl) {
    return null;
  }

  return applyHostTransform(baseUrl, tracker.transform);
}
