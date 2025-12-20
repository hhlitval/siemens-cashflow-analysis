import duckdb
import pandas as pd
from pathlib import Path

DB_PATH = Path("data/warehouse/cashflow.duckdb")
DB_PATH.parent.mkdir(parents=True, exist_ok=True)

df = pd.read_csv("data/processed/siemens_cashflow_timeseries.csv")
con = duckdb.connect(DB_PATH)

con.execute("""
CREATE OR REPLACE TABLE siemens_cashflow AS
SELECT * FROM df
""")

con.close()
print("Load abgeschlossen: DuckDB Warehouse erstellt")
