import {
  FoodItem,
  MealEntry,
  MealLog,
  NutritionGoal,
  NutritionSummary,
  StandardFoodItem,
} from "@/domain";

export function buildFoodItem(overrides: Partial<ConstructorParameters<typeof FoodItem>[0]> = {}): FoodItem {
  return new FoodItem({
    foodId: overrides.foodId ?? "food-1",
    name: overrides.name ?? "Chicken Breast",
    servingSize: overrides.servingSize ?? "100g",
    caloriesPerServing: overrides.caloriesPerServing ?? 165,
    proteinGrams: overrides.proteinGrams ?? 31,
    carbohydrateGrams: overrides.carbohydrateGrams ?? 0,
    fatGrams: overrides.fatGrams ?? 3.6,
    sourceType: overrides.sourceType ?? "standard",
  });
}

export function buildMealLog(): MealLog {
  const oats = new StandardFoodItem({
    foodId: "food-2",
    name: "Oats",
    servingSize: "100g",
    caloriesPerServing: 389,
    proteinGrams: 16.9,
    carbohydrateGrams: 66.3,
    fatGrams: 6.9,
  });

  const entry = new MealEntry({
    entryId: "entry-1",
    foodItem: oats,
    portionSize: 0.5,
  });

  return new MealLog({
    mealLogId: "log-1",
    entryDate: new Date("2026-04-01T08:00:00.000Z"),
    mealType: "Breakfast",
    entries: [entry],
  });
}

export function buildSummary(): NutritionSummary {
  const goal = new NutritionGoal({
    goalId: "goal-1",
    dailyCalorieTarget: 2200,
    proteinTarget: 130,
    carbohydrateTarget: 250,
    fatTarget: 70,
  });

  return NutritionSummary.buildFromLogs({
    summaryId: "summary-1",
    periodStart: new Date("2026-04-01T00:00:00.000Z"),
    periodEnd: new Date("2026-04-01T23:59:59.999Z"),
    logs: [buildMealLog()],
    goal,
  });
}

