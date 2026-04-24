import { MealLog } from "@/domain";
import { Repository } from "@/repositories/Repository";

export interface MealLogRepository extends Repository<MealLog, string> {
  findByDateRange(start: Date, end: Date): MealLog[];
  findByMealType(mealType: string): MealLog[];
}

