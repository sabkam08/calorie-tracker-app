import { NutritionGoal } from "@/domain";
import { Repository } from "@/repositories/Repository";

export interface NutritionGoalRepository extends Repository<NutritionGoal, string> {
  findLatest(): NutritionGoal | undefined;
}

