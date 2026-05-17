import { RepositoryFactory, type RepositorySet, type StorageBackend } from "@/repositories/factory";

import { FoodItemService } from "./FoodItemService";
import { MealLogService } from "./MealLogService";
import { NutritionGoalService } from "./NutritionGoalService";

export type ApplicationServices = {
  repositories: RepositorySet;
  foodItems: FoodItemService;
  mealLogs: MealLogService;
  nutritionGoals: NutritionGoalService;
};

let cachedServices: ApplicationServices | undefined;

function resolveBackend(): StorageBackend {
  return process.env.REPOSITORY_BACKEND === "database" ? "database" : "memory";
}

export function createApplicationServices(backend: StorageBackend = resolveBackend()): ApplicationServices {
  const repositories = RepositoryFactory.createRepositorySet(backend);

  return {
    repositories,
    foodItems: new FoodItemService(repositories),
    mealLogs: new MealLogService(repositories),
    nutritionGoals: new NutritionGoalService(repositories),
  };
}

export function getApplicationServices(): ApplicationServices {
  if (!cachedServices) {
    cachedServices = createApplicationServices();
  }

  return cachedServices;
}

export function resetApplicationServices(): void {
  cachedServices = undefined;
}

