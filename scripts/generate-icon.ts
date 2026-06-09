#!/usr/bin/env bun
/** Generate Trackeroo extension icons for WXT and Chrome Web Store. */

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { fromRoot } from "./lib/paths.ts";

const ICON_DIR = fromRoot("public/icon");
const STORE_DIR = fromRoot("store-assets");
const SIZES = [16, 32, 48, 96, 128] as const;

const BG = "#1b2838";
const ACCENT = "#66c0f4";
const ACCENT_DARK = "#2a475e";
const WHITE = "#ebf4fa";

function iconSvg(size: number): string {
  const pad = Math.max(1, Math.round(size * 0.08));
  const radius = Math.max(2, Math.round(size * 0.22));
  const boxSize = size - pad * 2 - 1;
  const outlineWidth = Math.max(1, Math.floor(size / 32));
  const cx = size / 2;
  const cy = size / 2;
  const ringR = size * 0.28;
  const ringW = Math.max(2, Math.round(size * 0.07));
  const lineLen = size * 0.34;
  const lineW = Math.max(2, Math.round(size * 0.065));
  const dotR = Math.max(2, Math.round(size * 0.09));
  const tickR = ringR * 1.05;
  const tickLen = Math.max(2, Math.round(size * 0.05));
  const tickW = Math.max(1, Math.floor(size / 40));

  const crosshairLines = [0, 90, 180, 270]
    .map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const inner = ringR * 0.55;
      const x1 = cx + Math.cos(rad) * inner;
      const y1 = cy + Math.sin(rad) * inner;
      const x2 = cx + Math.cos(rad) * lineLen;
      const y2 = cy + Math.sin(rad) * lineLen;
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${ACCENT}" stroke-width="${lineW}" stroke-linecap="round" />`;
    })
    .join("\n    ");

  const tickLines = [45, 135, 225, 315]
    .map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = cx + Math.cos(rad) * tickR;
      const y1 = cy + Math.sin(rad) * tickR;
      const x2 = cx + Math.cos(rad) * (tickR + tickLen);
      const y2 = cy + Math.sin(rad) * (tickR + tickLen);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${ACCENT}" stroke-width="${tickW}" stroke-linecap="round" />`;
    })
    .join("\n    ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect x="${pad}" y="${pad}" width="${boxSize}" height="${boxSize}" rx="${radius}" ry="${radius}" fill="${BG}" stroke="${ACCENT_DARK}" stroke-width="${outlineWidth}" />
  <circle cx="${cx}" cy="${cy}" r="${ringR}" fill="none" stroke="${ACCENT}" stroke-width="${ringW}" />
  ${crosshairLines}
  <circle cx="${cx}" cy="${cy}" r="${dotR}" fill="${WHITE}" />
  ${tickLines}
</svg>`;
}

async function main(): Promise<void> {
  await mkdir(ICON_DIR, { recursive: true });
  await mkdir(STORE_DIR, { recursive: true });

  for (const size of SIZES) {
    const png = await sharp(Buffer.from(iconSvg(size)))
      .png()
      .toBuffer();
    const path = join(ICON_DIR, `${size}.png`);
    await writeFile(path, png);
    console.log(`Wrote ${path}`);
  }

  const storeIcon = await sharp(Buffer.from(iconSvg(128)))
    .flatten({ background: BG })
    .png()
    .toBuffer();
  const storePath = join(STORE_DIR, "icon-128.png");
  await writeFile(storePath, storeIcon);
  console.log(`Wrote ${storePath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
