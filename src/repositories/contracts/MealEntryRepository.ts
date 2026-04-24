import { MealEntry } from "@/domain";
import { Repository } from "@/repositories/Repository";

export interface MealEntryRepository extends Repository<MealEntry, string> {
  findByFoodItemId(foodItemId: string): MealEntry[];
}

