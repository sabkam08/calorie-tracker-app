import { MealLog } from "./MealLog";
import { NutritionGoal } from "./NutritionGoal";
import { NutritionSummary } from "./NutritionSummary";

export class UserProfile {
  private _userId: string;
  private _displayName: string;
  private _email: string;
  private _dailyCalorieGoal: number;
  private _activityLevel: string;
  private _mealLogs: MealLog[];
  private _nutritionGoal?: NutritionGoal;

  constructor(params: {
    userId: string;
    displayName: string;
    email: string;
    dailyCalorieGoal: number;
    activityLevel: string;
    mealLogs?: MealLog[];
    nutritionGoal?: NutritionGoal;
  }) {
    this._userId = params.userId;
    this._displayName = params.displayName;
    this._email = params.email;
    this._dailyCalorieGoal = params.dailyCalorieGoal;
    this._activityLevel = params.activityLevel;
    this._mealLogs = params.mealLogs ?? [];
    this._nutritionGoal = params.nutritionGoal;
  }

  get userId(): string {
    return this._userId;
  }

  get displayName(): string {
    return this._displayName;
  }

  get email(): string {
    return this._email;
  }

  get dailyCalorieGoal(): number {
    return this._dailyCalorieGoal;
  }

  get activityLevel(): string {
    return this._activityLevel;
  }

  get mealLogs(): MealLog[] {
    return [...this._mealLogs];
  }

  get nutritionGoal(): NutritionGoal | undefined {
    return this._nutritionGoal;
  }

  setGoal(target: NutritionGoal): void {
    this._nutritionGoal = target;
    this._dailyCalorieGoal = target.dailyCalorieTarget;
  }

  createMealLog(log: MealLog): void {
    log.ensureValidForSave();
    this._mealLogs.push(log);
  }

  reviewSummary(period: { start: Date; end: Date }): NutritionSummary {
    return NutritionSummary.buildFromLogs({
      summaryId: `summary-${this._userId}-${period.start.toISOString()}`,
      periodStart: period.start,
      periodEnd: period.end,
      logs: this._mealLogs,
      goal: this._nutritionGoal,
    });
  }
}

