import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { StandardFoodItem } from "@/domain";
import { FoodItemPrototypeRegistry } from "@/creational_patterns/prototype/FoodItemPrototypeRegistry";

describe("Prototype", () => {
  it("clones registered food templates", () => {
    const registry = new FoodItemPrototypeRegistry();
    registry.register(
      "default-oats",
      new StandardFoodItem({
        foodId: "proto-1",
        name: "Oats Base",
        servingSize: "100g",
        caloriesPerServing: 389,
        proteinGrams: 16.9,
        carbohydrateGrams: 66.3,
        fatGrams: 6.9,
      })
    );

    const clone = registry.clone("default-oats", { foodId: "clone-1", name: "Oats Custom" });

    assert.equal(clone.foodId, "clone-1");
    assert.equal(clone.name, "Oats Custom");
    assert.equal(clone.caloriesPerServing, 389);
  });

  it("throws when cloning an unknown prototype", () => {
    const registry = new FoodItemPrototypeRegistry();

    assert.throws(
      () => registry.clone("missing", { foodId: "clone-2", name: "Missing" }),
      /Prototype 'missing' is not registered\./
    );
  });
});



