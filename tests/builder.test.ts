import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { MealEntry, StandardFoodItem } from "@/domain";
import { MealLogBuilder } from "@/creational_patterns/builder/MealLogBuilder";

describe("Builder", () => {
  const oats = new StandardFoodItem({
    foodId: "food-2",
    name: "Oats",
    servingSize: "100g",
    caloriesPerServing: 389,
    proteinGrams: 16.9,
    carbohydrateGrams: 66.3,
    fatGrams: 6.9,
  });

  it("constructs a valid meal log", () => {
    const entry = new MealEntry({ entryId: "entry-1", foodItem: oats, portionSize: 1 });

    const log = new MealLogBuilder()
      .setId("log-1")
      .setMealType("Breakfast")
      .setNotes("Post-workout")
      .addEntry(entry)
      .build();

    assert.equal(log.mealType, "Breakfast");
    assert.equal(log.entries.length, 1);
  });

  it("rejects invalid builder input", () => {
    assert.throws(
      () => new MealLogBuilder().setId("log-2").setMealType("Lunch").build(),
      /At least one meal entry is required\./
    );
  });
});



