import { FoodItem, MealEntry, MealLog, NutritionGoal, NutritionSummary } from "@/domain";

import {
  FoodItemResponse,
  MealEntryResponse,
  MealLogResponse,
  NutritionGoalResponse,
  NutritionSummaryResponse,
} from "./types";

export function serializeFoodItem(foodItem: FoodItem): FoodItemResponse {
  return {
    foodId: foodItem.foodId,
    name: foodItem.name,
    servingSize: foodItem.servingSize,
    caloriesPerServing: foodItem.caloriesPerServing,
    proteinGrams: foodItem.proteinGrams,
    carbohydrateGrams: foodItem.carbohydrateGrams,
    fatGrams: foodItem.fatGrams,
    sourceType: foodItem.sourceType,
  };
}

export function serializeMealEntry(entry: MealEntry): MealEntryResponse {
  return {
    entryId: entry.entryId,
    portionSize: entry.portionSize,
    calories: entry.calories,
    createdAt: entry.createdAt.toISOString(),
    foodItem: serializeFoodItem(entry.foodItem),
  };
}

export function serializeMealLog(log: MealLog): MealLogResponse {
  return {
    mealLogId: log.mealLogId,
    entryDate: log.entryDate.toISOString(),
    mealType: log.mealType,
    notes: log.notes,
    totalCalories: log.totalCalories,
    entries: log.entries.map(serializeMealEntry),
  };
}

export function serializeNutritionGoal(goal: NutritionGoal): NutritionGoalResponse {
  return {
    goalId: goal.goalId,
    dailyCalorieTarget: goal.dailyCalorieTarget,
    proteinTarget: goal.proteinTarget,
    carbohydrateTarget: goal.carbohydrateTarget,
    fatTarget: goal.fatTarget,
    effectiveDate: goal.effectiveDate.toISOString(),
  };
}

export function serializeNutritionSummary(summary: NutritionSummary): NutritionSummaryResponse {
  return {
    summaryId: summary.summaryId,
    periodStart: summary.periodStart.toISOString(),
    periodEnd: summary.periodEnd.toISOString(),
    totalCalories: summary.totalCalories,
    remainingCalories: summary.remainingCalories,
    mealCount: summary.mealCount,
  };
}

