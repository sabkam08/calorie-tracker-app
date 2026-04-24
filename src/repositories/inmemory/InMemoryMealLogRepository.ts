import { MealLog } from "@/domain";
import { MealLogRepository } from "@/repositories/contracts";
import { InMemoryRepository } from "@/repositories/inmemory/InMemoryRepository";

export class InMemoryMealLogRepository
  extends InMemoryRepository<MealLog, string>
  implements MealLogRepository
{
  constructor() {
    super((entity) => entity.mealLogId);
  }

  findByDateRange(start: Date, end: Date): MealLog[] {
    return this.findAll().filter((log) => log.entryDate >= start && log.entryDate <= end);
  }

  findByMealType(mealType: string): MealLog[] {
    const normalized = mealType.trim().toLowerCase();
    return this.findAll().filter((log) => log.mealType.toLowerCase() === normalized);
  }
}

