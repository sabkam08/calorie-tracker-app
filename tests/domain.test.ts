import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  FoodCatalogue,
  MealEntry,
  MealLog,
  NutritionGoal,
  NutritionSummary,
  StandardFoodItem,
  UserProfile,
} from "@/domain";

describe("Domain model", () => {
  it("calculates meal calories and updates totals", () => {
    const item = new StandardFoodItem({
      foodId: "food-1",
      name: "Banana",
      servingSize: "1 medium",
      caloriesPerServing: 105,
      proteinGrams: 1.3,
      carbohydrateGrams: 27,
      fatGrams: 0.3,
    });

    const entry = new MealEntry({
      entryId: "entry-1",
      foodItem: item,
      portionSize: 2,
    });

    const log = new MealLog({
      mealLogId: "log-1",
      entryDate: new Date("2026-04-01T08:00:00.000Z"),
      mealType: "Breakfast",
      entries: [entry],
    });

    assert.equal(entry.calories, 210);
    assert.equal(log.totalCalories, 210);
  });

  it("blocks duplicate food items in catalogue", () => {
    const itemOne = new StandardFoodItem({
      foodId: "food-1",
      name: "Apple",
      servingSize: "1 medium",
      caloriesPerServing: 95,
      proteinGrams: 0.5,
      carbohydrateGrams: 25,
      fatGrams: 0.3,
    });

    const itemTwo = new StandardFoodItem({
      foodId: "food-2",
      name: "apple",
      servingSize: "1 medium",
      caloriesPerServing: 95,
      proteinGrams: 0.5,
      carbohydrateGrams: 25,
      fatGrams: 0.3,
    });

    const catalogue = new FoodCatalogue({
      catalogueId: "catalog-1",
      sourceName: "Core",
      items: [itemOne],
    });

    assert.throws(() => catalogue.addFoodItem(itemTwo), /Duplicate food item detected\./);
  });

  it("builds a summary from logs and goal", () => {
    const oats = new StandardFoodItem({
      foodId: "food-2",
      name: "Oats",
      servingSize: "100g",
      caloriesPerServing: 389,
      proteinGrams: 16.9,
      carbohydrateGrams: 66.3,
      fatGrams: 6.9,
    });

    const entry = new MealEntry({ entryId: "entry-2", foodItem: oats, portionSize: 1 });
    const log = new MealLog({
      mealLogId: "log-2",
      entryDate: new Date("2026-04-01T10:00:00.000Z"),
      mealType: "Breakfast",
      entries: [entry],
    });

    const goal = new NutritionGoal({
      goalId: "goal-1",
      dailyCalorieTarget: 2000,
      proteinTarget: 120,
      carbohydrateTarget: 240,
      fatTarget: 60,
    });

    const summary = NutritionSummary.buildFromLogs({
      summaryId: "sum-1",
      periodStart: new Date("2026-04-01T00:00:00.000Z"),
      periodEnd: new Date("2026-04-01T23:59:59.999Z"),
      logs: [log],
      goal,
    });

    assert.equal(summary.totalCalories, 389);
    assert.equal(summary.remainingCalories, 1611);
    assert.equal(summary.mealCount, 1);
  });

  it("enforces at least one meal entry before save", () => {
    const user = new UserProfile({
      userId: "user-1",
      displayName: "Test User",
      email: "test@example.com",
      dailyCalorieGoal: 2000,
      activityLevel: "moderate",
    });

    const emptyLog = new MealLog({
      mealLogId: "log-empty",
      entryDate: new Date("2026-04-01T00:00:00.000Z"),
      mealType: "Lunch",
      entries: [],
    });

    assert.throws(
      () => user.createMealLog(emptyLog),
      /A meal log must contain at least one meal entry\./
    );
  });
});


