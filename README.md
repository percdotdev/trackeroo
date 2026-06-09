# Trackeroo

Browser extension that adds a **CS2 Trackers** menu to Steam profile pages. One click opens the player's stats on third-party tracker sites — no copy-paste, no URL hacking.

Works on vanity profiles (`/id/username`) and SteamID64 profiles (`/profiles/7656119…`).

## Supported trackers

| Site | URL trick |
| --- | --- |
| CSStats | `x` + steamcommunity.com |
| CSRep | `w` + steamcommunity.com |
| CSST | `.com` → `.rip` |
| Luminary | `.com` → `.pub` |
| Leetify | `.com` → `.gg` |
| CS2 Tracker | `.com` → `.tips` |

Example: `steamcommunity.com/id/player` → `steamcommunity.gg/id/player`

Enable or disable individual trackers from the extension popup. All are on by default.

## Development

Requires [Bun](https://bun.sh) (or npm/pnpm).

```bash
bun install
bun run dev
```

Load the unpacked extension from `.output/chrome-mv3-dev` (or let WXT open the browser for you).

```bash
bun run build   # production build → .output/chrome-mv3
bun run zip     # packaged zip for store upload
```

## Contributing

Tracker site missing? Open an [issue](https://github.com/percdotdev/trackeroo/issues) or [PR](https://github.com/percdotdev/trackeroo) — tracker definitions live in `src/trackers/catalog.ts`.
