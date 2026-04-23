export class NutritionGoal {
  private _goalId: string;
  private _dailyCalorieTarget: number;
  private _proteinTarget: number;
  private _carbohydrateTarget: number;
  private _fatTarget: number;
  private _effectiveDate: Date;

  constructor(params: {
    goalId: string;
    dailyCalorieTarget: number;
    proteinTarget: number;
    carbohydrateTarget: number;
    fatTarget: number;
    effectiveDate?: Date;
  }) {
    this._goalId = params.goalId;
    this._dailyCalorieTarget = params.dailyCalorieTarget;
    this._proteinTarget = params.proteinTarget;
    this._carbohydrateTarget = params.carbohydrateTarget;
    this._fatTarget = params.fatTarget;
    this._effectiveDate = params.effectiveDate ?? new Date();
    this.validateGoal();
  }

  get goalId(): string {
    return this._goalId;
  }

  get dailyCalorieTarget(): number {
    return this._dailyCalorieTarget;
  }

  get proteinTarget(): number {
    return this._proteinTarget;
  }

  get carbohydrateTarget(): number {
    return this._carbohydrateTarget;
  }

  get fatTarget(): number {
    return this._fatTarget;
  }

  get effectiveDate(): Date {
    return this._effectiveDate;
  }

  updateTargets(update: {
    dailyCalorieTarget?: number;
    proteinTarget?: number;
    carbohydrateTarget?: number;
    fatTarget?: number;
  }): void {
    this._dailyCalorieTarget = update.dailyCalorieTarget ?? this._dailyCalorieTarget;
    this._proteinTarget = update.proteinTarget ?? this._proteinTarget;
    this._carbohydrateTarget = update.carbohydrateTarget ?? this._carbohydrateTarget;
    this._fatTarget = update.fatTarget ?? this._fatTarget;
    this._effectiveDate = new Date();
    this.validateGoal();
  }

  validateGoal(): void {
    if (this._dailyCalorieTarget <= 0) {
      throw new Error("Daily calorie target must be greater than zero.");
    }
    if (this._proteinTarget < 0 || this._carbohydrateTarget < 0 || this._fatTarget < 0) {
      throw new Error("Macro targets cannot be negative.");
    }
  }
}

