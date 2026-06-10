# AGENTS.md

Guidance for AI agents working in this repository.

## Project overview

Trackeroo is a Chrome MV3 browser extension (WXT + React + TypeScript) that injects a **Trackers** dropdown on Steam Community profile pages and links to CS2 stat tracker sites. There is no backend server or database.

## Cursor Cloud specific instructions

### Runtime

- **Bun** is the required package manager (`bun.lock`). If `bun` is not on `PATH`, install with: `curl -fsSL https://bun.sh/install | bash` (adds `~/.bun/bin` to PATH via `~/.bashrc`).
- Node.js is present but not the primary toolchain; always use Bun for install and scripts.

### Dependency refresh

From repo root:

```bash
bun install --frozen-lockfile
```

`postinstall` runs `wxt prepare`; `prepare` runs Husky.

### Lint, typecheck, and build (CI parity)

Matches `.github/workflows/ci.yml`:

```bash
bun run check          # Ultracite (Biome)
bun run check:locales  # locale key parity vs en
bun run compile        # tsc --noEmit
bun run build          # production extension → .output/chrome-mv3
```

There is no automated E2E test suite in CI.

### Dev server

```bash
bun run dev
```

- WXT dev server defaults to **http://localhost:3000** (may use 3000–3010 if busy).
- Output: `.output/chrome-mv3-dev`
- WXT may auto-open Chromium; if the extension is not loaded, open `chrome://extensions`, enable Developer mode, and **Load unpacked** → `.output/chrome-mv3-dev`.

### Manual E2E verification

1. Load the dev or built extension in Chromium (Chrome, Brave, or Edge).
2. Visit a public Steam profile, e.g. `https://steamcommunity.com/id/gaben`.
3. Confirm **Trackers** appears in the profile sidebar; open the toolbar popup to toggle trackers.

Content script matches: `steamcommunity.com/id/*` and `steamcommunity.com/profiles/*`.

### Git hooks

Pre-commit (`.husky/pre-commit`) runs `bun x ultracite fix` on staged files.

### Optional targets

- `bun run dev:firefox` / `bun run build:firefox` for Firefox builds.
- Release-only: `.env.submit` / Chrome Web Store submit (not needed for local dev).
