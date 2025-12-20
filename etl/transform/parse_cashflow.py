import re
import pandas as pd

INPUT = "data/extracted/cashflow_2021_raw.csv"
OUTPUT = "data/processed/siemens_cashflow_2021.csv"

df = pd.read_csv(INPUT)

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

out = pd.DataFrame([
    {"metric": k, "value": v, "fiscal_year": 2021}
    for k, v in records.items()
])

out.to_csv(OUTPUT, index=False)
print(out)
