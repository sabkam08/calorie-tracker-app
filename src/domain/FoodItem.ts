import { FoodItemCloneInput, FoodSourceType, NutritionUpdateInput } from "./types";

export class FoodItem {
  private _foodId: string;
  private _name: string;
  private _servingSize: string;
  private _caloriesPerServing: number;
  private _proteinGrams: number;
  private _carbohydrateGrams: number;
  private _fatGrams: number;
  private _sourceType: FoodSourceType;

  constructor(params: {
    foodId: string;
    name: string;
    servingSize: string;
    caloriesPerServing: number;
    proteinGrams: number;
    carbohydrateGrams: number;
    fatGrams: number;
    sourceType: FoodSourceType;
  }) {
    if (!params.name.trim()) {
      throw new Error("Food name is required.");
    }
    if (params.caloriesPerServing < 0) {
      throw new Error("Calories per serving cannot be negative.");
    }

    this._foodId = params.foodId;
    this._name = params.name;
    this._servingSize = params.servingSize;
    this._caloriesPerServing = params.caloriesPerServing;
    this._proteinGrams = params.proteinGrams;
    this._carbohydrateGrams = params.carbohydrateGrams;
    this._fatGrams = params.fatGrams;
    this._sourceType = params.sourceType;
  }

  get foodId(): string {
    return this._foodId;
  }

  get name(): string {
    return this._name;
  }

  get servingSize(): string {
    return this._servingSize;
  }

  get caloriesPerServing(): number {
    return this._caloriesPerServing;
  }

  get proteinGrams(): number {
    return this._proteinGrams;
  }

  get carbohydrateGrams(): number {
    return this._carbohydrateGrams;
  }

  get fatGrams(): number {
    return this._fatGrams;
  }

  get sourceType(): FoodSourceType {
    return this._sourceType;
  }

  calculateCalories(portionSize: number): number {
    if (portionSize <= 0) {
      throw new Error("Portion size must be greater than zero.");
    }

    return Number((this._caloriesPerServing * portionSize).toFixed(2));
  }

  updateNutritionFacts(update: NutritionUpdateInput): void {
    if (update.caloriesPerServing !== undefined) {
      if (update.caloriesPerServing < 0) {
        throw new Error("Calories per serving cannot be negative.");
      }
      this._caloriesPerServing = update.caloriesPerServing;
    }
    if (update.proteinGrams !== undefined) {
      this._proteinGrams = update.proteinGrams;
    }
    if (update.carbohydrateGrams !== undefined) {
      this._carbohydrateGrams = update.carbohydrateGrams;
    }
    if (update.fatGrams !== undefined) {
      this._fatGrams = update.fatGrams;
    }
  }

  clone(overrides: FoodItemCloneInput = {}): FoodItem {
    return new FoodItem({
      foodId: overrides.foodId ?? this._foodId,
      name: overrides.name ?? this._name,
      servingSize: this._servingSize,
      caloriesPerServing: this._caloriesPerServing,
      proteinGrams: this._proteinGrams,
      carbohydrateGrams: this._carbohydrateGrams,
      fatGrams: this._fatGrams,
      sourceType: this._sourceType,
    });
  }
}

export class StandardFoodItem extends FoodItem {
  constructor(params: Omit<ConstructorParameters<typeof FoodItem>[0], "sourceType">) {
    super({ ...params, sourceType: "standard" });
  }
}

export class CustomFoodItem extends FoodItem {
  constructor(params: Omit<ConstructorParameters<typeof FoodItem>[0], "sourceType">) {
    super({ ...params, sourceType: "custom" });
  }
}

