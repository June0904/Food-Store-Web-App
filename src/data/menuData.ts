import type { MenuItem, CategorySlug, DishIngredientCategory, VesselType, IngredientItem } from "../types/menu";
import { INGREDIENTS_DB } from "./ingredientsData";

export { INGREDIENTS_DB };

export const CATEGORY_META: Record<CategorySlug, { title: string; subtitle: string }> = {
  "bowls-salads": { title: "Healthy Power Bowls", subtitle: "Nutrient-dense grain, greens & lean protein bowls" },
  meals: { title: "Heritage Rice Meals", subtitle: "Authentic Filipino favorites with customizable rice & proteins" },
  noodles: { title: "Artisan Noodles & Broth", subtitle: "Iloilo La Paz Batchoy & vegetable-loaded noodle dishes" },
  "burgers-sandwiches": { title: "Burgers & Sourdough", subtitle: "Grass-fed smash burgers & multigrain grilled chicken clubs" },
  sides: { title: "Baked & Fresh Sides", subtitle: "Air-baked lumpia & herb-roasted sweet potato wedges" },
  desserts: { title: "Nourishing Desserts", subtitle: "Chia overnight oats & lighter artisanal Halo-Halo" },
  drinks: { title: "Fresh Coolers & Brews", subtitle: "Cold-pressed calamansi chia, smoothies, buko & barako coffee" },
};

function cat(id: string, label: string, req: boolean, ingredientIds: string[]): DishIngredientCategory {
  return { id, label, required: req, min: req ? 1 : 0, max: ingredientIds.length, ingredientIds };
}

function dish(
  id: string, name: string, category: CategorySlug, vessel: VesselType, basePrepPhp: number,
  isHealthyPick: boolean, healthBadges: string[], healthyWhy: string, description: string,
  ratingAvg: number, ratingCount: number, ordersToday: number,
  categories: DishIngredientCategory[], defaultIngredientIds: string[],
  smartSwap?: { label: string; benefitText: string; recommendedIngredientIds: string[] }
): MenuItem {
  return {
    id, slug: id, name, category, kind: category === "drinks" ? "drink" : "dish", vessel,
    folderPath: "/images/foods/" + category + "/" + id,
    description, basePrepPhp, isHealthyPick, healthBadges, healthyWhy,
    ratingAvg, ratingCount, ordersToday, categories, defaultIngredientIds, smartSwap,
  };
}

