export type TrackerId =
  | 'csstats'
  | 'csrep'
  | 'csst'
  | 'luminary'
  | 'leetify'
  | 'cs2tracker';

export type HostTransform =
  | { type: 'prefix'; value: string }
  | { type: 'tld'; value: string };

export type Tracker = {
  id: TrackerId;
  label: string;
  transform: HostTransform;
  manualHint: string;
  manualExample: string;
};
