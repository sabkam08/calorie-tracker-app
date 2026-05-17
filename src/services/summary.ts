import { NutritionSummary } from "@/domain";
import { RepositorySet } from "@/repositories/factory";

import { NutritionSummaryResponse, SummaryRangeInput } from "./types";
import { endOfDay, parseOptionalDate, startOfDay } from "./validation";
import { serializeNutritionSummary } from "./serializers";

export function resolveSummaryRange(input: SummaryRangeInput = {}): { periodStart: Date; periodEnd: Date } {
  if (input.start || input.end) {
    const start = parseOptionalDate(input.start, "Start date") ?? startOfDay(new Date());
    const end = parseOptionalDate(input.end, "End date") ?? endOfDay(start);
    return { periodStart: start, periodEnd: end };
  }

  if (input.date) {
    const date = parseOptionalDate(input.date, "Date") ?? new Date();
    return {
      periodStart: startOfDay(date),
      periodEnd: endOfDay(date),
    };
  }

  const today = new Date();
  return {
    periodStart: startOfDay(today),
    periodEnd: endOfDay(today),
  };
}

function summaryIdForRange(periodStart: Date, periodEnd: Date): string {
  return `summary-${periodStart.toISOString()}-${periodEnd.toISOString()}`;
}

export function refreshSummarySnapshot(
  repositories: Pick<RepositorySet, "mealLogs" | "nutritionGoals" | "nutritionSummaries">,
  periodStart: Date,
  periodEnd: Date,
): NutritionSummary {
  const summary = NutritionSummary.buildFromLogs({
    summaryId: summaryIdForRange(periodStart, periodEnd),
    periodStart,
    periodEnd,
    logs: repositories.mealLogs.findByDateRange(periodStart, periodEnd),
    goal: repositories.nutritionGoals.findLatest(),
  });

  repositories.nutritionSummaries.save(summary);
  return summary;
}

export function refreshSummaryForDate(
  repositories: Pick<RepositorySet, "mealLogs" | "nutritionGoals" | "nutritionSummaries">,
  date: Date,
): NutritionSummary {
  return refreshSummarySnapshot(repositories, startOfDay(date), endOfDay(date));
}

export function getSummaryResponse(summary: NutritionSummary): NutritionSummaryResponse {
  return serializeNutritionSummary(summary);
}

