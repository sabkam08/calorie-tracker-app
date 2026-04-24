import { NutritionSummary } from "@/domain";
import { NutritionSummaryRepository } from "@/repositories/contracts";
import { InMemoryRepository } from "@/repositories/inmemory/InMemoryRepository";

export class InMemoryNutritionSummaryRepository
  extends InMemoryRepository<NutritionSummary, string>
  implements NutritionSummaryRepository
{
  constructor() {
    super((entity) => entity.summaryId);
  }

  findByPeriod(start: Date, end: Date): NutritionSummary[] {
    return this.findAll().filter(
      (summary) => summary.periodStart >= start && summary.periodEnd <= end
    );
  }
}

