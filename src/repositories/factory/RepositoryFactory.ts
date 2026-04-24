import {
  FoodCatalogueRepository,
  FoodItemRepository,
  MealEntryRepository,
  MealLogRepository,
  NutritionGoalRepository,
  NutritionSummaryRepository,
  UserProfileRepository,
} from "@/repositories/contracts";
import { DatabaseFoodItemRepository } from "@/repositories/future";
import {
  InMemoryFoodCatalogueRepository,
  InMemoryFoodItemRepository,
  InMemoryMealEntryRepository,
  InMemoryMealLogRepository,
  InMemoryNutritionGoalRepository,
  InMemoryNutritionSummaryRepository,
  InMemoryUserProfileRepository,
} from "@/repositories/inmemory";

export type StorageBackend = "memory" | "database";

export interface RepositorySet {
  foodCatalogues: FoodCatalogueRepository;
  foodItems: FoodItemRepository;
  mealEntries: MealEntryRepository;
  mealLogs: MealLogRepository;
  nutritionGoals: NutritionGoalRepository;
  nutritionSummaries: NutritionSummaryRepository;
  userProfiles: UserProfileRepository;
}

export class RepositoryFactory {
  static createRepositorySet(backend: StorageBackend): RepositorySet {
    if (backend === "memory") {
      return {
        foodCatalogues: new InMemoryFoodCatalogueRepository(),
        foodItems: new InMemoryFoodItemRepository(),
        mealEntries: new InMemoryMealEntryRepository(),
        mealLogs: new InMemoryMealLogRepository(),
        nutritionGoals: new InMemoryNutritionGoalRepository(),
        nutritionSummaries: new InMemoryNutritionSummaryRepository(),
        userProfiles: new InMemoryUserProfileRepository(),
      };
    }

    return {
      foodCatalogues: new InMemoryFoodCatalogueRepository(),
      foodItems: new DatabaseFoodItemRepository(),
      mealEntries: new InMemoryMealEntryRepository(),
      mealLogs: new InMemoryMealLogRepository(),
      nutritionGoals: new InMemoryNutritionGoalRepository(),
      nutritionSummaries: new InMemoryNutritionSummaryRepository(),
      userProfiles: new InMemoryUserProfileRepository(),
    };
  }
}

