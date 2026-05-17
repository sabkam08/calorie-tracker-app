export type FoodItemInput = {
  foodId?: string;
  name: string;
  servingSize: string;
  caloriesPerServing: number;
  proteinGrams: number;
  carbohydrateGrams: number;
  fatGrams: number;
  sourceType?: "standard" | "custom";
};

export type UpdateFoodItemInput = Partial<Omit<FoodItemInput, "foodId">>;

export type MealLogInput = {
  mealLogId?: string;
  mealType: string;
  foodItemId: string;
  portionSize: number;
  notes?: string;
  entryDate?: string;
};

export type UpdateMealLogInput = Partial<Omit<MealLogInput, "mealLogId">>;

export type NutritionGoalInput = {
  goalId?: string;
  dailyCalorieTarget: number;
  proteinTarget: number;
  carbohydrateTarget: number;
  fatTarget: number;
  effectiveDate?: string;
};

export type UpdateNutritionGoalInput = Partial<Omit<NutritionGoalInput, "goalId">>;

export type SummaryRangeInput = {
  date?: string;
  start?: string;
  end?: string;
};

export type FoodItemResponse = {
  foodId: string;
  name: string;
  servingSize: string;
  caloriesPerServing: number;
  proteinGrams: number;
  carbohydrateGrams: number;
  fatGrams: number;
  sourceType: string;
};

export type MealEntryResponse = {
  entryId: string;
  portionSize: number;
  calories: number;
  createdAt: string;
  foodItem: FoodItemResponse;
};

export type MealLogResponse = {
  mealLogId: string;
  entryDate: string;
  mealType: string;
  notes: string;
  totalCalories: number;
  entries: MealEntryResponse[];
};

export type NutritionGoalResponse = {
  goalId: string;
  dailyCalorieTarget: number;
  proteinTarget: number;
  carbohydrateTarget: number;
  fatTarget: number;
  effectiveDate: string;
};

export type NutritionSummaryResponse = {
  summaryId: string;
  periodStart: string;
  periodEnd: string;
  totalCalories: number;
  remainingCalories: number;
  mealCount: number;
};

