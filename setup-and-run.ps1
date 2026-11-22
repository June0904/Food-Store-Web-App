$ErrorActionPreference = "Stop"
$Here = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $Here
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
}
if (-not (Test-Path (Join-Path $Here "node_modules"))) { npm install }
powershell -ExecutionPolicy Bypass -File .\sync-images.ps1
Start-Process "http://localhost:5173/"
npm run dev