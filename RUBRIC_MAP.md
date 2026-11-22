# IT314 Lab Group Project — 100-Point Rubric Mapping

| Rubric Criteria | Points | Where It Is Implemented |
|---|---|---|
| **1. Technology Stack** (ReactJS + Vite, React-Bootstrap, React Router) | **10 pts** | `package.json`, `src/App.tsx`, all pages using `react-bootstrap` & `react-router-dom` |
| **2. UI and UX** (Consistent layout, Carbon/Daisy/Moss palette, Light/Dark mode, Alive animations & SFX) | **20 pts** | `src/styles/tokens.scss`, `src/shell/AppShell.tsx`, `src/lib/soundEffects.ts` |
| **3. Navigation** (Main menu linking Home, Shop/Menu, About, Contact Us) | **10 pts** | `src/shell/AppShell.tsx` (Single Collapsible Navigation Drawer + Persistent Top Bar) |
| **4. Home Page** (CTA, Featured Product spotlight + button to Product Page, Previously Ordered, Healthy Picks) | **10 pts** | `src/pages/HomePage.tsx` (`/home`) |
| **5. Shop Page** (18 products across 6 categories, Available/Unavailable status, filters) | **20 pts** | `src/pages/MenuPage.tsx` (`/menu`) |
| **6. About Page** (Owners **Ilczar June D. Madredano** & **Monica Sophia P. Arabaca** + Inspiration story) | **10 pts** | `src/pages/SecondaryPages.tsx` (`/about`) |
| **7. Contact Page** (`ilczar9@gmail.com`, `09458269961`, store address & interactive form) | **10 pts** | `src/pages/SecondaryPages.tsx` (`/contact`) |
| **8. Product Page** (Live Plate/Box Customizer, description, live price & nutrition, Add to Cart) | **10 pts** | `src/pages/ProductCustomizerPage.tsx` (`/menu/:category/:slug`) |
| **TOTAL** | **100 pts** | **Verified by `.\recheck.ps1`** |