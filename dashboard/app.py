import streamlit as st
import duckdb
from pathlib import Path

st.set_page_config(
    page_title="Siemens Cashflow Analysis",
    layout="wide"
)

st.title("Siemens Cashflow Analysis")
st.caption("Fundamentalanalyse auf Basis der Geschäftsberichte (IFRS)")

ROOT_DIR = Path(__file__).resolve().parents[1]
DB_PATH = ROOT_DIR / "data" / "warehouse" / "cashflow.duckdb"

con = duckdb.connect(DB_PATH)
df = con.execute("""
    SELECT *
    FROM siemens_cashflow
    ORDER BY fiscal_year
""").fetchdf()

latest = df.iloc[-1]

col1, col2, col3 = st.columns(3)

col1.metric(
    "Free Cash Flow (latest)",
    f"{latest.free_cashflow:,.0f} Mio €"
)

col2.metric(
    "FCF Margin (latest)",
    f"{latest.fcf_margin:.2%}"
)

col3.metric(
    "CapEx Ratio (latest)",
    f"{latest.capex_ratio:.2%}"
)

st.divider()

st.subheader("Free Cash Flow")

st.line_chart(
    df.set_index("fiscal_year")["free_cashflow"]
)

st.subheader("Operating Cashflow vs CapEx")

st.line_chart(
    df.set_index("fiscal_year")[[
        "operating_cashflow",
        "capex"
    ]]
)

st.subheader("Free Cash Flow Margin")

st.line_chart(
    df.set_index("fiscal_year")["fcf_margin"]
)

st.subheader("CapEx Ratio")

st.line_chart(
    df.set_index("fiscal_year")["capex_ratio"]
)

st.subheader("Cashflow Data")

st.dataframe(
    df,
    width='stretch'
)

st.caption(
    "Quelle: Siemens Geschäftsberichte | Analyse & ETL: eigenes Projekt"
)
