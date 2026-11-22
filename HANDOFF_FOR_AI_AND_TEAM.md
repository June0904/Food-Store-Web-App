# Moss & Daisy - Complete AI & Team Handoff Guide

## 1. Instructions for Any AI Assistant or Teammate Receiving This Zip
1. Extract Moss-and-Daisy-Complete-Bundle.zip into a folder (e.g. C:\Users\User\moss-and-daisy).
2. Double-click START_HERE.bat (or run: powershell -ExecutionPolicy Bypass -File .\setup-and-run.ps1).
   - Automatically checks Node.js, runs npm install if needed, runs sync-images.ps1, and starts npm run dev.
3. Open your web browser and type this exact address in the top URL bar (do NOT search it in Google):
   - http://localhost:5173/  (Get Started Showcase, 3D Dismantle Preview, System SFX, Privacy & Auth Modal)
   - http://localhost:5173/home  (Home Page, 3-Slide Sale Banner, Previously Ordered, Healthy Picks)
   - http://localhost:5173/menu  (Shop & Menu: 18 Dishes, Available/Unavailable Toggle)
   - http://localhost:5173/menu/bowls-salads/chicken-inasal-power-bowl  (Studio Plate & 3D Dismantle Customizer)
   - http://localhost:5173/delivery/MD-2026-8429  (5-Stage Live Order & Driver GPS Tracker)
   - http://localhost:5173/about  (Owners: Ilczar June D. Madredano & Monica Sophia P. Arabaca)
   - http://localhost:5173/contact  (Contact: ilczar9@gmail.com | 09458269961)

## 2. How to Add or Replace Pictures for Foods & Ingredients (84 Folders)
- Dish folders: public/images/foods/<category>/<dish-slug>/
- Ingredient folders: public/images/ingredients/<category>/<ingredient-slug>/
- Container folders: public/images/containers/<vessel-slug>/
- Drop any .png, .jpg, .jpeg, or .webp image into the item folder (newest file wins automatically!).
- Then run: powershell -ExecutionPolicy Bypass -File .\sync-images.ps1 (or double-click START_HERE.bat).