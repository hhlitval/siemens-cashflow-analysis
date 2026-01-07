# Siemens Cashflow Analysis (2015-2025)

## Python env

`python -m venv .venv`

## Run env (Windows):

`.venv\Scripts\activate`

## Install Reqs:

`pip install -r requirements.txt`

## How to run:

### Extract data:

`python etl/extract/extract_cashflow.py`

### Transform:

`python etl/transform/transform_cashflow.py`

### Load (into DuckDB):

`python etl/load/load_to_db.py`

### Display data with streamlit:

`streamlit run dashboard/app.py`

### Display data with custom frontend (HTML, JS, Tailwind)

#### Export data from DW to JSON file

`python etl/export/export_to_json.py`
