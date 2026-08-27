import type { Tracker } from "./types";

export const TRACKERS: Tracker[] = [
  {
    id: "csstats",
    homeUrl: "https://csstats.gg",
    transform: { type: "prefix", value: "x" },
  },
  {
    id: "csrep",
    homeUrl: "https://csrep.gg",
    transform: { type: "prefix", value: "w" },
  },
  {
    id: "csst",
    homeUrl: "https://csst.at",
    transform: { type: "tld", value: "rip" },
  },
  {
    id: "luminary",
    homeUrl: "https://luminary.pw",
    transform: { type: "tld", value: "pub" },
  },
  {
    id: "leetify",
    homeUrl: "https://leetify.com",
    transform: { type: "tld", value: "gg" },
  },
  {
    id: "cs2tracker",
    homeUrl: "https://cs2tracker.gg",
    transform: { type: "tld", value: "ai" },
  },
  {
    id: "scope",
    homeUrl: "https://scope.gg",
    transform: { type: "tld", value: "org" },
  },
  {
    id: "cstracker",
    homeUrl: "https://cstracker.gg",
    transform: { type: "tld", value: "now" },
  },
];

export const TRACKER_IDS = TRACKERS.map((tracker) => tracker.id);

const WWW_PREFIX = /^www\./;

export function getTrackerHost(tracker: Tracker): string {
  return new URL(tracker.homeUrl).hostname.replace(WWW_PREFIX, "");
}
