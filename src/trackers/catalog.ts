import type { Tracker } from './types';

export const TRACKERS: Tracker[] = [
  {
    id: 'csstats',
    label: 'CSStats',
    transform: { type: 'prefix', value: 'x' },
    manualHint: 'Add x before steamcommunity',
    manualExample: 'xsteamcommunity.com/id/player',
  },
  {
    id: 'csrep',
    label: 'CSRep',
    transform: { type: 'prefix', value: 'w' },
    manualHint: 'Add w before steamcommunity',
    manualExample: 'wsteamcommunity.com/id/player',
  },
  {
    id: 'csst',
    label: 'CSST',
    transform: { type: 'tld', value: 'rip' },
    manualHint: 'Change .com to .rip',
    manualExample: 'steamcommunity.rip/id/player',
  },
  {
    id: 'luminary',
    label: 'Luminary',
    transform: { type: 'tld', value: 'pub' },
    manualHint: 'Change .com to .pub',
    manualExample: 'steamcommunity.pub/id/player',
  },
  {
    id: 'leetify',
    label: 'Leetify',
    transform: { type: 'tld', value: 'gg' },
    manualHint: 'Change .com to .gg',
    manualExample: 'steamcommunity.gg/id/player',
  },
  {
    id: 'cs2tracker',
    label: 'CS2 Tracker',
    transform: { type: 'tld', value: 'tips' },
    manualHint: 'Change .com to .tips',
    manualExample: 'steamcommunity.tips/id/player',
  },
];

export const TRACKER_IDS = TRACKERS.map((tracker) => tracker.id);
