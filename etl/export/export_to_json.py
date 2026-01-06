import duckdb, json

con = duckdb.connect("data/warehouse/cashflow.duckdb")

# print(con.execute("SHOW TABLES").fetchall())
rows = con.execute("""
  SELECT
    fiscal_year AS year,
    operating_cashflow,
    capex,
    free_cashflow,
    fcf_margin
  FROM siemens_cashflow
  ORDER BY fiscal_year
""").fetchall()

cols = [c[0] for c in con.description]
data = [dict(zip(cols, row)) for row in rows]

with open("frontend/public/cashflow.json", "w") as f:
    json.dump(data, f, indent=2)

con.close()
