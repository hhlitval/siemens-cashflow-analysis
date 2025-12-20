import duckdb

con = duckdb.connect("data/warehouse/cashflow.duckdb")
print(con.execute("SELECT * FROM siemens_cashflow").fetchdf())
con.close()
