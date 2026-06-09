import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const STEAM_BG = "rgb(27, 40, 56)";
const STEAM_BG_TOP = "rgb(22, 32, 45)";
const STEAM_ACCENT = "#66c0f4";

export function gradientBackground(width: number, height: number): Buffer {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${STEAM_BG_TOP}" />
      <stop offset="100%" stop-color="${STEAM_BG}" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)" />
</svg>`;

  return Buffer.from(svg);
}

export async function fitImage(
  input: Buffer,
  maxW: number,
  maxH: number
): Promise<Buffer> {
  const meta = await sharp(input).metadata();
  const width = meta.width ?? maxW;
  const height = meta.height ?? maxH;
  const scale = Math.min(maxW / width, maxH / height);
  const newW = Math.max(1, Math.round(width * scale));
  const newH = Math.max(1, Math.round(height * scale));

  return sharp(input).resize(newW, newH, { fit: "inside" }).png().toBuffer();
}

export async function dropShadow(
  input: Buffer,
  offset: { x: number; y: number } = { x: 0, y: 12 },
  blur = 24
): Promise<{ image: Buffer; width: number; height: number }> {
  const meta = await sharp(input).metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  const pad = blur * 2;
  const canvasW = width + pad * 2;
  const canvasH = height + pad * 2;
  const b64 = input.toString("base64");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasW}" height="${canvasH}">
  <defs>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="${offset.x}" dy="${offset.y}" stdDeviation="${blur / 2}" flood-color="#000000" flood-opacity="0.7" />
    </filter>
  </defs>
  <image x="${pad}" y="${pad}" width="${width}" height="${height}" href="data:image/png;base64,${b64}" filter="url(#shadow)" />
</svg>`;

  const image = await sharp(Buffer.from(svg)).png().toBuffer();
  const rendered = await sharp(image).metadata();

  return {
    image,
    width: rendered.width ?? canvasW,
    height: rendered.height ?? canvasH,
  };
}

interface ScreenshotOptions {
  canvasH?: number;
  canvasW?: number;
  filename: string;
  outputDir: string;
  subtitle: string;
  title: string;
  ui: Buffer;
  uiMaxH?: number;
  uiMaxW?: number;
}

export async function composeScreenshot({
  ui,
  title,
  subtitle,
  filename,
  outputDir,
  canvasW = 1280,
  canvasH = 800,
  uiMaxW = 520,
  uiMaxH = 560,
}: ScreenshotOptions): Promise<string> {
  const uiScaled = await fitImage(ui, uiMaxW, uiMaxH);
  const card = await dropShadow(uiScaled);
  const x = canvasW - card.width - 96;
  const y = Math.floor((canvasH - card.height) / 2) + 24;

  const overlaySvg =
    Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${canvasW}" height="${canvasH}">
  <text x="72" y="98" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="42" font-weight="700">${escapeXml(title)}</text>
  <text x="72" y="142" fill="#9fb0c2" font-family="Segoe UI, Arial, sans-serif" font-size="22">${escapeXml(subtitle)}</text>
  <rect x="72" y="160" width="80" height="4" fill="${STEAM_ACCENT}" />
</svg>`);

  const outputPath = join(outputDir, filename);

  const png = await sharp(gradientBackground(canvasW, canvasH))
    .resize(canvasW, canvasH)
    .composite([
      { input: overlaySvg, top: 0, left: 0 },
      { input: card.image, top: y, left: x },
    ])
    .png()
    .toBuffer();

  await writeFile(outputPath, png);
  return outputPath;
}

interface PromoOptions {
  canvasH?: number;
  canvasW?: number;
  filename: string;
  outputDir: string;
  ui: Buffer;
}

export async function composePromo({
  ui,
  filename,
  outputDir,
  canvasW = 440,
  canvasH = 280,
}: PromoOptions): Promise<string> {
  const uiScaled = await fitImage(ui, 190, 170);
  const card = await dropShadow(uiScaled, { x: 0, y: 6 }, 12);
  const x = canvasW - card.width - 16;
  const y = canvasH - card.height - 10;

  const overlaySvg =
    Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${canvasW}" height="${canvasH}">
  <text x="20" y="38" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700">Trackeroo</text>
  <text x="20" y="60" fill="#9fb0c2" font-family="Segoe UI, Arial, sans-serif" font-size="13">CS2 trackers on Steam profiles</text>
  <rect x="20" y="72" width="52" height="3" fill="${STEAM_ACCENT}" />
</svg>`);

  const outputPath = join(outputDir, filename);

  const png = await sharp(gradientBackground(canvasW, canvasH))
    .resize(canvasW, canvasH)
    .composite([
      { input: overlaySvg, top: 0, left: 0 },
      { input: card.image, top: y, left: x },
    ])
    .png()
    .toBuffer();

  await writeFile(outputPath, png);
  return outputPath;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
