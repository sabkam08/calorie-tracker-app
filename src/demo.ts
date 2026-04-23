import {
  FoodCatalogue,
  MealEntry,
  NutritionGoal,
  StandardFoodItem,
  UserProfile,
} from "@/domain";
import { MealLogBuilder } from "@/creational_patterns/builder/MealLogBuilder";
import { FoodItemSimpleFactory } from "@/creational_patterns/simple_factory/FoodItemSimpleFactory";

function runDemo(): void {
  const catalogue = new FoodCatalogue({
    catalogueId: "catalog-1",
    sourceName: "Internal Dataset",
  });

  const oats = FoodItemSimpleFactory.create({
    kind: "standard",
    foodId: "food-001",
    name: "Oats",
    servingSize: "100g",
    caloriesPerServing: 389,
    proteinGrams: 16.9,
    carbohydrateGrams: 66.3,
    fatGrams: 6.9,
  });

  const banana = new StandardFoodItem({
    foodId: "food-002",
    name: "Banana",
    servingSize: "1 medium",
    caloriesPerServing: 105,
    proteinGrams: 1.3,
    carbohydrateGrams: 27,
    fatGrams: 0.3,
  });

  catalogue.addFoodItem(oats);
  catalogue.addFoodItem(banana);

  const entryOne = new MealEntry({ entryId: "entry-1", foodItem: oats, portionSize: 0.5 });
  const entryTwo = new MealEntry({ entryId: "entry-2", foodItem: banana, portionSize: 1 });

  const mealLog = new MealLogBuilder()
    .setId("meal-1")
    .setMealType("Breakfast")
    .addEntry(entryOne)
    .addEntry(entryTwo)
    .build();

  const profile = new UserProfile({
    userId: "user-1",
    displayName: "Demo User",
    email: "demo@example.com",
    dailyCalorieGoal: 2200,
    activityLevel: "moderate",
  });

  profile.setGoal(
    new NutritionGoal({
      goalId: "goal-1",
      dailyCalorieTarget: 2200,
      proteinTarget: 140,
      carbohydrateTarget: 250,
      fatTarget: 70,
    })
  );

  profile.createMealLog(mealLog);

  const summary = profile.reviewSummary({
    start: new Date("2026-01-01T00:00:00.000Z"),
    end: new Date("2026-12-31T23:59:59.999Z"),
  });

  console.log("Demo summary:", {
    totalCalories: summary.totalCalories,
    remainingCalories: summary.remainingCalories,
    mealCount: summary.mealCount,
  });
}

runDemo();


