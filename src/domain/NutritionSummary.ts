import { MealLog } from "./MealLog";
import { NutritionGoal } from "./NutritionGoal";

export class NutritionSummary {
  private _summaryId: string;
  private _periodStart: Date;
  private _periodEnd: Date;
  private _totalCalories: number;
  private _remainingCalories: number;
  private _mealCount: number;

  constructor(params: {
    summaryId: string;
    periodStart: Date;
    periodEnd: Date;
    totalCalories: number;
    mealCount: number;
    remainingCalories: number;
  }) {
    this._summaryId = params.summaryId;
    this._periodStart = params.periodStart;
    this._periodEnd = params.periodEnd;
    this._totalCalories = params.totalCalories;
    this._mealCount = params.mealCount;
    this._remainingCalories = params.remainingCalories;
  }

  get summaryId(): string {
    return this._summaryId;
  }

  get periodStart(): Date {
    return this._periodStart;
  }

  get periodEnd(): Date {
    return this._periodEnd;
  }

  get totalCalories(): number {
    return this._totalCalories;
  }

  get remainingCalories(): number {
    return this._remainingCalories;
  }

  get mealCount(): number {
    return this._mealCount;
  }

  calculateRemainingCalories(goal?: NutritionGoal): number {
    if (!goal) {
      this._remainingCalories = 0;
      return this._remainingCalories;
    }

    this._remainingCalories = Number((goal.dailyCalorieTarget - this._totalCalories).toFixed(2));
    return this._remainingCalories;
  }

  static buildFromLogs(params: {
    summaryId: string;
    periodStart: Date;
    periodEnd: Date;
    logs: MealLog[];
    goal?: NutritionGoal;
  }): NutritionSummary {
    const logsInRange = params.logs.filter(
      (log) => log.entryDate >= params.periodStart && log.entryDate <= params.periodEnd
    );

    const totalCalories = Number(
      logsInRange.reduce((sum, log) => sum + log.totalCalories, 0).toFixed(2)
    );

    const summary = new NutritionSummary({
      summaryId: params.summaryId,
      periodStart: params.periodStart,
      periodEnd: params.periodEnd,
      totalCalories,
      mealCount: logsInRange.length,
      remainingCalories: 0,
    });

    summary.calculateRemainingCalories(params.goal);
    return summary;
  }
}

