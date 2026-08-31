from __future__ import annotations

import json
import re
import sys
import unicodedata
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
WORKBOOK = Path(r"C:\Users\idvid.IDVIDA2010\OneDrive\Desktop\HAE Auditoria -Modelo Cozinha Paciente.xls")
XLRD_PATH = Path(r"C:\Users\idvid.IDVIDA2010\OneDrive\Documentos\New project\.codex_tmp\pydeps_xlrd_clean")
OUTPUT = ROOT / "checklist-data.js"


SHEET_AREA_MAP = {
    "COZ CATERING": "cozinha-catering",
    "ROOM SERVICE": "room-service",
    "COZ FRIA SARP": "cozinha-fria-sarp",
    "COZ SARP": "cozinha-sarp",
    "COZ PEDIDO ESPEC": "cozinha-pedido-especial",
    "SALADAS": "saladas",
    "DISTRIB": "distribuicao",
    "HIG CUBAS": "higienizacao-cubas",
    "DML PROD QUIM": "dml-produto-quimico",
    "DOC": "documentacao",
}


ACRONYMS = {
    "ASO",
    "AVCB",
    "C",
    "DML",
    "EPI",
    "FDS",
    "FISPQ",
    "MBP",
    "NC",
    "PCMSO",
    "PGR",
    "POP",
    "SARP",
    "X",
}


def import_xlrd():
    sys.path.insert(0, str(XLRD_PATH))
    import xlrd  # type: ignore

    return xlrd


def strip_accents(value: str) -> str:
    return "".join(
        ch for ch in unicodedata.normalize("NFKD", value) if not unicodedata.combining(ch)
    )


def norm(value: str) -> str:
    value = strip_accents(value).upper()
    value = re.sub(r"[^A-Z0-9]+", " ", value)
    return re.sub(r"\s+", " ", value).strip()


def clean(value) -> str:
    if value is None:
        return ""
    if isinstance(value, float) and value.is_integer():
        value = int(value)
    text = str(value).replace("\xa0", " ")
    return re.sub(r"\s+", " ", text).strip()


def slugify(value: str) -> str:
    value = strip_accents(value).lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "bloco"


def human_title(value: str) -> str:
    value = clean(value)
    value = value.replace("ACONDIONAMENTO", "ACONDICIONAMENTO")
    words = []
    for raw in value.split(" "):
        token = raw.strip()
        bare = strip_accents(token).upper().strip(":-,.;()")
        if bare in ACRONYMS:
            words.append(token.upper())
        elif len(token) <= 2 and token.lower() in {"e", "a", "o", "as", "os", "de", "do", "da", "dos", "das"}:
            words.append(token.lower())
        else:
            words.append(token[:1].upper() + token[1:].lower())
    return " ".join(words)


def map_sheet(sheet_name: str) -> str | None:
    normalized = norm(sheet_name)
    if normalized in SHEET_AREA_MAP:
        return SHEET_AREA_MAP[normalized]
    if "HIG" in normalized and "LOU" in normalized:
        return "higienizacao-louca"
    if "AREA" in normalized and "RES" in normalized:
        return "area-residuos"
    return None


def is_number(value) -> bool:
    return isinstance(value, (int, float)) and not isinstance(value, bool)


def answer_from_sheet(value: str) -> str | None:
    value = norm(value)
    if value == "S":
        return "C"
    if value == "N":
        return "NC"
    if value == "X":
        return "X"
    return None


def risk_level(risk: float) -> str:
    if risk <= 0:
        return "none"
    if risk <= 4:
        return "baixo"
    if risk <= 8:
        return "moderado"
    if risk <= 16:
        return "medio"
    return "critico"


def allowed_answers(question_text: str) -> list[str]:
    normalized = norm(question_text)
    if "SOMENTE X OU N" in normalized or "DIGITAR SOMENTE X OU N" in normalized:
        return ["NC", "X"]
    return ["C", "NC", "X"]


def unique_block_id(existing: set[str], title: str) -> str:
    base = slugify(title)
    candidate = base
    index = 2
    while candidate in existing:
        candidate = f"{base}-{index}"
        index += 1
    existing.add(candidate)
    return candidate


def is_block_row(sheet, row_index: int, title: str) -> bool:
    if not title or title.lower().startswith("legenda"):
        return False
    if is_number(sheet.cell_value(row_index, 0)):
        return False

    cells = [clean(sheet.cell_value(row_index, col)) for col in range(min(sheet.ncols, 24))]
    normalized_cells = [norm(cell) for cell in cells if cell]
    if "AVALIACAO" in " ".join(normalized_cells):
        return True
    if any(cell in {"RIS", "RIS.", "SEV", "SEV."} for cell in normalized_cells):
        return True
    if len(title) > 7 and norm(cells[18] if len(cells) > 18 else "") == norm(title):
        return True
    return False


def parse_sheet(sheet) -> dict:
    blocks: list[dict] = []
    current: dict | None = None
    block_ids: set[str] = set()

    for row_index in range(sheet.nrows):
        col0 = sheet.cell_value(row_index, 0)
        col1 = sheet.cell_value(row_index, 1) if sheet.ncols > 1 else ""
        title = clean(col0)

        if isinstance(col0, str) and is_block_row(sheet, row_index, title):
            current = {
                "id": unique_block_id(block_ids, title),
                "title": human_title(title),
                "questions": [],
            }
            blocks.append(current)
            continue

        if current is None or not is_number(col0):
            continue

        question_text = clean(col1)
        if not question_text:
            continue

        number = int(col0)
        risk_raw = sheet.cell_value(row_index, 14) if sheet.ncols > 14 else 0
        risk = float(risk_raw) if is_number(risk_raw) else 0.0
        source_answer = answer_from_sheet(clean(sheet.cell_value(row_index, 15) if sheet.ncols > 15 else ""))
        reference = clean(sheet.cell_value(row_index, 21) if sheet.ncols > 21 else "")

        current["questions"].append(
            {
                "id": f"{slugify(current['id'])}-{number}",
                "number": number,
                "text": question_text,
                "risk": risk,
                "riskLevel": risk_level(risk),
                "sourceAnswer": source_answer,
                "allowedAnswers": allowed_answers(question_text),
                "reference": f"Portaria SMS nº 2.619/2011 - item {reference}"
                if reference
                else "Portaria SMS nº 2.619/2011",
            }
        )

    parsed_blocks = [block for block in blocks if block["questions"]]
    total_questions = sum(len(block["questions"]) for block in parsed_blocks)
    return {
        "sheetName": sheet.name,
        "totalQuestions": total_questions,
        "blocks": parsed_blocks,
    }


def main() -> None:
    if not WORKBOOK.exists():
        raise FileNotFoundError(WORKBOOK)

    xlrd = import_xlrd()
    workbook = xlrd.open_workbook(str(WORKBOOK), formatting_info=False)
    data = {}
    for sheet in workbook.sheets():
        area_id = map_sheet(sheet.name)
        if not area_id:
            continue
        data[area_id] = parse_sheet(sheet)

    content = (
        "// Generated from HAE Auditoria -Modelo Cozinha Paciente.xls.\n"
        "// Source of truth: workbook sheets, one sheet per audited area.\n"
        f"window.HAE_CHECKLIST_DATA = {json.dumps(data, ensure_ascii=False, indent=2)};\n"
    )
    OUTPUT.write_text(content, encoding="utf-8")
    print(f"Wrote {OUTPUT}")
    for area_id, area in data.items():
        print(f"{area_id}: {len(area['blocks'])} blocks, {area['totalQuestions']} questions")


if __name__ == "__main__":
    main()
