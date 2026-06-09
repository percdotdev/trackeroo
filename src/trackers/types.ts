export type TrackerId =
  | 'csstats'
  | 'csrep'
  | 'csst'
  | 'luminary'
  | 'leetify'
  | 'cs2tracker'
  | 'scope';

export type HostTransform =
  | { type: 'prefix'; value: string }
  | { type: 'tld'; value: string };

export type Tracker = {
  id: TrackerId;
  homeUrl: string;
  transform: HostTransform;
};
