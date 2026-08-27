# Trackeroo

Opens CS2 stat sites from Steam profile pages. On any profile, use the **Trackers** menu in the sidebar and pick where you want to go.

Live on the [Chrome Web Store](https://chromewebstore.google.com/detail/trackeroo/lpfonmobeihcnogioihjlnhhiblimkjp) — the store build may trail the latest release while an update is in review.

## Install

Install from the [Chrome Web Store](https://chromewebstore.google.com/detail/trackeroo/lpfonmobeihcnogioihjlnhhiblimkjp). Works in Chrome, Brave, Edge, and the Steam in-game browser.

To run the latest build before it's published, load unpacked from a release zip (see [Releases](https://github.com/percdotdev/trackeroo/releases)).

## Trackers

[CSStats](https://csstats.gg) · [CSRep](https://csrep.gg) · [CSST](https://csst.at) · [Luminary](https://luminary.pw) · [Leetify](https://leetify.com) · [CS2 Tracker](https://cs2tracker.gg) · [Scope.gg](https://scope.gg) · [cstracker.gg](https://cstracker.gg)

Turn individual sites on or off from the extension icon (popup → Trackers).

## Suggest a site

Know another tracker that works with the Steam profile URL trick? [Open a tracker request](https://github.com/percdotdev/trackeroo/issues/new?template=tracker-request.yml) with the site name and how the URL changes. No coding needed.

[Privacy policy](PRIVACY.md)

## Developers

The source layout follows the features of the extension:

- `src/trackers/` — tracker catalog, URL building, and preferences. New trackers go in `src/trackers/catalog.ts`.
- `src/tracker-menu/` — the menu injected into Steam profile sidebars.
- `src/popup/` — the toolbar popup (React).
- `src/steam/` — Steam profile URL parsing and match patterns.
- `src/i18n/` — supported locales and runtime translations.
- `src/entrypoints/` — thin WXT wiring for the background, content script, and popup.

Common commands: `bun run dev` (live reload), `bun run test` (Vitest), `bun run check` (lint), `bun run compile` (typecheck).

PRs welcome.
