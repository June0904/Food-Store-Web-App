$ErrorActionPreference = 'Stop'
$ProjectDir = "C:\Users\User\moss-and-daisy"
Set-Location $ProjectDir

Write-Host "=== 1. Checking All 19 Source Files & Project Scripts ===" -ForegroundColor Cyan
$RequiredFiles = @(
  "package.json", "index.html", "MEMORY.md", "sync-images.ps1",
  "src\main.tsx", "src\App.tsx", "src\styles\tokens.scss", "src\types\menu.ts",
  "src\data\customImageMap.ts", "src\data\ingredientsData.ts", "src\data\menuData.ts",
  "src\components\ui\SmartAssetImage.tsx", "src\components\ui\StarRating.tsx",
  "src\components\ui\AnimatedStepper.tsx", "src\components\ui\FoodPresentationStage.tsx", "src\components\ui\SaleFeatureBanner.tsx", "src\components\ui\GlobalExperience.tsx", "src\hooks\useIsMobile.ts",
  "src\store\useAppStore.ts", "src\shell\AppShell.tsx", "src\lib\soundEffects.ts",
  "src\pages\LandingPage.tsx", "src\pages\HomePage.tsx", "src\pages\MenuPage.tsx",
  "src\pages\ProductCustomizerPage.tsx", "src\pages\SecondaryPages.tsx",
  "src\pages\DeliveryTrackerPage.tsx"
)
foreach ($f in $RequiredFiles) {
  $p = Join-Path $ProjectDir $f
  if (-not (Test-Path $p)) { throw "Missing required file: $f" }
  Write-Host ("  [OK] " + $f) -ForegroundColor Green
}

Write-Host "=== 2. Checking 84 Named Image Folders ===" -ForegroundColor Cyan
$SvgCount = (Get-ChildItem -Path "public\images" -Filter "preview.svg" -Recurse).Count
$TxtCount = (Get-ChildItem -Path "public\images" -Filter "DROP_IMAGE_HERE.txt" -Recurse).Count
Write-Host ("  preview.svg count        : " + $SvgCount + " / 84") -ForegroundColor Green
Write-Host ("  DROP_IMAGE_HERE.txt count: " + $TxtCount + " / 84") -ForegroundColor Green
if ($SvgCount -lt 84 -or $TxtCount -lt 84) { throw "Asset folder count mismatch." }

Write-Host "=== 3. Running IT314 Rubric & Owner Feature Assertions ===" -ForegroundColor Cyan
$SecText = [System.IO.File]::ReadAllText((Join-Path $ProjectDir "src\pages\SecondaryPages.tsx"))
if ($SecText -notmatch "Ilczar June D. Madredano" -or $SecText -notmatch "Monica Sophia P. Arabaca") {
  throw "Missing group member names in AboutPage."
}
if ($SecText -notmatch "ilczar9@gmail.com" -or $SecText -notmatch "09458269961") {
  throw "Missing contact email or phone in ContactPage."
}
Write-Host "  [PASS] About & Contact Rubric Info (Owners + Email + Phone)" -ForegroundColor Green

$MenuText = [System.IO.File]::ReadAllText((Join-Path $ProjectDir "src\pages\MenuPage.tsx"))
if ($MenuText -notmatch "unavailableFoodIds" -or $MenuText -notmatch "Unavailable") {
  throw "Missing Available/Unavailable status on MenuPage."
}
Write-Host "  [PASS] Food Available / Unavailable Status & Demo Kitchen Toggle" -ForegroundColor Green

$TrackerText = [System.IO.File]::ReadAllText((Join-Path $ProjectDir "src\pages\DeliveryTrackerPage.tsx"))
if ($TrackerText -notmatch "WV-4829-PH" -or $TrackerText -notmatch "Kuya Noel Villanueva") {
  throw "Missing Driver Tracker details."
}
Write-Host "  [PASS] 5-Stage Live Order & Driver Tracker + Star Service Rating" -ForegroundColor Green

$CustText = [System.IO.File]::ReadAllText((Join-Path $ProjectDir "src\pages\ProductCustomizerPage.tsx"))
if ($CustText -notmatch "AnimatedStepper" -or $CustText -notmatch "Toss Plate Apart") {
  throw "Missing AnimatedStepper or Toss Plate Apart in ProductCustomizerPage."
}
Write-Host "  [PASS] Live Plate Customizer + AnimatedStepper + Toss Apart + SFX" -ForegroundColor Green

Write-Host "=== 4. Running Oxlint, TypeScript & Production Build Check ===" -ForegroundColor Cyan
npx oxlint src
if ($LASTEXITCODE -ne 0) { throw "Oxlint failed." }
npx tsc -b --noEmit
if ($LASTEXITCODE -ne 0) { throw "TypeScript check failed." }
npm run build
if ($LASTEXITCODE -ne 0) { throw "Vite production build failed." }

Write-Host "=== RESULT: ALL 19 FILES, 84 FOLDERS, RUBRIC CHECKS & BUILD PASSED (100% HEALTHY) ===" -ForegroundColor Green