import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "./shell/AppShell";
import { LandingPage } from "./pages/LandingPage";
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";
import { ProductCustomizerPage } from "./pages/ProductCustomizerPage";
import { AboutPage, ContactPage, ProfileHistoryPage, SettingsPage, AuthPage } from "./pages/SecondaryPages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AppShell />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/shop" element={<MenuPage />} />
          <Route path="/menu/:category" element={<MenuPage />} />
          <Route path="/menu/:category/:slug" element={<ProductCustomizerPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<ProfileHistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/auth/sign-in" element={<AuthPage mode="sign-in" />} />
          <Route path="/auth/sign-up" element={<AuthPage mode="sign-up" />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}