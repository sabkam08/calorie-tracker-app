import { CustomFoodItem, FoodItem, StandardFoodItem } from "@/domain";

export type FoodItemKind = "standard" | "custom";

export interface FoodItemFactoryInput {
  kind: FoodItemKind;
  foodId: string;
  name: string;
  servingSize: string;
  caloriesPerServing: number;
  proteinGrams: number;
  carbohydrateGrams: number;
  fatGrams: number;
}

export class FoodItemSimpleFactory {
  static create(input: FoodItemFactoryInput): FoodItem {
    if (input.kind === "standard") {
      return new StandardFoodItem({
        foodId: input.foodId,
        name: input.name,
        servingSize: input.servingSize,
        caloriesPerServing: input.caloriesPerServing,
        proteinGrams: input.proteinGrams,
        carbohydrateGrams: input.carbohydrateGrams,
        fatGrams: input.fatGrams,
      });
    }

    return new CustomFoodItem({
      foodId: input.foodId,
      name: input.name,
      servingSize: input.servingSize,
      caloriesPerServing: input.caloriesPerServing,
      proteinGrams: input.proteinGrams,
      carbohydrateGrams: input.carbohydrateGrams,
      fatGrams: input.fatGrams,
    });
  }
}


