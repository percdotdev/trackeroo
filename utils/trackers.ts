import { getSteamProfileBaseUrl } from './steam-profile';

type HostTransform =
  | { type: 'prefix'; value: string }
  | { type: 'tld'; value: string };

export type Tracker = {
  id: string;
  label: string;
  transform: HostTransform;
};

export const TRACKERS: Tracker[] = [
  { id: 'csstats', label: 'CSStats', transform: { type: 'prefix', value: 'x' } },
  { id: 'csrep', label: 'CSRep', transform: { type: 'prefix', value: 'w' } },
  { id: 'csst', label: 'CSST', transform: { type: 'tld', value: 'rip' } },
  { id: 'luminary', label: 'Luminary', transform: { type: 'tld', value: 'pub' } },
  { id: 'leetify', label: 'Leetify', transform: { type: 'tld', value: 'gg' } },
  { id: 'cs2tracker', label: 'CS2 Tracker', transform: { type: 'tld', value: 'tips' } },
];

function applyHostTransform(baseUrl: string, transform: HostTransform): string {
  const url = new URL(baseUrl);

  if (transform.type === 'prefix') {
    url.hostname = `${transform.value}${url.hostname}`;
  } else {
    url.hostname = url.hostname.replace(/\.com$/, `.${transform.value}`);
  }

  return url.toString();
}

export function buildTrackerUrl(pageUrl: string, tracker: Tracker): string | null {
  const baseUrl = getSteamProfileBaseUrl(pageUrl);
  if (!baseUrl) return null;

  return applyHostTransform(baseUrl, tracker.transform);
}
