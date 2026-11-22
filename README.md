# Moss & Daisy - Filipino Healthy Food Store Web App

University of San Agustin - IT314 Lab Group Project

## Team Members
- Ilczar June D. Madredano - Backend & Front End
- Monica Sophia P. Arabaca - Design & Data Analyst
- Contact: ilczar9@gmail.com | 09458269961

## How to Run the Project
1. Double-click START_HERE.bat (or run: powershell -ExecutionPolicy Bypass -File .\setup-and-run.ps1).
2. Or run manually in terminal: npm install, then npm run dev.

## Browser URLs
- http://localhost:5173/ (Landing & Get Started Showcase)
- http://localhost:5173/home (Home Page & Sale Banner)
- http://localhost:5173/menu (Shop & Menu - 18 Dishes)
- http://localhost:5173/menu/bowls-salads/chicken-inasal-power-bowl (Plate & 3D Dismantle Customizer)
- http://localhost:5173/delivery/MD-2026-8429 (Live 5-Stage Order & Rider Tracker)
- http://localhost:5173/about (About Page)
- http://localhost:5173/contact (Contact Page)
- http://localhost:5173/profile (Profile & Order History)
- http://localhost:5173/settings (Settings)

## How to Replace Food, Ingredient or Container Images (84 Folders)
1. Open the item folder inside public/images/foods/, public/images/ingredients/, or public/images/containers/.
2. Drop any .png, .jpg, .jpeg, or .webp image inside (any file name works).
3. Run: powershell -ExecutionPolicy Bypass -File .\sync-images.ps1 (or double-click START_HERE.bat).