export const MENU_ITEMS: MenuItem[] = [
  dish("chicken-inasal-power-bowl", "Chicken Inasal Brown Rice Power Bowl", "bowls-salads", "wooden-bowl", 40, true,
    ["High Protein", "Under 500 kcal", "Heart-Healthy"], "44g lean char-grilled protein and brown-rice fiber under 425 kcal.",
    "Bacolod & Iloilo style char-grilled chicken breast marinated in calamansi and lemongrass over organic brown rice.",
    4.9, 214, 86, [
      cat("base", "Base (Required)", true, ["organic-brown-rice", "quinoa-adlai-mix", "steamed-white-rice", "mixed-local-greens"]),
      cat("protein", "Grilled Protein (Required)", true, ["grilled-chicken-inasal-breast", "grilled-chicken-thigh", "grilled-firm-tofu"]),
      cat("veg", "Fresh Produce", false, ["sliced-cucumber", "native-tomato", "papaya-atchara", "steamed-broccoli", "fresh-hass-avocado"]),
    ], ["organic-brown-rice", "grilled-chicken-inasal-breast", "sliced-cucumber", "native-tomato", "papaya-atchara"],
    { label: "Quinoa-Adlai & Broccoli Upgrade", benefitText: "Swaps Brown Rice for Quinoa-Adlai & adds Steamed Broccoli (+3.2g fiber)", recommendedIngredientIds: ["quinoa-adlai-mix", "grilled-chicken-inasal-breast", "sliced-cucumber", "native-tomato", "steamed-broccoli"] }),

  dish("grilled-bangus-ensalada-bowl", "Grilled Bangus & Ensalada Harvest Bowl", "bowls-salads", "wooden-bowl", 40, true,
    ["Omega-3 Rich", "High Protein", "Heart-Healthy"], "Marine omega-3 fatty acids paired with antioxidant-rich red cargo rice.",
    "Boneless grilled Iloilo milkfish belly over Antique red cargo rice with green mango ensalada and tomatoes.",
    4.8, 162, 64, [
      cat("base", "Base (Required)", true, ["red-cargo-rice", "organic-brown-rice", "mixed-local-greens"]),
      cat("protein", "Seafood Protein (Required)", true, ["boneless-grilled-bangus", "grilled-tiger-prawns"]),
      cat("ensalada", "Ensalada & Sides", false, ["green-mango-strips", "native-tomato", "red-onion-rings", "salted-duck-egg-half", "sliced-cucumber"]),
    ], ["red-cargo-rice", "boneless-grilled-bangus", "green-mango-strips", "native-tomato", "red-onion-rings", "salted-duck-egg-half"],
    { label: "Low-Sodium Heart Trim", benefitText: "Removes Salted Egg & adds Crisp Cucumber (-PHP 10, -294mg sodium)", recommendedIngredientIds: ["red-cargo-rice", "boneless-grilled-bangus", "green-mango-strips", "native-tomato", "sliced-cucumber"] }),

  dish("ilonggo-laswa-wellness-bowl", "Ilonggo Laswa & Grilled Prawns Bowl", "bowls-salads", "soup-bowl", 35, true,
    ["Under 500 kcal", "High Fiber", "Vitamin Boost"], "Lightest immune-boosting bowl under 340 kcal packed with Vitamins A & C.",
    "Western Visayas farm vegetables: kalabasa, okra, sitaw, and malunggay & saluyot simmered with grilled tiger prawns.",
    4.9, 138, 59, [
      cat("base", "Base (Required)", true, ["red-cargo-rice", "organic-brown-rice", "cauliflower-rice"]),
      cat("protein", "Protein (Required)", true, ["grilled-tiger-prawns", "grilled-firm-tofu"]),
      cat("veg", "Laswa Farm Vegetables (Required)", true, ["kalabasa-squash", "fresh-okra", "malunggay-saluyot-greens", "sitaw-string-beans"]),
    ], ["red-cargo-rice", "grilled-tiger-prawns", "kalabasa-squash", "fresh-okra", "malunggay-saluyot-greens", "sitaw-string-beans"]),

  dish("tofu-mushroom-gising-bowl", "Tofu & Mushroom Gising-Gising Plant Bowl", "bowls-salads", "wooden-bowl", 35, true,
    ["Plant-Based", "High Fiber", "Under 500 kcal"], "Cholesterol-free plant protein and prebiotic mushroom fiber under 400 kcal.",
    "100% plant-based power bowl with air-crisped tofu, oyster mushrooms, and winged beans over brown or cauliflower rice.",
    4.8, 95, 44, [
      cat("base", "Base (Required)", true, ["organic-brown-rice", "cauliflower-rice", "quinoa-adlai-mix"]),
      cat("protein", "Plant Protein (Required)", true, ["crispy-air-fried-tofu", "grilled-firm-tofu"]),
      cat("veg", "Vegetables (Required)", true, ["oyster-mushrooms", "winged-beans-sigarilyas", "steamed-broccoli", "fresh-hass-avocado"]),
    ], ["organic-brown-rice", "crispy-air-fried-tofu", "oyster-mushrooms", "winged-beans-sigarilyas"],
    { label: "Low-Carb Cauliflower Rice Swap", benefitText: "Swaps Brown Rice for Cauliflower Rice (-133 kcal)", recommendedIngredientIds: ["cauliflower-rice", "crispy-air-fried-tofu", "oyster-mushrooms", "winged-beans-sigarilyas", "fresh-hass-avocado"] }),

  dish("heritage-chicken-adobo-bowl", "Heritage Chicken Adobo Bowl", "meals", "bento-box", 35, false,
    ["High Protein"], "Swap Sinangag for Brown Rice and Potato for Broccoli for a leaner classic.",
    "Slow-braised Philippine chicken adobo with garlic sinangag or brown rice, hard-boiled egg, potato wedges, and cucumber.",
    4.9, 310, 112, [
      cat("base", "Rice Base (Required)", true, ["garlic-sinangag-rice", "steamed-white-rice", "organic-brown-rice"]),
      cat("protein", "Protein (Required)", true, ["braised-chicken-adobo", "grilled-chicken-inasal-breast"]),
      cat("sides", "Egg & Vegetables", false, ["hard-boiled-egg", "roasted-potato-wedges", "sliced-cucumber", "steamed-broccoli"]),
    ], ["garlic-sinangag-rice", "braised-chicken-adobo", "hard-boiled-egg", "roasted-potato-wedges", "sliced-cucumber"],
    { label: "Lean Brown-Rice Adobo Upgrade", benefitText: "Swaps Sinangag for Brown Rice & Potato for Broccoli (-95 kcal)", recommendedIngredientIds: ["organic-brown-rice", "braised-chicken-adobo", "hard-boiled-egg", "steamed-broccoli", "sliced-cucumber"] }),

  dish("classic-beef-tapsilog", "Classic Grass-Fed Beef Tapsilog", "meals", "ceramic-plate", 35, false,
    ["High Protein"], "Trimmed top sirloin cut; swap to Poached Egg and Brown Rice to cut cooking oil.",
    "Lean cured grass-fed beef sirloin tapa paired with garlic sinangag, sunny-side or poached egg, tomato, and atchara.",
    4.8, 245, 94, [
      cat("base", "Rice Base (Required)", true, ["garlic-sinangag-rice", "organic-brown-rice", "steamed-white-rice"]),
      cat("protein", "Protein (Required)", true, ["lean-beef-sirloin-tapa"]),
      cat("egg", "Egg Style (Required)", true, ["sunny-side-fried-egg", "poached-egg", "hard-boiled-egg"]),
      cat("sides", "Fresh Sides", false, ["native-tomato", "papaya-atchara", "sliced-cucumber"]),
    ], ["garlic-sinangag-rice", "lean-beef-sirloin-tapa", "sunny-side-fried-egg", "native-tomato", "papaya-atchara"],
    { label: "Poached Egg & Brown Rice Swap", benefitText: "Swaps Sunny-Side Egg for Poached Egg & Sinangag for Brown Rice (-86 kcal)", recommendedIngredientIds: ["organic-brown-rice", "lean-beef-sirloin-tapa", "poached-egg", "native-tomato", "sliced-cucumber"] }),

  dish("la-paz-batchoy", "Authentic Iloilo La Paz Batchoy", "noodles", "soup-bowl", 35, false,
    ["High Protein"], "Swap Miki for Rice Bihon, remove Chicharon, and add Malunggay for a lighter bowl.",
    "Iloilo's signature noodle soup with fresh miki noodles, lean pork loin, liver strips, poached egg, scallions, and chicharon.",
    4.9, 389, 134, [
      cat("noodles", "Noodles (Required)", true, ["fresh-miki-noodles", "rice-bihon-noodles"]),
      cat("protein", "Meat & Protein (Required)", true, ["lean-pork-loin-slices", "pork-liver-strips", "grilled-chicken-inasal-breast"]),
      cat("toppings", "Toppings & Greens", false, ["crushed-chicharon", "poached-egg", "spring-onion-toasted-garlic", "malunggay-saluyot-greens"]),
    ], ["fresh-miki-noodles", "lean-pork-loin-slices", "pork-liver-strips", "crushed-chicharon", "poached-egg", "spring-onion-toasted-garlic"],
    { label: "Heart-Smart Malunggay Batchoy", benefitText: "Swaps Miki for Bihon, removes Chicharon & adds Malunggay (-101 kcal)", recommendedIngredientIds: ["rice-bihon-noodles", "lean-pork-loin-slices", "poached-egg", "spring-onion-toasted-garlic", "malunggay-saluyot-greens"] }),

  dish("harvest-pancit-canton", "Harvest Vegetable Pancit Canton", "noodles", "ceramic-plate", 35, true,
    ["Under 500 kcal", "High Protein"], "Loaded with 120g of fresh highland vegetables, lean chicken breast, and shrimp.",
    "Wok-tossed canton or bihon noodles with crisp cabbage, carrots, snow peas, grilled chicken breast, and poached shrimp.",
    4.7, 142, 53, [
      cat("noodles", "Noodles (Required)", true, ["wheat-canton-noodles", "rice-bihon-noodles"]),
      cat("protein", "Protein (Required)", true, ["herb-grilled-chicken-fillet", "poached-shrimp", "grilled-firm-tofu"]),
      cat("veg", "Vegetables (Required)", true, ["cabbage-carrots-snowpeas", "steamed-broccoli"]),
    ], ["wheat-canton-noodles", "herb-grilled-chicken-fillet", "poached-shrimp", "cabbage-carrots-snowpeas"]),

  dish("carbon-classic-smash-burger", "Carbon Classic Grass-Fed Burger", "burgers-sandwiches", "ceramic-plate", 40, false,
    ["High Protein"], "Swap Brioche for Crisp Lettuce Wrap or Whole-Wheat Oat Bun to reduce refined carbs.",
    "Seared 90% lean grass-fed beef patty with sharp cheddar, romaine, tomato, and red onion.",
    4.8, 198, 77, [
      cat("bun", "Bun or Lettuce Wrap (Required)", true, ["brioche-bun", "whole-wheat-oat-bun", "crisp-lettuce-wrap"]),
      cat("patty", "Patty (Required)", true, ["grass-fed-beef-patty", "herb-grilled-chicken-fillet"]),
      cat("fillings", "Cheese & Produce", false, ["aged-cheddar-slice", "crisp-romaine-lettuce", "native-tomato", "red-onion-rings", "fresh-hass-avocado"]),
    ], ["brioche-bun", "grass-fed-beef-patty", "aged-cheddar-slice", "crisp-romaine-lettuce", "native-tomato", "red-onion-rings"],
    { label: "Low-Carb Protein Lettuce Wrap", benefitText: "Swaps Brioche for Lettuce Wrap & Cheddar for Avocado (-242 kcal)", recommendedIngredientIds: ["crisp-lettuce-wrap", "grass-fed-beef-patty", "crisp-romaine-lettuce", "native-tomato", "fresh-hass-avocado"] }),

  dish("avocado-chicken-sourdough-club", "Avocado & Grilled Chicken Sourdough Club", "burgers-sandwiches", "ceramic-plate", 35, true,
    ["High Protein", "Heart-Healthy", "High Fiber"], "42g lean protein paired with low-glycemic sourdough and Hass avocado.",
    "Herb-grilled chicken breast, fresh Hass avocado, romaine, and plum tomato on fermented multigrain sourdough.",
    4.9, 156, 68, [
      cat("bread", "Bread or Wrap (Required)", true, ["multigrain-sourdough", "whole-wheat-oat-bun", "crisp-lettuce-wrap"]),
      cat("protein", "Grilled Protein (Required)", true, ["herb-grilled-chicken-fillet", "grilled-firm-tofu"]),
      cat("produce", "Avocado & Produce (Required)", true, ["fresh-hass-avocado", "crisp-romaine-lettuce", "native-tomato", "sliced-cucumber"]),
    ], ["multigrain-sourdough", "herb-grilled-chicken-fillet", "fresh-hass-avocado", "crisp-romaine-lettuce", "native-tomato"]),

  dish("baked-veggie-chicken-lumpia", "Air-Baked Veggie & Chicken Lumpia (6 pcs)", "sides", "ceramic-plate", 25, true,
    ["Under 500 kcal", "High Protein"], "Air-baked instead of deep-fried, cutting fat by 65%.",
    "Golden air-baked spring rolls stuffed with lean ground chicken, carrots, cabbage, and mushrooms.",
    4.8, 120, 51, [
      cat("filling", "Filling (Required)", true, ["lean-ground-chicken-filling", "cabbage-carrots-snowpeas", "oyster-mushrooms"]),
      cat("sides", "Fresh Sides", false, ["sliced-cucumber", "papaya-atchara"]),
    ], ["lean-ground-chicken-filling", "cabbage-carrots-snowpeas", "sliced-cucumber", "papaya-atchara"]),

  dish("crispy-camote-herb-wedges", "Oven-Baked Camote & Herb Wedges", "sides", "wooden-bowl", 25, true,
    ["High Fiber", "Vitamin Boost", "Plant-Based"], "5.9g complex fiber and over 100% DV Vitamin A, baked oil-light.",
    "Oven-roasted Philippine yellow sweet potato (camote) wedges tossed with rosemary and garlic scallions.",
    4.7, 89, 38, [
      cat("root", "Root Crop (Required)", true, ["baked-camote-wedges", "roasted-potato-wedges"]),
      cat("toppings", "Toppings", false, ["spring-onion-toasted-garlic", "fresh-hass-avocado"]),
    ], ["baked-camote-wedges", "spring-onion-toasted-garlic"]),

  dish("mango-chia-overnight-oats", "Guimaras Mango-Chia Overnight Oats", "desserts", "wooden-bowl", 25, true,
    ["High Fiber", "Low Sugar", "Plant-Based"], "9g soluble fiber and plant omega-3s sweetened naturally with real fruit.",
    "Chilled rolled oats and organic chia seeds in light coconut milk with Guimaras mango, saba banana, and pili nuts.",
    4.9, 175, 72, [
      cat("base", "Oat & Chia Base (Required)", true, ["rolled-oats-chia-base"]),
      cat("fruits", "Philippine Fruits (Required)", true, ["guimaras-sweet-mango", "sweet-saba-banana", "nata-de-coco"]),
      cat("nuts", "Nuts & Toppings", false, ["toasted-pili-nuts", "ube-halaya-scoop"]),
    ], ["rolled-oats-chia-base", "guimaras-sweet-mango", "sweet-saba-banana", "toasted-pili-nuts"]),

  dish("artisanal-halo-halo-lite", "Artisanal Halo-Halo Lite", "desserts", "soup-bowl", 30, false,
    ["Under 500 kcal"], "Lighter low-fat milk base with customizable toppings.",
    "Shaved ice with low-fat milk, poached saba banana, red monggo, nata de coco, ube halaya, and leche flan.",
    4.8, 204, 81, [
      cat("base", "Ice & Milk Base (Required)", true, ["shaved-ice-lowfat-milk"]),
      cat("fruits", "Fruits & Beans (Required)", true, ["sweet-saba-banana", "red-monggo-beans", "nata-de-coco", "guimaras-sweet-mango"]),
      cat("crowns", "Crown Toppings", false, ["ube-halaya-scoop", "leche-flan-slice", "toasted-pili-nuts"]),
    ], ["shaved-ice-lowfat-milk", "sweet-saba-banana", "red-monggo-beans", "nata-de-coco", "ube-halaya-scoop", "leche-flan-slice"],
    { label: "Fruit-Forward Low-Sugar Halo-Halo", benefitText: "Swaps Leche Flan for Guimaras Mango & Pili Nuts (-52 kcal)", recommendedIngredientIds: ["shaved-ice-lowfat-milk", "sweet-saba-banana", "red-monggo-beans", "guimaras-sweet-mango", "toasted-pili-nuts"] }),

  dish("calamansi-ginger-chia-cooler", "Fresh Calamansi-Ginger Chia Cooler", "drinks", "drink-cup", 85, true,
    ["Low Sugar", "Vitamin Boost"], "High Vitamin C and anti-inflammatory gingerol at only 45 kcal.",
    "Cold-pressed Philippine calamansi lime, fresh ginger infusion, and organic chia seeds.", 4.9, 188, 95, [], []),

  dish("guimaras-mango-turmeric-smoothie", "Guimaras Mango-Turmeric Smoothie", "drinks", "drink-cup", 120, true,
    ["Vitamin Boost", "Plant-Based"], "Whole-fruit fiber and curcuminoids with zero artificial syrups.",
    "Real Guimaras mango blended with golden turmeric and light coconut milk.", 4.9, 132, 61, [], []),

  dish("fresh-young-buko-water", "Chilled Young Buko Coconut Water", "drinks", "drink-cup", 95, true,
    ["Low Sugar", "Heart-Healthy"], "Isotonic hydration rich in potassium with zero added sugar.",
    "100% pure chilled young coconut water with tender buko strips and natural electrolytes.", 4.8, 164, 79, [], []),

  dish("cold-brewed-barako-black-coffee", "18-Hour Cold-Brewed Batangas Barako", "drinks", "drink-cup", 90, true,
    ["Low Sugar", "Under 500 kcal"], "Antioxidant-rich zero-sugar cold brew at just 5 kcal.",
    "Smooth, low-acidity 18-hour cold-steeped Philippine Liberica coffee.", 4.8, 149, 70, [], []),
];

