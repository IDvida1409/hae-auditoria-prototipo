from pathlib import Path
from PIL import Image, ImageDraw


SOURCE = Path(
    r"C:\Users\idvid.IDVIDA2010\.codex\generated_images\01a044f3-0804-7c61-a99f-a16082250010\call_OsO1RYnUidmnH8d4j4V0WvZS.png"
)
OUT_DIR = Path(__file__).resolve().parents[1] / "assets" / "icons"

ICONS = [
    ("cozinha-catering", (272, 184)),
    ("room-service", (600, 184)),
    ("cozinha-fria-sarp", (929, 184)),
    ("cozinha-sarp", (1258, 184)),
    ("cozinha-pedido-especial", (272, 491)),
    ("saladas", (600, 491)),
    ("distribuicao", (929, 491)),
    ("higienizacao-cubas", (1258, 491)),
    ("higienizacao-louca", (272, 780)),
    ("dml-produto-quimico", (600, 780)),
    ("area-residuos", (929, 780)),
    ("documentacao", (1258, 780)),
]

CROP = 260
MASK_RADIUS = 114
SIZE = 220


def circular_icon(source: Image.Image, center: tuple[int, int]) -> Image.Image:
    half = CROP // 2
    x, y = center
    cropped = source.crop((x - half, y - half, x + half, y + half)).convert("RGBA")

    mask = Image.new("L", cropped.size, 0)
    draw = ImageDraw.Draw(mask)
    cx = CROP // 2
    cy = (CROP // 2) - 8
    draw.ellipse(
        (cx - MASK_RADIUS, cy - MASK_RADIUS, cx + MASK_RADIUS, cy + MASK_RADIUS),
        fill=255,
    )
    cropped.putalpha(mask)
    return cropped.resize((SIZE, SIZE), Image.Resampling.LANCZOS)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    source = Image.open(SOURCE)
    for name, center in ICONS:
        circular_icon(source, center).save(OUT_DIR / f"{name}.png")


if __name__ == "__main__":
    main()
