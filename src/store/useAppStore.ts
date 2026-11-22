import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { VesselType } from "../types/menu";

export interface DeliveryAddress {
  id: string;
  label: string;
  region: string;
  city: string;
  barangay: string;
  street: string;
  notes?: string;
  isDefault: boolean;
}

export interface CartLineItem {
  lineId: string;
  dishId: string;
  dishName: string;
  folderPath: string;
  vessel: VesselType;
  selectedIngredientIds: string[];
  customSummary: string;
  unitPricePhp: number;
  kcal: number;
  quantity: number;
}

export interface DeliveryRecord {
  orderId: string;
  createdAt: string;
  status: "Preparing" | "Out for Delivery" | "Delivered";
  address: DeliveryAddress;
  items: CartLineItem[];
  deliveryFeePhp: number;
  totalPaidPhp: number;
}

export interface ReviewEntry {
  id: string;
  dishId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface AppState {
  theme: "dark" | "light";
  previewDevice: "auto" | "desktop" | "mobile";
  consentAccepted: boolean;
  deviceLocationEnabled: boolean;
  deviceCoords: { lat: number; lng: number };
  sessionMode: "guest" | "user";
  userProfile: {
    name: string;
    age: number;
    sex: string;
    phone: string;
    email: string;
    avatarUrl: string;
    dietaryPrefs: string[];
  };
  addresses: DeliveryAddress[];
  cart: CartLineItem[];
  cartOpen: boolean;
  confirmAddressOpen: boolean;
  deliveryHistory: DeliveryRecord[];
  reviews: ReviewEntry[];
  unavailableFoodIds: string[];
  toggleFoodAvailability: (dishId: string) => void;
  toggleTheme: () => void;
  setPreviewDevice: (mode: "auto" | "desktop" | "mobile") => void;
  acceptConsent: () => void;
  setDeviceLocation: (enabled: boolean, coords?: { lat: number; lng: number }) => void;
  markOrderDelivered: (orderId: string, serviceRating?: number) => void;
  setSessionMode: (mode: "guest" | "user") => void;
  updateProfile: (patch: Partial<AppState["userProfile"]>) => void;
  addAddress: (addr: Omit<DeliveryAddress, "id">) => void;
  setDefaultAddress: (id: string) => void;
  addToCart: (item: Omit<CartLineItem, "lineId">) => void;
  updateCartQty: (lineId: string, qty: number) => void;
  removeFromCart: (lineId: string) => void;
  setCartOpen: (open: boolean) => void;
  setConfirmAddressOpen: (open: boolean) => void;
  confirmAndDeliverOrder: (addressId: string) => DeliveryRecord | null;
  addReview: (dishId: string, rating: number, comment: string) => void;
}

const SEED_ADDRESS: DeliveryAddress = {
  id: "addr-iloilo-1",
  label: "Home (Iloilo City)",
  region: "Region VI (Western Visayas)",
  city: "Iloilo City",
  barangay: "San Agustin / City Proper",
  street: "Gen. Luna St., near University of San Agustin",
  notes: "Green gate, call upon arrival",
  isDefault: true,
};

const SEED_HISTORY: DeliveryRecord[] = [
  {
    orderId: "MD-2026-0841",
    createdAt: "Yesterday, 6:45 PM",
    status: "Delivered",
    address: SEED_ADDRESS,
    deliveryFeePhp: 45,
    totalPaidPhp: 240,
    items: [
      {
        lineId: "seed-line-1",
        dishId: "chicken-inasal-power-bowl",
        dishName: "Chicken Inasal Brown Rice Power Bowl",
        folderPath: "/images/foods/bowls-salads/chicken-inasal-power-bowl",
        vessel: "wooden-bowl",
        selectedIngredientIds: ["quinoa-adlai-mix", "grilled-chicken-inasal-breast", "sliced-cucumber", "native-tomato", "steamed-broccoli"],
        customSummary: "Quinoa-Adlai Base, +Steamed Broccoli",
        unitPricePhp: 195,
        kcal: 414,
        quantity: 1,
      },
    ],
  },
  {
    orderId: "MD-2026-0792",
    createdAt: "3 days ago, 12:20 PM",
    status: "Delivered",
    address: SEED_ADDRESS,
    deliveryFeePhp: 45,
    totalPaidPhp: 235,
    items: [
      {
        lineId: "seed-line-2",
        dishId: "grilled-bangus-ensalada-bowl",
        dishName: "Grilled Bangus & Ensalada Harvest Bowl",
        folderPath: "/images/foods/bowls-salads/grilled-bangus-ensalada-bowl",
        vessel: "wooden-bowl",
        selectedIngredientIds: ["red-cargo-rice", "boneless-grilled-bangus", "green-mango-strips", "native-tomato", "sliced-cucumber"],
        customSummary: "Low-Sodium Trim (No Salted Egg, +Cucumber)",
        unitPricePhp: 190,
        kcal: 481,
        quantity: 1,
      },
    ],
  },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      previewDevice: "auto",
      consentAccepted: false,
      deviceLocationEnabled: false,
      deviceCoords: { lat: 10.6969, lng: 122.5644 },
      sessionMode: "user",
      userProfile: {
        name: "Andrea Dela Cruz",
        age: 21,
        sex: "Female",
        phone: "+639171234567",
        email: "andrea.delacruz@usa.edu.ph",
        avatarUrl: "/images/foods/bowls-salads/chicken-inasal-power-bowl/preview.svg",
        dietaryPrefs: ["High Protein", "Heart-Healthy"],
      },
      addresses: [SEED_ADDRESS],
      cart: [],
      cartOpen: false,
      confirmAddressOpen: false,
      deliveryHistory: SEED_HISTORY,
      unavailableFoodIds: ['artisanal-halo-halo-lite', 'crispy-camote-herb-wedges'],
      toggleFoodAvailability: (dishId) => set((s) => ({ unavailableFoodIds: s.unavailableFoodIds.includes(dishId) ? s.unavailableFoodIds.filter((id) => id !== dishId) : [...s.unavailableFoodIds, dishId] })),
      reviews: [
        { id: "r1", dishId: "chicken-inasal-power-bowl", userName: "Marco V.", rating: 5, comment: "Love watching the bowl update as I swap white rice for quinoa-adlai!", createdAt: "2 hours ago" },
        { id: "r2", dishId: "la-paz-batchoy", userName: "Clarisse T.", rating: 5, comment: "Authentic Iloilo batchoy and removing chicharon lowered the price and calories right away.", createdAt: "Yesterday" },
      ],
      toggleTheme: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
      setPreviewDevice: (previewDevice) => set({ previewDevice }),
      acceptConsent: () => set({ consentAccepted: true }),
      setDeviceLocation: (enabled, coords) => set((s) => ({ deviceLocationEnabled: enabled, deviceCoords: coords ?? s.deviceCoords })),
      markOrderDelivered: (orderId) => set((s) => { const target = s.deliveryHistory.find((o) => o.orderId === orderId); if (!target || target.status === 'Delivered') return s; return { deliveryHistory: s.deliveryHistory.map((o) => o.orderId === orderId ? { ...o, status: 'Delivered' } : o) }; }),
      setSessionMode: (sessionMode) => set({ sessionMode }),
      updateProfile: (patch) => set((s) => ({ userProfile: { ...s.userProfile, ...patch } })),
      addAddress: (addr) =>
        set((s) => {
          const id = "addr-" + Date.now();
          const list = addr.isDefault ? s.addresses.map((a) => ({ ...a, isDefault: false })) : s.addresses;
          return { addresses: [...list, { ...addr, id }] };
        }),
      setDefaultAddress: (id) =>
        set((s) => ({ addresses: s.addresses.map((a) => ({ ...a, isDefault: a.id === id })) })),
      addToCart: (item) =>
        set((s) => ({
          cart: [...s.cart, { ...item, lineId: "line-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6) }],
        })),
      updateCartQty: (lineId, qty) =>
        set((s) => ({
          cart: s.cart.map((c) => (c.lineId === lineId ? { ...c, quantity: Math.max(1, Math.min(20, qty)) } : c)),
        })),
      removeFromCart: (lineId) => set((s) => ({ cart: s.cart.filter((c) => c.lineId !== lineId) })),
      setCartOpen: (cartOpen) => set({ cartOpen }),
      setConfirmAddressOpen: (confirmAddressOpen) => set({ confirmAddressOpen }),
      confirmAndDeliverOrder: (addressId) => {
        const state = get();
        if (state.cart.length === 0) return null;
        const addr = state.addresses.find((a) => a.id === addressId) ?? state.addresses[0];
        const sub = state.cart.reduce((sum, l) => sum + l.unitPricePhp * l.quantity, 0);
        const fee = sub >= 499 ? 0 : 45;
        const rec: DeliveryRecord = {
          orderId: "MD-2026-" + Math.floor(1000 + Math.random() * 9000),
          createdAt: "Just now",
          status: "Out for Delivery",
          address: addr,
          items: state.cart,
          deliveryFeePhp: fee,
          totalPaidPhp: sub + fee,
        };
        set({ deliveryHistory: [rec, ...state.deliveryHistory], cart: [], cartOpen: false, confirmAddressOpen: false });
        return rec;
      },
      addReview: (dishId, rating, comment) =>
        set((s) => ({
          unavailableFoodIds: ['artisanal-halo-halo-lite', 'crispy-camote-herb-wedges'],
      toggleFoodAvailability: (dishId) => set((s) => ({ unavailableFoodIds: s.unavailableFoodIds.includes(dishId) ? s.unavailableFoodIds.filter((id) => id !== dishId) : [...s.unavailableFoodIds, dishId] })),
      reviews: [
            { id: "rev-" + Date.now(), dishId, userName: s.userProfile.name, rating, comment, createdAt: "Just now" },
            ...s.reviews,
          ],
        })),
    }),
    { name: "md.app.store.v1" }
  )
);