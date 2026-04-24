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
import { RepositoryFactory } from "@/repositories";

function buildFoodItem() {
  return new StandardFoodItem({
    foodId: "food-100",
    name: "Greek Yogurt",
    servingSize: "170g",
    caloriesPerServing: 100,
    proteinGrams: 17,
    carbohydrateGrams: 6,
    fatGrams: 0,
  });
}

function buildMealLog(foodId = "food-100") {
  const item = new StandardFoodItem({
    foodId,
    name: `Food ${foodId}`,
    servingSize: "100g",
    caloriesPerServing: 120,
    proteinGrams: 10,
    carbohydrateGrams: 12,
    fatGrams: 3,
  });

  const entry = new MealEntry({
    entryId: `entry-${foodId}`,
    foodItem: item,
    portionSize: 1,
    createdAt: new Date("2026-04-10T08:00:00.000Z"),
  });

  return new MealLog({
    mealLogId: `log-${foodId}`,
    entryDate: new Date("2026-04-10T08:30:00.000Z"),
    mealType: "Breakfast",
    entries: [entry],
  });
}

describe("Repository layer", () => {
  it("performs CRUD operations through in-memory repositories", () => {
    const repos = RepositoryFactory.createRepositorySet("memory");
    const item = buildFoodItem();

    repos.foodItems.save(item);
    assert.equal(repos.foodItems.findById(item.foodId)?.name, "Greek Yogurt");

    const updated = item.clone({ name: "Greek Yogurt Plain" });
    repos.foodItems.save(updated);
    assert.equal(repos.foodItems.findById(item.foodId)?.name, "Greek Yogurt Plain");

    repos.foodItems.delete(item.foodId);
    assert.equal(repos.foodItems.findById(item.foodId), undefined);
  });

  it("supports entity-specific query methods", () => {
    const repos = RepositoryFactory.createRepositorySet("memory");

    const item = buildFoodItem();
    const catalogue = new FoodCatalogue({
      catalogueId: "catalogue-1",
      sourceName: "Core Catalogue",
      items: [item],
    });
    repos.foodCatalogues.save(catalogue);

    const log = buildMealLog();
    repos.mealLogs.save(log);
    repos.mealEntries.save(log.entries[0]);

    assert.equal(repos.foodItems.findByName("yogurt").length, 0);
    repos.foodItems.save(item);
    assert.equal(repos.foodItems.findByName("yogurt").length, 1);
    assert.equal(repos.foodCatalogues.findBySourceName("core catalogue").length, 1);
    assert.equal(repos.mealLogs.findByMealType("breakfast").length, 1);
    assert.equal(
      repos.mealLogs.findByDateRange(
        new Date("2026-04-10T00:00:00.000Z"),
        new Date("2026-04-10T23:59:59.999Z")
      ).length,
      1
    );
    assert.equal(repos.mealEntries.findByFoodItemId("food-100").length, 1);
  });

  it("finds the latest goal and filters summaries by period", () => {
    const repos = RepositoryFactory.createRepositorySet("memory");

    const olderGoal = new NutritionGoal({
      goalId: "goal-old",
      dailyCalorieTarget: 2200,
      proteinTarget: 120,
      carbohydrateTarget: 220,
      fatTarget: 70,
      effectiveDate: new Date("2026-01-01T00:00:00.000Z"),
    });

    const latestGoal = new NutritionGoal({
      goalId: "goal-new",
      dailyCalorieTarget: 2300,
      proteinTarget: 130,
      carbohydrateTarget: 240,
      fatTarget: 75,
      effectiveDate: new Date("2026-03-01T00:00:00.000Z"),
    });

    repos.nutritionGoals.save(olderGoal);
    repos.nutritionGoals.save(latestGoal);

    assert.equal(repos.nutritionGoals.findLatest()?.goalId, "goal-new");

    const summary = NutritionSummary.buildFromLogs({
      summaryId: "summary-1",
      periodStart: new Date("2026-04-10T00:00:00.000Z"),
      periodEnd: new Date("2026-04-10T23:59:59.999Z"),
      logs: [buildMealLog("food-200")],
      goal: latestGoal,
    });

    repos.nutritionSummaries.save(summary);

    assert.equal(
      repos.nutritionSummaries.findByPeriod(
        new Date("2026-04-01T00:00:00.000Z"),
        new Date("2026-04-30T23:59:59.999Z")
      ).length,
      1
    );
  });

  it("supports profile lookups by email", () => {
    const repos = RepositoryFactory.createRepositorySet("memory");
    const profile = new UserProfile({
      userId: "user-1",
      displayName: "Sabelo",
      email: "sabelo@example.com",
      dailyCalorieGoal: 2400,
      activityLevel: "moderate",
    });

    repos.userProfiles.save(profile);

    assert.equal(repos.userProfiles.findByEmail("Sabelo@Example.com")?.userId, "user-1");
  });

  it("routes to the database stub for food items when database backend is requested", () => {
    const repos = RepositoryFactory.createRepositorySet("database");

    assert.throws(
      () => repos.foodItems.findAll(),
      /not implemented/i
    );
  });
});

