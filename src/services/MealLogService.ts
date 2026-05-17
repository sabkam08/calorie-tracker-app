import { randomUUID } from "node:crypto";

import { MealEntry, MealLog } from "@/domain";
import { RepositorySet } from "@/repositories/factory";

import { NotFoundError } from "./errors";
import {
  MealLogInput,
  MealLogResponse,
  UpdateMealLogInput,
} from "./types";
import {
  endOfDay,
  normalizeText,
  optionalText,
  parseDateOrFallback,
  parseOptionalDate,
  requirePositiveNumber,
  requireText,
  startOfDay,
} from "./validation";
import { refreshSummaryForDate } from "./summary";
import { serializeMealLog } from "./serializers";

export class MealLogService {
  constructor(
    private readonly repositories: Pick<
      RepositorySet,
      "foodItems" | "mealEntries" | "mealLogs" | "nutritionGoals" | "nutritionSummaries"
    >,
  ) {}

  listMealLogs(filters: { mealType?: string; start?: string; end?: string } = {}): MealLogResponse[] {
    const normalizedMealType = optionalText(filters.mealType);
    const start = parseOptionalDate(filters.start, "Start date");
    const end = parseOptionalDate(filters.end, "End date");

    let mealLogs: MealLog[];

    if (start || end) {
      const periodStart = start ? startOfDay(start) : startOfDay(new Date());
      const periodEnd = end ? endOfDay(end) : endOfDay(periodStart);
      mealLogs = this.repositories.mealLogs.findByDateRange(periodStart, periodEnd);
    } else {
      mealLogs = this.repositories.mealLogs.findAll();
    }

    if (normalizedMealType) {
      const mealType = normalizeText(normalizedMealType);
      mealLogs = mealLogs.filter((log) => normalizeText(log.mealType) === mealType);
    }

    return mealLogs
      .sort((left, right) => right.entryDate.getTime() - left.entryDate.getTime())
      .map(serializeMealLog);
  }

  getMealLog(mealLogId: string): MealLogResponse {
    return serializeMealLog(this.requireMealLog(mealLogId));
  }

  createMealLog(input: MealLogInput): MealLogResponse {
    const mealType = requireText(input.mealType, "Meal type");
    const foodItem = this.requireFoodItem(input.foodItemId);
    const portionSize = requirePositiveNumber(input.portionSize, "Portion size");
    const entryDate = parseDateOrFallback(input.entryDate, "Entry date", new Date());
    const notes = optionalText(input.notes);
    const entry = new MealEntry({
      entryId: randomUUID(),
      foodItem,
      portionSize,
      createdAt: entryDate,
    });
    const mealLog = new MealLog({
      mealLogId: input.mealLogId ?? randomUUID(),
      entryDate,
      mealType,
      notes,
      entries: [entry],
    });

    mealLog.ensureValidForSave();
    this.repositories.mealEntries.save(entry);
    this.repositories.mealLogs.save(mealLog);
    refreshSummaryForDate(this.repositories, mealLog.entryDate);

    return serializeMealLog(mealLog);
  }

  updateMealLog(mealLogId: string, input: UpdateMealLogInput): MealLogResponse {
    const existing = this.requireMealLog(mealLogId);
    const existingEntry = existing.entries[0];
    if (!existingEntry) {
      throw new NotFoundError(`Meal log ${mealLogId} does not contain any meal entry.`);
    }

    const nextFoodItem = input.foodItemId ? this.requireFoodItem(input.foodItemId) : existingEntry.foodItem;
    const nextPortionSize =
      input.portionSize !== undefined
        ? requirePositiveNumber(input.portionSize, "Portion size")
        : existingEntry.portionSize;
    const nextMealType = input.mealType !== undefined ? requireText(input.mealType, "Meal type") : existing.mealType;
    const nextNotes = input.notes !== undefined ? optionalText(input.notes) ?? "" : existing.notes;
    const nextEntryDate =
      input.entryDate !== undefined
        ? parseDateOrFallback(input.entryDate, "Entry date", existing.entryDate)
        : existing.entryDate;

    const nextEntry = new MealEntry({
      entryId: existingEntry.entryId,
      foodItem: nextFoodItem,
      portionSize: nextPortionSize,
      createdAt: existingEntry.createdAt,
    });
    const updated = new MealLog({
      mealLogId: existing.mealLogId,
      entryDate: nextEntryDate,
      mealType: nextMealType,
      notes: nextNotes,
      entries: [nextEntry],
    });

    updated.ensureValidForSave();
    this.repositories.mealEntries.save(nextEntry);
    this.repositories.mealLogs.save(updated);
    refreshSummaryForDate(this.repositories, existing.entryDate);
    if (existing.entryDate.getTime() !== nextEntryDate.getTime()) {
      refreshSummaryForDate(this.repositories, nextEntryDate);
    }

    return serializeMealLog(updated);
  }

  deleteMealLog(mealLogId: string): void {
    const existing = this.requireMealLog(mealLogId);
    for (const entry of existing.entries) {
      this.repositories.mealEntries.delete(entry.entryId);
    }

    this.repositories.mealLogs.delete(mealLogId);
    refreshSummaryForDate(this.repositories, existing.entryDate);
  }

  private requireMealLog(mealLogId: string): MealLog {
    const mealLog = this.repositories.mealLogs.findById(mealLogId);
    if (!mealLog) {
      throw new NotFoundError(`Meal log ${mealLogId} was not found.`);
    }

    return mealLog;
  }

  private requireFoodItem(foodItemId: string) {
    const foodItem = this.repositories.foodItems.findById(foodItemId);
    if (!foodItem) {
      throw new NotFoundError(`Food item ${foodItemId} was not found.`);
    }

    return foodItem;
  }
}

