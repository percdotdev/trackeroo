// Steam vanity IDs only allow ASCII alphanumerics, underscores, and hyphens.
// Requiring a path boundary after the ID rejects malformed segments (e.g.
// percent-encoded characters) instead of truncating them, so crafted URLs
// can't smuggle unexpected path content into generated tracker links.
const PROFILE_PATH_RE = /^\/(id\/[\w-]+|profiles\/\d+)(?=\/|$)/;

export function parseSteamProfilePath(url: string): string | null {
  try {
    const { hostname, pathname } = new URL(url);
    if (hostname !== "steamcommunity.com") {
      return null;
    }

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
