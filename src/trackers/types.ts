export type TrackerId =
  | "csstats"
  | "csrep"
  | "csst"
  | "luminary"
  | "leetify"
  | "cs2tracker"
  | "scope";

export type HostTransform =
  | { type: "prefix"; value: string }
  | { type: "tld"; value: string };

export interface Tracker {
  homeUrl: string;
  id: TrackerId;
  transform: HostTransform;
}
