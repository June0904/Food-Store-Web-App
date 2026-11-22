$ErrorActionPreference = 'Stop'
$ProjectDir = "C:\Users\User\moss-and-daisy"
Set-Location $ProjectDir
$Failed = 0

Write-Host "=== 1. Checking Required Project Files ===" -ForegroundColor Cyan
$RequiredFiles = @(
    "package.json",
    "index.html",
    "MEMORY.md",
    "sync-images.ps1",
    "src\main.tsx",
    "src\App.tsx",
    "src\styles\tokens.scss",
    "src\types\menu.ts",
    "src\data\customImageMap.ts",
    "src\components\ui\SmartAssetImage.tsx"
)

foreach ($f in $RequiredFiles) {
    $p = Join-Path $ProjectDir $f
    if ((Test-Path $p) -and ((Get-Item $p).Length -gt 0)) {
        Write-Host "  [OK] $f ($((Get-Item $p).Length) bytes)" -ForegroundColor Green
    } else {
        Write-Host "  [MISSING/EMPTY] $f" -ForegroundColor Red
        $Failed++
    }
}

Write-Host "=== 2. Checking 84 Named Image Folders ===" -ForegroundColor Cyan
$ImgRoot = Join-Path $ProjectDir "public\images"
$WithSvg = (Get-ChildItem $ImgRoot -Recurse -Filter "preview.svg").Count
$WithTxt = (Get-ChildItem $ImgRoot -Recurse -Filter "DROP_IMAGE_HERE.txt").Count
Write-Host "  preview.svg count        : $WithSvg / 84"
Write-Host "  DROP_IMAGE_HERE.txt count: $WithTxt / 84"
if ($WithSvg -lt 84 -or $WithTxt -lt 84) { $Failed++ }

Write-Host "=== 3. Checking Installed Packages ===" -ForegroundColor Cyan
$PkgJson = Get-Content (Join-Path $ProjectDir "package.json") -Raw
$NeedPkgs = @("react", "react-bootstrap", "bootstrap", "react-router-dom", "motion", "zustand", "react-bootstrap-icons", "sass")
foreach ($pkg in $NeedPkgs) {
    if ($PkgJson -match "`"$pkg`"") {
        Write-Host "  [OK] package: $pkg" -ForegroundColor Green
    } else {
        Write-Host "  [MISSING] package: $pkg" -ForegroundColor Red
        $Failed++
    }
}

Write-Host "=== 4. Running Oxlint & TypeScript Check ===" -ForegroundColor Cyan
npx oxlint src
if ($LASTEXITCODE -ne 0) { $Failed++ }
npx tsc -b --noEmit
if ($LASTEXITCODE -ne 0) { $Failed++ }

if ($Failed -eq 0) {
    Write-Host "=== RESULT: ALL CHECKS PASSED (100% HEALTHY) ===" -ForegroundColor Green
} else {
    Write-Host "=== RESULT: $Failed CHECK(S) FAILED ===" -ForegroundColor Red
}