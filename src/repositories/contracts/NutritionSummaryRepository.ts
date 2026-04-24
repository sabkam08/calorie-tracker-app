import { NutritionSummary } from "@/domain";
import { Repository } from "@/repositories/Repository";

export interface NutritionSummaryRepository extends Repository<NutritionSummary, string> {
  findByPeriod(start: Date, end: Date): NutritionSummary[];
}