export function calculateDishTotals(d: MenuItem, selectedIds: string[], qty: number) {
  if (d.kind === "drink") {
    return {
      unitPricePhp: d.basePrepPhp, defaultUnitPricePhp: d.basePrepPhp,
      totalPricePhp: d.basePrepPhp * qty, priceDeltaPhp: 0,
      kcal: 55, proteinG: 1.0, carbsG: 9.0, fatG: 0.2, fiberG: 1.5,
    };
  }
  const active = selectedIds.map((id) => INGREDIENTS_DB[id]).filter((x): x is IngredientItem => Boolean(x));
  const defs = d.defaultIngredientIds.map((id) => INGREDIENTS_DB[id]).filter((x): x is IngredientItem => Boolean(x));
  const defaultUnitPricePhp = d.basePrepPhp + defs.reduce((s, i) => s + i.pricePhp, 0);
  const unitPricePhp = d.basePrepPhp + active.reduce((s, i) => s + i.pricePhp, 0);
  return {
    unitPricePhp, defaultUnitPricePhp,
    totalPricePhp: unitPricePhp * qty, priceDeltaPhp: unitPricePhp - defaultUnitPricePhp,
    kcal: Math.round(active.reduce((s, i) => s + i.kcal, 0)),
    proteinG: Number(active.reduce((s, i) => s + i.proteinG, 0).toFixed(1)),
    carbsG: Number(active.reduce((s, i) => s + i.carbsG, 0).toFixed(1)),
    fatG: Number(active.reduce((s, i) => s + i.fatG, 0).toFixed(1)),
    fiberG: Number(active.reduce((s, i) => s + i.fiberG, 0).toFixed(1)),
  };
}