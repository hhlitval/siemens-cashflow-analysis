from pathlib import Path
import pdfplumber
import pandas as pd

folder = Path("data/raw")
out_folder = Path("data/extracted")
out_folder.mkdir(parents=True, exist_ok=True)

KEYWORDS = [
    "Cashflow aus betrieblicher Tätigkeit",
    "Zugänge zu immateriellen",
    "Free Cash Flow",
]

for file in folder.glob("*.pdf"): 
    rows = []
    try:
        with pdfplumber.open(file) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if not text:
                    continue

                for line in text.split("\n"):
                    if any(key in line for key in KEYWORDS):
                        rows.append(line)

    except Exception as e:
        print(f"Skipping {file.name}: {e}")
        continue

    if rows:
        df = pd.DataFrame(rows, columns=["raw_line"])
        output_file = out_folder / f"cashflow_{file.stem}_raw.csv"
        df.to_csv(output_file, index=False)
        print(f"Extracted from {file.name}")
    else:
        print(f"No matches in {file.name}")
