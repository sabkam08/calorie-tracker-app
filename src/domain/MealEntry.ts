import { FoodItem } from "./FoodItem";

export class MealEntry {
  private _entryId: string;
  private _portionSize: number;
  private _calories: number;
  private _createdAt: Date;
  private _foodItem: FoodItem;

  constructor(params: {
    entryId: string;
    foodItem: FoodItem;
    portionSize: number;
    createdAt?: Date;
  }) {
    if (params.portionSize <= 0) {
      throw new Error("Portion size must be greater than zero.");
    }

    this._entryId = params.entryId;
    this._foodItem = params.foodItem;
    this._portionSize = params.portionSize;
    this._createdAt = params.createdAt ?? new Date();
    this._calories = this._foodItem.calculateCalories(this._portionSize);
  }

  get entryId(): string {
    return this._entryId;
  }

  get portionSize(): number {
    return this._portionSize;
  }

  get calories(): number {
    return this._calories;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get foodItem(): FoodItem {
    return this._foodItem;
  }

  updatePortion(portionSize: number): void {
    if (portionSize <= 0) {
      throw new Error("Portion size must be greater than zero.");
    }

    this._portionSize = portionSize;
    this.syncCalories();
  }

  syncCalories(): void {
    this._calories = this._foodItem.calculateCalories(this._portionSize);
  }
}

