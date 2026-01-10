$ErrorActionPreference = "Stop"

if (-not (Test-Path "logs")) {
    New-Item -ItemType Directory -Path "logs" | Out-Null
}

$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$logFile = "logs/etl_$timestamp.log"

function Log($message) {
    $time = Get-Date -Format "HH:mm:ss"
    $line = "[$time] $message"
    Write-Host $line
    Add-Content -Path $logFile -Value $line
}

function Invoke-Step($name, $command) {
    Log "START: $name"
    try {
        Invoke-Expression $command
        Log "SUCCESS: $name"
    }
    catch {
        Log "ERROR: $name"
        Log $_.Exception.Message
        throw
    }
}

Log " Siemens Cashflow ETL STARTED"

if (-not (Test-Path "data/raw")) {
    Log "ERROR: data/raw folder not found. Place PDFs there."
    exit 1
}

Invoke-Step "Extract cashflow from PDFs" "python etl/extract/extract_cashflow.py"
Invoke-Step "Transform cashflow data" "python etl/transform/transform_cashflow.py"
Invoke-Step "Load data into DuckDB" "python etl/load/load_to_db.py"
Invoke-Step "Export data to JSON" "python etl/export/export_to_json.py"

Log "ETL pipeline completed successfully."
