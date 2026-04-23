import { MealEntry } from "./MealEntry";

export class MealLog {
  private _mealLogId: string;
  private _entryDate: Date;
  private _mealType: string;
  private _notes: string;
  private _totalCalories: number;
  private _entries: MealEntry[];

  constructor(params: {
    mealLogId: string;
    entryDate: Date;
    mealType: string;
    notes?: string;
    entries?: MealEntry[];
  }) {
    this._mealLogId = params.mealLogId;
    this._entryDate = params.entryDate;
    this._mealType = params.mealType;
    this._notes = params.notes ?? "";
    this._entries = params.entries ?? [];
    this._totalCalories = 0;
    this.recalculateTotal();
  }

  get mealLogId(): string {
    return this._mealLogId;
  }

  get entryDate(): Date {
    return this._entryDate;
  }

  get mealType(): string {
    return this._mealType;
  }

  get notes(): string {
    return this._notes;
  }

  get totalCalories(): number {
    return this._totalCalories;
  }

  get entries(): MealEntry[] {
    return [...this._entries];
  }

  addEntry(entry: MealEntry): void {
    this._entries.push(entry);
    this.recalculateTotal();
  }

  removeEntry(entryId: string): void {
    this._entries = this._entries.filter((entry) => entry.entryId !== entryId);
    this.recalculateTotal();
  }

  recalculateTotal(): number {
    this._totalCalories = Number(
      this._entries.reduce((sum, entry) => sum + entry.calories, 0).toFixed(2)
    );
    return this._totalCalories;
  }

  ensureValidForSave(): void {
    if (this._entries.length === 0) {
      throw new Error("A meal log must contain at least one meal entry.");
    }
  }
}

