export type VesselType = "wooden-bowl" | "ceramic-plate" | "bento-box" | "soup-bowl" | "drink-cup";
export type CategorySlug = "bowls-salads" | "meals" | "noodles" | "burgers-sandwiches" | "sides" | "desserts" | "drinks";

export interface IngredientItem {
  id: string;
  name: string;
  group: "bases" | "proteins" | "eggs-dairy" | "vegetables" | "toppings-fruits";
  folderPath: string;
  pricePhp: number;
  portionGrams: number;
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  sodiumMg: number;
  plateSlot: { top: string; left: string; layer: number };
}

export interface DishIngredientCategory {
  id: string;
  label: string;
  required: boolean;
  min: number;
  max: number;
  ingredientIds: string[];
}

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  kind: "dish" | "drink";
  vessel: VesselType;
  folderPath: string;
  description: string;
  basePrepPhp: number;
  isHealthyPick: boolean;
  healthBadges: string[];
  healthyWhy: string;
  ratingAvg: number;
  ratingCount: number;
  ordersToday: number;
  categories: DishIngredientCategory[];
  defaultIngredientIds: string[];
  smartSwap?: { label: string; benefitText: string; recommendedIngredientIds: string[] };
}