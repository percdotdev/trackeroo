const PROFILE_PATH_RE = /^\/(id\/[^/?#]+|profiles\/\d+)/;

export function parseSteamProfilePath(url: string): string | null {
  try {
    const { hostname, pathname } = new URL(url);
    if (hostname !== 'steamcommunity.com') return null;

    const match = pathname.match(PROFILE_PATH_RE);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

export function getSteamProfileBaseUrl(url: string): string | null {
  const path = parseSteamProfilePath(url);
  return path ? `https://steamcommunity.com/${path}` : null;
}
