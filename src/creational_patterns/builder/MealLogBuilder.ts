import { MealEntry, MealLog } from "@/domain";

export class MealLogBuilder {
  private mealLogId?: string;
  private entryDate: Date = new Date();
  private mealType?: string;
  private notes = "";
  private entries: MealEntry[] = [];

  setId(mealLogId: string): MealLogBuilder {
    this.mealLogId = mealLogId;
    return this;
  }

  setEntryDate(entryDate: Date): MealLogBuilder {
    this.entryDate = entryDate;
    return this;
  }

  setMealType(mealType: string): MealLogBuilder {
    this.mealType = mealType;
    return this;
  }

  setNotes(notes: string): MealLogBuilder {
    this.notes = notes;
    return this;
  }

  addEntry(entry: MealEntry): MealLogBuilder {
    this.entries.push(entry);
    return this;
  }

  build(): MealLog {
    if (!this.mealLogId) {
      throw new Error("Meal log id is required.");
    }
    if (!this.mealType) {
      throw new Error("Meal type is required.");
    }
    if (this.entries.length === 0) {
      throw new Error("At least one meal entry is required.");
    }

    return new MealLog({
      mealLogId: this.mealLogId,
      entryDate: this.entryDate,
      mealType: this.mealType,
      notes: this.notes,
      entries: this.entries,
    });
  }
}


