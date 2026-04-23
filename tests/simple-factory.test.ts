import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { FoodItemSimpleFactory } from "@/creational_patterns/simple_factory/FoodItemSimpleFactory";

describe("Simple Factory", () => {
  it("creates standard and custom food items", () => {
    const standard = FoodItemSimpleFactory.create({
      kind: "standard",
      foodId: "f-1",
      name: "Rice",
      servingSize: "100g",
      caloriesPerServing: 130,
      proteinGrams: 2.7,
      carbohydrateGrams: 28,
      fatGrams: 0.3,
    });

    const custom = FoodItemSimpleFactory.create({
      kind: "custom",
      foodId: "f-2",
      name: "Homemade Stew",
      servingSize: "1 bowl",
      caloriesPerServing: 280,
      proteinGrams: 20,
      carbohydrateGrams: 22,
      fatGrams: 11,
    });

    assert.equal(standard.sourceType, "standard");
    assert.equal(custom.sourceType, "custom");
  });
});



