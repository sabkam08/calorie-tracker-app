import { randomUUID } from "node:crypto";

import { NutritionGoal } from "@/domain";
import { RepositorySet } from "@/repositories/factory";

import { NotFoundError } from "./errors";
import {
  NutritionGoalInput,
  NutritionGoalResponse,
  NutritionSummaryResponse,
  UpdateNutritionGoalInput,
} from "./types";
import {
  endOfDay,
  parseDateOrFallback,
  parseOptionalDate,
  requireNonNegativeNumber,
  requirePositiveNumber,
} from "./validation";
import { getSummaryResponse, refreshSummarySnapshot, resolveSummaryRange } from "./summary";
import { serializeNutritionGoal } from "./serializers";

export class NutritionGoalService {
  constructor(
    private readonly repositories: Pick<
      RepositorySet,
      "mealLogs" | "nutritionGoals" | "nutritionSummaries"
    >,
  ) {}

  listNutritionGoals(): NutritionGoalResponse[] {
    return this.repositories.nutritionGoals.findAll().sort(
      (left, right) => right.effectiveDate.getTime() - left.effectiveDate.getTime(),
    ).map(serializeNutritionGoal);
  }

  getCurrentNutritionGoal(): NutritionGoalResponse | null {
    const goal = this.repositories.nutritionGoals.findLatest();
    return goal ? serializeNutritionGoal(goal) : null;
  }

  createNutritionGoal(input: NutritionGoalInput): NutritionGoalResponse {
    const goal = this.buildNutritionGoal(input);
    this.repositories.nutritionGoals.save(goal);
    this.refreshTodaySummary();
    return serializeNutritionGoal(goal);
  }

  updateCurrentNutritionGoal(input: UpdateNutritionGoalInput): NutritionGoalResponse {
    const existing = this.repositories.nutritionGoals.findLatest();
    if (!existing) {
      return this.createNutritionGoal({
        dailyCalorieTarget: requirePositiveNumber(input.dailyCalorieTarget ?? 0, "Daily calorie target"),
        proteinTarget: requireNonNegativeNumber(input.proteinTarget ?? 0, "Protein target"),
        carbohydrateTarget: requireNonNegativeNumber(input.carbohydrateTarget ?? 0, "Carbohydrate target"),
        fatTarget: requireNonNegativeNumber(input.fatTarget ?? 0, "Fat target"),
        effectiveDate: input.effectiveDate,
      });
    }

    const updated = new NutritionGoal({
      goalId: existing.goalId,
      dailyCalorieTarget:
        input.dailyCalorieTarget !== undefined
          ? requirePositiveNumber(input.dailyCalorieTarget, "Daily calorie target")
          : existing.dailyCalorieTarget,
      proteinTarget:
        input.proteinTarget !== undefined
          ? requireNonNegativeNumber(input.proteinTarget, "Protein target")
          : existing.proteinTarget,
      carbohydrateTarget:
        input.carbohydrateTarget !== undefined
          ? requireNonNegativeNumber(input.carbohydrateTarget, "Carbohydrate target")
          : existing.carbohydrateTarget,
      fatTarget:
        input.fatTarget !== undefined
          ? requireNonNegativeNumber(input.fatTarget, "Fat target")
          : existing.fatTarget,
      effectiveDate: parseDateOrFallback(input.effectiveDate, "Effective date", new Date()),
    });

    this.repositories.nutritionGoals.save(updated);
    this.refreshTodaySummary();
    return serializeNutritionGoal(updated);
  }

  deleteCurrentNutritionGoal(): void {
    const existing = this.repositories.nutritionGoals.findLatest();
    if (!existing) {
      throw new NotFoundError("No nutrition goal is currently saved.");
    }

    this.repositories.nutritionGoals.delete(existing.goalId);
    this.refreshTodaySummary();
  }

  getSummary(range: { date?: string; start?: string; end?: string } = {}): NutritionSummaryResponse {
    const resolved = resolveSummaryRange(range);
    const summary = refreshSummarySnapshot(this.repositories, resolved.periodStart, resolved.periodEnd);
    return getSummaryResponse(summary);
  }

  private buildNutritionGoal(input: NutritionGoalInput): NutritionGoal {
    return new NutritionGoal({
      goalId: input.goalId ?? randomUUID(),
      dailyCalorieTarget: requirePositiveNumber(input.dailyCalorieTarget, "Daily calorie target"),
      proteinTarget: requireNonNegativeNumber(input.proteinTarget, "Protein target"),
      carbohydrateTarget: requireNonNegativeNumber(input.carbohydrateTarget, "Carbohydrate target"),
      fatTarget: requireNonNegativeNumber(input.fatTarget, "Fat target"),
      effectiveDate: parseOptionalDate(input.effectiveDate, "Effective date") ?? new Date(),
    });
  }

  private refreshTodaySummary(): void {
    const today = new Date();
    const periodStart = new Date(today);
    periodStart.setHours(0, 0, 0, 0);
    refreshSummarySnapshot(this.repositories, periodStart, endOfDay(today));
  }
}


