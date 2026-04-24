import { MealEntry } from "@/domain";
import { MealEntryRepository } from "@/repositories/contracts";
import { InMemoryRepository } from "@/repositories/inmemory/InMemoryRepository";

export class InMemoryMealEntryRepository
  extends InMemoryRepository<MealEntry, string>
  implements MealEntryRepository
{
  constructor() {
    super((entity) => entity.entryId);
  }

  findByFoodItemId(foodItemId: string): MealEntry[] {
    return this.findAll().filter((entry) => entry.foodItem.foodId === foodItemId);
  }
}

