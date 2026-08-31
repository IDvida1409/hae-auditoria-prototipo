from pathlib import Path
from PIL import Image
import math

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(
    r"C:\Users\idvid.IDVIDA2010\.codex\generated_images\01a044f3-0804-7c61-a99f-a16082250010\call_qAvhiDBddz8O3EbtdtKZAADk.png"
)

ICONS = {
    "dashboard": (207, 205),
    "audit": (509, 205),
    "audits": (805, 205),
    "chart": (1099, 205),
    "action-plan": (207, 517),
    "documents": (508, 517),
    "reports": (804, 517),
    "tables": (1100, 517),
    "ncs": (207, 823),
    "critical": (508, 823),
    "trend-down": (805, 823),
    "late": (1098, 823),
    "trend-up": (1335, 823),
}

OUT_SIZE = 256
CROP_SIZE = 282
RADIUS = 110
MAIN_BLUE = (31, 111, 189)


def foreground_mask(crop):
    mask = Image.new("L", crop.size, 0)
    pixels = crop.convert("RGB").load()
    mask_pixels = mask.load()
    cx = crop.size[0] / 2
    cy = crop.size[1] / 2
    for y in range(crop.size[1]):
        for x in range(crop.size[0]):
            if math.hypot(x - cx, y - cy) > RADIUS:
                continue
            r, g, b = pixels[x, y]
            brightness = max(r, g, b)
            spread = max(r, g, b) - min(r, g, b)
            if brightness > 130 or (brightness > 105 and spread > 58):
                alpha = min(255, max(0, int((brightness - 98) * 4.2)))
                mask_pixels[x, y] = alpha
    return mask


def normalize_icon(image):
    bbox = image.getbbox()
    if not bbox:
        return image.resize((OUT_SIZE, OUT_SIZE), Image.Resampling.LANCZOS)
    cropped = image.crop(bbox)
    scale = min(222 / cropped.width, 222 / cropped.height)
    new_size = (max(1, int(cropped.width * scale)), max(1, int(cropped.height * scale)))
    cropped = cropped.resize(new_size, Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (OUT_SIZE, OUT_SIZE), (0, 0, 0, 0))
    canvas.alpha_composite(cropped, ((OUT_SIZE - new_size[0]) // 2, (OUT_SIZE - new_size[1]) // 2))
    return canvas


def recolor(icon, variant):
    rgba = icon.convert("RGBA")
    pixels = rgba.load()
    for y in range(rgba.height):
        for x in range(rgba.width):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue
            if variant == "white":
                pixels[x, y] = (255, 255, 255, a)
                continue

            brightness = max(r, g, b)
            spread = max(r, g, b) - min(r, g, b)
            if brightness > 145 and spread < 55:
                pixels[x, y] = (*MAIN_BLUE, a)
    return rgba


def main():
    src = Image.open(SOURCE).convert("RGBA")
    for variant in ("white", "blue"):
        target_dir = ROOT / "assets" / "ui-icons-approved" / variant
        target_dir.mkdir(parents=True, exist_ok=True)

    for name, (cx, cy) in ICONS.items():
        left = int(cx - CROP_SIZE / 2)
        top = int(cy - CROP_SIZE / 2)
        crop = src.crop((left, top, left + CROP_SIZE, top + CROP_SIZE))
        mask = foreground_mask(crop)
        transparent = crop.copy()
        transparent.putalpha(mask)
        normalized = normalize_icon(transparent)

        for variant in ("white", "blue"):
            output = recolor(normalized, variant)
            output.save(ROOT / "assets" / "ui-icons-approved" / variant / f"{name}.png")

    print(f"Exported {len(ICONS)} approved PNG icons.")


if __name__ == "__main__":
    main()
