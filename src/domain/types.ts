export type FoodSourceType = "standard" | "custom";

export interface NutritionUpdateInput {
  caloriesPerServing?: number;
  proteinGrams?: number;
  carbohydrateGrams?: number;
  fatGrams?: number;
}

export interface FoodItemCloneInput {
  foodId?: string;
  name?: string;
}

