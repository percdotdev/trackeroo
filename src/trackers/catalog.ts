import type { Tracker } from './types';

export const TRACKERS: Tracker[] = [
  {
    id: 'csstats',
    label: 'CSStats',
    homeUrl: 'https://csstats.gg',
    transform: { type: 'prefix', value: 'x' },
    manualHint: 'Add x before steamcommunity',
    manualExample: 'xsteamcommunity.com/id/player',
  },
  {
    id: 'csrep',
    label: 'CSRep',
    homeUrl: 'https://csrep.gg',
    transform: { type: 'prefix', value: 'w' },
    manualHint: 'Add w before steamcommunity',
    manualExample: 'wsteamcommunity.com/id/player',
  },
  {
    id: 'csst',
    label: 'CSST',
    homeUrl: 'https://csst.at',
    transform: { type: 'tld', value: 'rip' },
    manualHint: 'Change .com to .rip',
    manualExample: 'steamcommunity.rip/id/player',
  },
  {
    id: 'luminary',
    label: 'Luminary',
    homeUrl: 'https://luminary.pw',
    transform: { type: 'tld', value: 'pub' },
    manualHint: 'Change .com to .pub',
    manualExample: 'steamcommunity.pub/id/player',
  },
  {
    id: 'leetify',
    label: 'Leetify',
    homeUrl: 'https://leetify.com',
    transform: { type: 'tld', value: 'gg' },
    manualHint: 'Change .com to .gg',
    manualExample: 'steamcommunity.gg/id/player',
  },
  {
    id: 'cs2tracker',
    label: 'CS2 Tracker',
    homeUrl: 'https://cs2tracker.gg',
    transform: { type: 'tld', value: 'ai' },
    manualHint: 'Change .com to .ai',
    manualExample: 'steamcommunity.ai/id/player',
  },
  {
    id: 'scope',
    label: 'Scope.gg',
    homeUrl: 'https://scope.gg',
    transform: { type: 'tld', value: 'org' },
    manualHint: 'Change .com to .org',
    manualExample: 'steamcommunity.org/id/player',
  },
];

export const TRACKER_IDS = TRACKERS.map((tracker) => tracker.id);
