import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
XLRD_PATH = ROOT.parents[0] / ".codex_tmp" / "pydeps_xlrd_clean"
if XLRD_PATH.exists():
    sys.path.insert(0, str(XLRD_PATH))

import xlrd


def clean(value):
    if isinstance(value, float) and value.is_integer():
        return int(value)
    return value


def main():
    if len(sys.argv) != 2:
        raise SystemExit("Usage: extract-checklist-xls.py workbook.xls")

    workbook_path = sys.argv[1]
    workbook = xlrd.open_workbook(workbook_path, formatting_info=False, encoding_override="cp1252")
    output = {}

    for sheet in workbook.sheets():
        if sheet.name.upper() in {"CAPA", "TABELA"}:
            continue

        rows = []
        for row_index in range(sheet.nrows):
            values = []
            for col_index in range(sheet.ncols):
                value = clean(sheet.cell_value(row_index, col_index))
                if value != "":
                    values.append([col_index, value])
            if values:
                rows.append([row_index, values])

        output[sheet.name] = rows

    print(json.dumps(output, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
