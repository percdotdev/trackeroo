# Trackeroo

CS2 stat tracker links on Steam Community profile pages. Adds a dropdown on `/id/*` and `/profiles/*` profiles.

**Chrome Web Store:** submitted, pending review.

## Trackers

| Site | Trick |
| --- | --- |
| CSStats | `xsteamcommunity.com/...` |
| CSRep | `wsteamcommunity.com/...` |
| CSST | `steamcommunity.rip/...` |
| Luminary | `steamcommunity.pub/...` |
| Leetify | `steamcommunity.gg/...` |
| CS2 Tracker | `steamcommunity.ai/...` |
| Scope.gg | `steamcommunity.org/...` |
| CS2Scan | `steamcommunity.to/...` |

Toggle trackers in the extension popup. [Privacy policy](PRIVACY.md).

## Development

```bash
bun install
bun run dev      # .output/chrome-mv3-dev
bun run build
bun run zip
bun run release  # version bump + tag
```

## Contributing

Use the [tracker request issue](https://github.com/percdotdev/trackeroo/issues/new?template=tracker-request.yml) — name, URL trick, and an example URL. PRs to `src/trackers/catalog.ts` also welcome.
