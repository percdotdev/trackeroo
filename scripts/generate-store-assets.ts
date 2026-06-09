#!/usr/bin/env bun
/** Generate Chrome Web Store assets from UI screenshots. */

import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { fromRoot } from "./lib/paths.ts";
import { composePromo, composeScreenshot } from "./lib/store-assets.ts";

const ASSETS_IN = fromRoot("store-assets/source");
const ASSETS_OUT = fromRoot("store-assets");

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main(): Promise<void> {
  await mkdir(ASSETS_OUT, { recursive: true });
  await mkdir(ASSETS_IN, { recursive: true });

  const popupPath = join(ASSETS_IN, "popup.png");
  const dropdownPath = join(ASSETS_IN, "dropdown.png");

  if (!((await exists(popupPath)) && (await exists(dropdownPath)))) {
    console.error(
      `Missing source images. Expected:\n  ${popupPath}\n  ${dropdownPath}`
    );
    process.exit(1);
  }

  const popup = await readFile(popupPath);
  const dropdown = await readFile(dropdownPath);

  for (const path of [
    await composeScreenshot({
      ui: popup,
      title: "Trackeroo",
      subtitle: "Enable or disable CS2 stat trackers from the popup",
      filename: "screenshot-1-settings.png",
      outputDir: ASSETS_OUT,
      uiMaxW: 480,
      uiMaxH: 620,
    }),
    await composeScreenshot({
      ui: dropdown,
      title: "CS2 Trackers",
      subtitle: "Open any tracker from a Steam profile in one click",
      filename: "screenshot-2-dropdown.png",
      outputDir: ASSETS_OUT,
      uiMaxW: 560,
      uiMaxH: 420,
    }),
    await composePromo({
      ui: dropdown,
      filename: "promo-small-440x280.png",
      outputDir: ASSETS_OUT,
    }),
  ]) {
    console.log(`Wrote ${path}`);
  }

  let iconSrc = fromRoot("public/icon/128.png");
  if (!(await exists(iconSrc))) {
    iconSrc = fromRoot(".output/chrome-mv3/icon/128.png");
  }

  if (await exists(iconSrc)) {
    const icon = await sharp(await readFile(iconSrc))
      .resize(128, 128)
      .flatten({ background: "#1b2838" })
      .png()
      .toBuffer();
    const outputPath = join(ASSETS_OUT, "icon-128.png");
    await writeFile(outputPath, icon);
    console.log(`Wrote ${outputPath}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
