"""Generate Chrome Web Store assets from UI screenshots."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS_IN = ROOT / "store-assets" / "source"
ASSETS_OUT = ROOT / "store-assets"

STEAM_BG = (27, 40, 56)  # #1b2838
STEAM_BG_TOP = (22, 32, 45)
STEAM_ACCENT = (102, 192, 244)  # #66c0f4

SCREENSHOT_W, SCREENSHOT_H = 1280, 800
PROMO_W, PROMO_H = 440, 280


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def gradient_background(width: int, height: int) -> Image.Image:
    img = Image.new("RGB", (width, height), STEAM_BG)
    draw = ImageDraw.Draw(img)
    for y in range(height):
        t = y / max(height - 1, 1)
        r = int(STEAM_BG_TOP[0] + (STEAM_BG[0] - STEAM_BG_TOP[0]) * t)
        g = int(STEAM_BG_TOP[1] + (STEAM_BG[1] - STEAM_BG_TOP[1]) * t)
        b = int(STEAM_BG_TOP[2] + (STEAM_BG[2] - STEAM_BG_TOP[2]) * t)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    return img


def fit_image(img: Image.Image, max_w: int, max_h: int) -> Image.Image:
    w, h = img.size
    scale = min(max_w / w, max_h / h)
    new_size = (max(1, int(w * scale)), max(1, int(h * scale)))
    return img.resize(new_size, Image.Resampling.LANCZOS)


def drop_shadow(img: Image.Image, offset: tuple[int, int] = (0, 12), blur: int = 24) -> Image.Image:
    alpha = img.split()[3] if img.mode == "RGBA" else Image.new("L", img.size, 255)
    shadow = Image.new("RGBA", (img.width + blur * 2, img.height + blur * 2), (0, 0, 0, 0))
    shadow_layer = Image.new("RGBA", img.size, (0, 0, 0, 180))
    shadow.paste(shadow_layer, (blur + offset[0], blur + offset[1]), alpha)
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    out = Image.new("RGBA", shadow.size, (0, 0, 0, 0))
    out.alpha_composite(shadow)
    out.alpha_composite(img, (blur, blur))
    return out


def compose_screenshot(
    ui: Image.Image,
    *,
    title: str,
    subtitle: str,
    filename: str,
    ui_max_w: int = 520,
    ui_max_h: int = 560,
) -> None:
    canvas = gradient_background(SCREENSHOT_W, SCREENSHOT_H)
    draw = ImageDraw.Draw(canvas)

    title_font = load_font(42, bold=True)
    subtitle_font = load_font(22)

    draw.text((72, 64), title, fill=(255, 255, 255), font=title_font)
    draw.text((72, 118), subtitle, fill=(159, 176, 194), font=subtitle_font)

    accent_y = 160
    draw.rectangle([(72, accent_y), (152, accent_y + 4)], fill=STEAM_ACCENT)

    ui_rgba = ui.convert("RGBA")
    ui_scaled = fit_image(ui_rgba, ui_max_w, ui_max_h)
    ui_card = drop_shadow(ui_scaled)

    x = SCREENSHOT_W - ui_card.width - 96
    y = (SCREENSHOT_H - ui_card.height) // 2 + 24
    canvas.paste(ui_card, (x, y), ui_card)
    canvas.save(ASSETS_OUT / filename, format="PNG", optimize=True)
    print(f"Wrote {ASSETS_OUT / filename}")


def compose_promo(ui: Image.Image, *, filename: str) -> None:
    canvas = gradient_background(PROMO_W, PROMO_H)
    draw = ImageDraw.Draw(canvas)

    title_font = load_font(24, bold=True)
    subtitle_font = load_font(13)

    draw.text((20, 18), "Trackeroo", fill=(255, 255, 255), font=title_font)
    draw.text((20, 48), "CS2 trackers on Steam profiles", fill=(159, 176, 194), font=subtitle_font)
    draw.rectangle([(20, 72), (72, 75)], fill=STEAM_ACCENT)

    ui_rgba = ui.convert("RGBA")
    ui_scaled = fit_image(ui_rgba, 190, 170)
    ui_card = drop_shadow(ui_scaled, offset=(0, 6), blur=12)
    canvas.paste(ui_card, (PROMO_W - ui_card.width - 16, PROMO_H - ui_card.height - 10), ui_card)
    canvas.save(ASSETS_OUT / filename, format="PNG", optimize=True)
    print(f"Wrote {ASSETS_OUT / filename}")


def main() -> None:
    ASSETS_OUT.mkdir(parents=True, exist_ok=True)
    ASSETS_IN.mkdir(parents=True, exist_ok=True)

    popup_path = ASSETS_IN / "popup.png"
    dropdown_path = ASSETS_IN / "dropdown.png"

    if not popup_path.exists() or not dropdown_path.exists():
        raise SystemExit(
            f"Missing source images. Expected:\n  {popup_path}\n  {dropdown_path}"
        )

    popup = Image.open(popup_path)
    dropdown = Image.open(dropdown_path)

    compose_screenshot(
        popup,
        title="Trackeroo",
        subtitle="Enable or disable CS2 stat trackers from the popup",
        filename="screenshot-1-settings.png",
        ui_max_w=480,
        ui_max_h=620,
    )

    compose_screenshot(
        dropdown,
        title="CS2 Trackers",
        subtitle="Open any tracker from a Steam profile in one click",
        filename="screenshot-2-dropdown.png",
        ui_max_w=560,
        ui_max_h=420,
    )

    compose_promo(dropdown, filename="promo-small-440x280.png")

    icon_src = ROOT / "public" / "icon" / "128.png"
    if not icon_src.exists():
        icon_src = ROOT / ".output" / "chrome-mv3" / "icon" / "128.png"
    if icon_src.exists():
        icon = Image.open(icon_src).convert("RGB")
        icon = icon.resize((128, 128), Image.Resampling.LANCZOS)
        icon.save(ASSETS_OUT / "icon-128.png", format="PNG", optimize=True)
        print(f"Wrote {ASSETS_OUT / 'icon-128.png'}")


if __name__ == "__main__":
    main()
