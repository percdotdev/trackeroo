"""Generate Trackeroo extension icons for WXT and Chrome Web Store."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
ICON_DIR = ROOT / "public" / "icon"
STORE_DIR = ROOT / "store-assets"
SIZES = (16, 32, 48, 96, 128)

BG = (27, 40, 56)  # #1b2838
ACCENT = (102, 192, 244)  # #66c0f4
ACCENT_DARK = (42, 71, 94)  # #2a475e
WHITE = (235, 244, 250)


def draw_icon(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    pad = max(1, round(size * 0.08))
    radius = max(2, round(size * 0.22))
    box = [pad, pad, size - pad - 1, size - pad - 1]
    draw.rounded_rectangle(box, radius=radius, fill=BG, outline=ACCENT_DARK, width=max(1, size // 32))

    cx = cy = size / 2
    ring_r = size * 0.28
    ring_w = max(2, round(size * 0.07))
    draw.ellipse(
        [cx - ring_r, cy - ring_r, cx + ring_r, cy + ring_r],
        outline=ACCENT,
        width=ring_w,
    )

    line_len = size * 0.34
    line_w = max(2, round(size * 0.065))
    for angle in (0, 90, 180, 270):
        rad = math.radians(angle)
        inner = ring_r * 0.55
        outer = line_len
        x1 = cx + math.cos(rad) * inner
        y1 = cy + math.sin(rad) * inner
        x2 = cx + math.cos(rad) * outer
        y2 = cy + math.sin(rad) * outer
        draw.line([(x1, y1), (x2, y2)], fill=ACCENT, width=line_w)

    dot_r = max(2, round(size * 0.09))
    draw.ellipse(
        [cx - dot_r, cy - dot_r, cx + dot_r, cy + dot_r],
        fill=WHITE,
    )

    tick_r = ring_r * 1.05
    tick_len = max(2, round(size * 0.05))
    for angle in (45, 135, 225, 315):
        rad = math.radians(angle)
        x1 = cx + math.cos(rad) * tick_r
        y1 = cy + math.sin(rad) * tick_r
        x2 = cx + math.cos(rad) * (tick_r + tick_len)
        y2 = cy + math.sin(rad) * (tick_r + tick_len)
        draw.line([(x1, y1), (x2, y2)], fill=ACCENT, width=max(1, size // 40))

    return img


def main() -> None:
    ICON_DIR.mkdir(parents=True, exist_ok=True)
    STORE_DIR.mkdir(parents=True, exist_ok=True)

    for size in SIZES:
        icon = draw_icon(size)
        icon.save(ICON_DIR / f"{size}.png", format="PNG", optimize=True)
        print(f"Wrote {ICON_DIR / f'{size}.png'}")

    icon_128 = draw_icon(128).convert("RGB")
    icon_128.save(STORE_DIR / "icon-128.png", format="PNG", optimize=True)
    print(f"Wrote {STORE_DIR / 'icon-128.png'}")


if __name__ == "__main__":
    main()
