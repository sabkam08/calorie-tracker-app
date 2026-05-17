import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";

import { RepositoryFactory } from "@/repositories";
import { FoodItemService, MealLogService, NutritionGoalService } from "@/services";

function buildServices() {
  const repositories = RepositoryFactory.createRepositorySet("memory");
  return {
    repositories,
    foodItems: new FoodItemService(repositories),
    mealLogs: new MealLogService(repositories),
    nutritionGoals: new NutritionGoalService(repositories),
  };
}

describe("Service layer", () => {
  let services: ReturnType<typeof buildServices>;

  beforeEach(() => {
    services = buildServices();
  });

  it("creates, searches, and protects food items", () => {
    const created = services.foodItems.createFoodItem({
      name: "Brown Rice",
      servingSize: "100g",
      caloriesPerServing: 123,
      proteinGrams: 2.6,
      carbohydrateGrams: 25.6,
      fatGrams: 1,
    });

    assert.equal(services.foodItems.listFoodItems("rice").length, 1);
    assert.equal(services.foodItems.getFoodItem(created.foodId).name, "Brown Rice");

    services.mealLogs.createMealLog({
      mealType: "Lunch",
      foodItemId: created.foodId,
      portionSize: 1.5,
    });

    assert.throws(() => services.foodItems.deleteFoodItem(created.foodId), /cannot be deleted/i);
  });

  it("logs meals and refreshes daily summaries", () => {
    const food = services.foodItems.createFoodItem({
      name: "Greek Yogurt",
      servingSize: "170g",
      caloriesPerServing: 100,
      proteinGrams: 17,
      carbohydrateGrams: 6,
      fatGrams: 0,
    });

    services.nutritionGoals.createNutritionGoal({
      dailyCalorieTarget: 2200,
      proteinTarget: 130,
      carbohydrateTarget: 240,
      fatTarget: 70,
    });

    const mealLog = services.mealLogs.createMealLog({
      mealType: "Breakfast",
      foodItemId: food.foodId,
      portionSize: 2,
      entryDate: "2026-04-26T08:00:00.000Z",
    });

    assert.equal(mealLog.totalCalories, 200);

    const summary = services.nutritionGoals.getSummary({ date: "2026-04-26T00:00:00.000Z" });
    assert.equal(summary.totalCalories, 200);
    assert.equal(summary.remainingCalories, 2000);
    assert.equal(summary.mealCount, 1);
  });

  it("updates the current nutrition goal", () => {
    services.nutritionGoals.createNutritionGoal({
      dailyCalorieTarget: 2000,
      proteinTarget: 120,
      carbohydrateTarget: 220,
      fatTarget: 60,
    });

    const updated = services.nutritionGoals.updateCurrentNutritionGoal({
      dailyCalorieTarget: 2100,
      proteinTarget: 125,
    });

    assert.equal(updated.dailyCalorieTarget, 2100);
    assert.equal(updated.proteinTarget, 125);
    assert.equal(services.nutritionGoals.getCurrentNutritionGoal()?.dailyCalorieTarget, 2100);
  });
});

