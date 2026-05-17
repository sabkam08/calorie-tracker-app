import { randomUUID } from "node:crypto";

import { CustomFoodItem, FoodCatalogue, FoodItem } from "@/domain";
import { RepositorySet } from "@/repositories/factory";

import { ConflictError, NotFoundError } from "./errors";
import {
  FoodItemInput,
  FoodItemResponse,
  UpdateFoodItemInput,
} from "./types";
import { normalizeText, requireNonNegativeNumber, requireText } from "./validation";
import { serializeFoodItem } from "./serializers";

const DEFAULT_CATALOGUE_ID = "default-food-catalogue";
const DEFAULT_CATALOGUE_NAME = "Primary Food Catalogue";

function isSameName(left: string, right: string): boolean {
  return normalizeText(left) === normalizeText(right);
}

export class FoodItemService {
  constructor(
    private readonly repositories: Pick<RepositorySet, "foodCatalogues" | "foodItems" | "mealEntries">,
  ) {}

  listFoodItems(query = ""): FoodItemResponse[] {
    return this.repositories.foodItems.findByName(query).map(serializeFoodItem);
  }

  getFoodItem(foodId: string): FoodItemResponse {
    return serializeFoodItem(this.requireFoodItem(foodId));
  }

  createFoodItem(input: FoodItemInput): FoodItemResponse {
    const item = this.buildFoodItem(input);
    this.assertUniqueName(item.name);
    this.repositories.foodItems.save(item);
    this.syncCatalogue();
    return serializeFoodItem(item);
  }

  updateFoodItem(foodId: string, input: UpdateFoodItemInput): FoodItemResponse {
    const existing = this.requireFoodItem(foodId);
    const nextName = input.name !== undefined ? requireText(input.name, "Food name") : existing.name;
    const duplicate = this.repositories.foodItems.findAll().some(
      (candidate) => candidate.foodId !== foodId && isSameName(candidate.name, nextName),
    );

    if (duplicate) {
      throw new ConflictError("A food item with the same name already exists.");
    }

    const updated = new FoodItem({
      foodId: existing.foodId,
      name: nextName,
      servingSize: input.servingSize !== undefined ? requireText(input.servingSize, "Serving size") : existing.servingSize,
      caloriesPerServing:
        input.caloriesPerServing !== undefined
          ? requireNonNegativeNumber(input.caloriesPerServing, "Calories per serving")
          : existing.caloriesPerServing,
      proteinGrams:
        input.proteinGrams !== undefined
          ? requireNonNegativeNumber(input.proteinGrams, "Protein grams")
          : existing.proteinGrams,
      carbohydrateGrams:
        input.carbohydrateGrams !== undefined
          ? requireNonNegativeNumber(input.carbohydrateGrams, "Carbohydrate grams")
          : existing.carbohydrateGrams,
      fatGrams:
        input.fatGrams !== undefined
          ? requireNonNegativeNumber(input.fatGrams, "Fat grams")
          : existing.fatGrams,
      sourceType: input.sourceType ?? existing.sourceType,
    });

    this.repositories.foodItems.save(updated);
    this.syncCatalogue();
    return serializeFoodItem(updated);
  }

  deleteFoodItem(foodId: string): void {
    const existing = this.requireFoodItem(foodId);
    const referenced = this.repositories.mealEntries.findByFoodItemId(existing.foodId);
    if (referenced.length > 0) {
      throw new ConflictError("Food items that are used in meal logs cannot be deleted.");
    }

    this.repositories.foodItems.delete(foodId);
    this.syncCatalogue();
  }

  private buildFoodItem(input: FoodItemInput): FoodItem {
    const name = requireText(input.name, "Food name");
    const servingSize = requireText(input.servingSize, "Serving size");
    const caloriesPerServing = requireNonNegativeNumber(input.caloriesPerServing, "Calories per serving");
    const proteinGrams = requireNonNegativeNumber(input.proteinGrams, "Protein grams");
    const carbohydrateGrams = requireNonNegativeNumber(input.carbohydrateGrams, "Carbohydrate grams");
    const fatGrams = requireNonNegativeNumber(input.fatGrams, "Fat grams");
    const sourceType = input.sourceType ?? "custom";

    return sourceType === "standard"
      ? new FoodItem({
          foodId: input.foodId ?? randomUUID(),
          name,
          servingSize,
          caloriesPerServing,
          proteinGrams,
          carbohydrateGrams,
          fatGrams,
          sourceType,
        })
      : new CustomFoodItem({
          foodId: input.foodId ?? randomUUID(),
          name,
          servingSize,
          caloriesPerServing,
          proteinGrams,
          carbohydrateGrams,
          fatGrams,
        });
  }

  private requireFoodItem(foodId: string): FoodItem {
    const item = this.repositories.foodItems.findById(foodId);
    if (!item) {
      throw new NotFoundError(`Food item ${foodId} was not found.`);
    }

    return item;
  }

  private assertUniqueName(name: string): void {
    const duplicate = this.repositories.foodItems.findAll().some((item) => isSameName(item.name, name));
    if (duplicate) {
      throw new ConflictError("A food item with the same name already exists.");
    }
  }

  private syncCatalogue(): void {
    const catalogue = new FoodCatalogue({
      catalogueId: DEFAULT_CATALOGUE_ID,
      sourceName: DEFAULT_CATALOGUE_NAME,
      lastSyncedAt: new Date(),
      items: this.repositories.foodItems.findAll(),
    });

    this.repositories.foodCatalogues.save(catalogue);
  }
}




