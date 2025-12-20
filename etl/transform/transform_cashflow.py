import re
import pandas as pd
from pathlib import Path

EXTRACTED_DIR = Path("data/extracted")
OUTPUT = Path("data/processed/siemens_cashflow_timeseries.csv")

rows = []

for csv_file in sorted(EXTRACTED_DIR.glob("cashflow_*_raw.csv")):
    fiscal_year = int(re.search(r"\d{4}", csv_file.name).group())

    df = pd.read_csv(csv_file)

    records = {}
    inside_fcf_block = False

    for line in df["raw_line"]:
        if line.strip() == "Free Cash Flow":
            inside_fcf_block = True
            continue

        if not inside_fcf_block:
            continue

        numbers = re.findall(r"-?\d+\.\d+", line)
        if not numbers:
            continue

        value = int(numbers[0].replace(".", ""))

        if "Cashflow aus betrieblicher Tätigkeit" in line:
            records["operating_cashflow"] = value
        elif "Zugänge zu immateriellen" in line:
            records["capex"] = value
        elif line.startswith("Free Cash Flow"):
            records["free_cashflow"] = value

    if {"operating_cashflow", "capex", "free_cashflow"} <= records.keys():
        operating_cf = records["operating_cashflow"]
        capex = records["capex"]
        free_cf = records["free_cashflow"]

        rows.append({
            "fiscal_year": fiscal_year,
            "operating_cashflow": operating_cf,
            "capex": capex,
            "free_cashflow": free_cf,
            "fcf_margin": round(free_cf / operating_cf, 2),
            "capex_ratio": round(capex / operating_cf, 2),
        })

out = pd.DataFrame(rows).sort_values("fiscal_year")
out.to_csv(OUTPUT, index=False)

print(out)
