# Siemens Cashflow Analysis (2015-2025)

## Python env

`python -m venv .venv`

## Run env (Windows):

`.venv\Scripts\activate`

## Install Reqs:

`pip install -r requirements.txt`

## How to run:

### Extract:

`python etl/extract/extract_cashflow.py`

### Transform:

`python etl/transform/transform_cashflow.py`

### Load (into DuckDB):

`python etl/load/load_to_db.py`

### Display data:

`cd dashboard`
`streamlit run app.py`
