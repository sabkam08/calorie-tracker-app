import { NutritionGoal } from "@/domain";
import { NutritionGoalRepository } from "@/repositories/contracts";
import { InMemoryRepository } from "@/repositories/inmemory/InMemoryRepository";

export class InMemoryNutritionGoalRepository
  extends InMemoryRepository<NutritionGoal, string>
  implements NutritionGoalRepository
{
  constructor() {
    super((entity) => entity.goalId);
  }

  findLatest(): NutritionGoal | undefined {
    return this.findAll().sort(
      (a, b) => b.effectiveDate.getTime() - a.effectiveDate.getTime()
    )[0];
  }
}

