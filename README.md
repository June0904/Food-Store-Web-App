# Moss & Daisy — Bespoke Filipino Healthy Food Store Web App

**University of San Agustin — IT314 Lab Group Project**
**Repository:** `https://github.com/June0904/Food-Store-Web-App.git`

## Project Team
- **Ilczar June D. Madredano** — *Backend & Front End*
- **Monica Sophia P. Arabaca** — *Design & Data Analyst*

## Contact & Store Information
- **Email:** `ilczar9@gmail.com`
- **Phone:** `09458269961`
- **Location:** General Luna St., Iloilo City / BGC High Street Kitchen Hub

## Key Features
1. **Headerless Full-Screen Get Started Page (`/`)** with RA 10173 Privacy & GPS Disclosure, New-Device Account Choice, and Star Ratings.
2. **18 Customizable Filipino Healthy Dishes & Drinks + 61 Researched Ingredients** with live PHP pricing (`basePrepPhp + ingredients`) and real-time USDA/PhilFCT calorie & macro updates.
3. **Interactive Live Plate / Wooden Bowl / Bento Box Display** with **Toss Plate Apart** explosion animation, **Smart Healthy Swaps**, and `motion/react` **Animated Number Stepper**.
4. **Food Available / Unavailable System** with live status badges and a **Kitchen Demo Toggle** on `/menu`.
5. **Device Location Check + 5-Stage Auto-Cycling Live Order & Driver Tracker (`/delivery/:orderId`)** showing live moving rider GPS (`Kuya Noel Villanueva`, `Honda Click 125i`, Plate `WV-4829-PH`) and 5-Star Service Rating prompt upon delivery.
6. **Zero-Latency Web Audio System Sound Engine (`src/lib/soundEffects.ts`)**, Route Transition Loader, and Soft High-Contrast Light/Dark Mode.
7. **84 Named Image Folders (`public/images/`)**: Drop any `.png`/`.jpg`/`.webp` into a folder and run `.\sync-images.ps1` to swap food/ingredient visuals anytime.

## Quick Commands
- Start dev server: `npm run dev`
- Run full project verification: `powershell -ExecutionPolicy Bypass -File .\recheck.ps1`
- Sync custom folder images: `powershell -ExecutionPolicy Bypass -File .\sync-images.ps1`