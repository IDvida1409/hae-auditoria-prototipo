from __future__ import annotations

import importlib.util
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BUILDER_PATH = ROOT / "tools" / "build-checklist-data.py"
OUTPUT_PATH = ROOT / "checklist-data.js"


def load_builder():
    spec = importlib.util.spec_from_file_location("checklist_builder", BUILDER_PATH)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Nao foi possivel carregar {BUILDER_PATH}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def load_generated_data() -> dict:
    content = OUTPUT_PATH.read_text(encoding="utf-8")
    prefix = "window.HAE_CHECKLIST_DATA = "
    if not content.startswith("// Generated") or prefix not in content:
        raise RuntimeError("Formato inesperado em checklist-data.js")
    payload = content.split(prefix, 1)[1].rsplit(";", 1)[0]
    return json.loads(payload)


def main() -> None:
    builder = load_builder()
    if not builder.WORKBOOK.exists():
        raise FileNotFoundError(builder.WORKBOOK)

    xlrd = builder.import_xlrd()
    workbook = xlrd.open_workbook(str(builder.WORKBOOK), formatting_info=False)
    expected = {}
    for sheet in workbook.sheets():
        area_id = builder.map_sheet(sheet.name)
        if area_id:
            expected[area_id] = builder.parse_sheet(sheet)

    actual = load_generated_data()
    if actual != expected:
        raise AssertionError(
            "checklist-data.js nao corresponde integralmente ao resultado atual da planilha-fonte"
        )

    question_count = sum(area["totalQuestions"] for area in actual.values())
    print(
        f"PASS: {len(actual)} areas e {question_count} perguntas correspondem "
        "integralmente a planilha-fonte segundo as regras declaradas do importador."
    )
    print(
        "Os textos das perguntas recebem somente limpeza de espacos/quebras de linha; "
        "titulos de blocos recebem capitalizacao visual e a correcao declarada "
        "ACONDIONAMENTO -> ACONDICIONAMENTO."
    )


if __name__ == "__main__":
    main()
