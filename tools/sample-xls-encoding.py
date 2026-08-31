import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
XLRD_PATH = ROOT.parents[0] / ".codex_tmp" / "pydeps_xlrd_clean"
if XLRD_PATH.exists():
    sys.path.insert(0, str(XLRD_PATH))

import xlrd


def main():
    workbook_path = sys.argv[1]
    encodings = [None, "cp1252", "latin1", "iso-8859-1", "cp850", "cp437", "mac_roman"]
    for encoding in encodings:
        try:
            kwargs = {"formatting_info": False}
            if encoding:
                kwargs["encoding_override"] = encoding
            workbook = xlrd.open_workbook(workbook_path, **kwargs)
            sheet = workbook.sheet_by_index(1)
            print("ENC", encoding, "|", sheet.name, "|", sheet.cell_value(2, 0), "|", sheet.cell_value(3, 1)[:120])
        except Exception as error:
            print("ENC", encoding, "ERR", error)


if __name__ == "__main__":
    main()
