import { FoodItem } from "./FoodItem";

export class FoodCatalogue {
  private _catalogueId: string;
  private _sourceName: string;
  private _lastSyncedAt: Date;
  private readonly _items: Map<string, FoodItem>;

  constructor(params: {
    catalogueId: string;
    sourceName: string;
    lastSyncedAt?: Date;
    items?: FoodItem[];
  }) {
    this._catalogueId = params.catalogueId;
    this._sourceName = params.sourceName;
    this._lastSyncedAt = params.lastSyncedAt ?? new Date();
    this._items = new Map<string, FoodItem>();

    (params.items ?? []).forEach((item) => this._items.set(item.foodId, item));
  }

  get catalogueId(): string {
    return this._catalogueId;
  }

  get sourceName(): string {
    return this._sourceName;
  }

  get lastSyncedAt(): Date {
    return this._lastSyncedAt;
  }

  listItems(): FoodItem[] {
    return Array.from(this._items.values());
  }

  searchByName(query: string): FoodItem[] {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return this.listItems();
    }

    return this.listItems().filter((item) => item.name.toLowerCase().includes(normalized));
  }

  validateDuplicate(item: FoodItem): boolean {
    return this.listItems().some(
      (existing) => existing.name.toLowerCase() === item.name.toLowerCase()
    );
  }

  addFoodItem(item: FoodItem): void {
    if (this.validateDuplicate(item)) {
      throw new Error("Duplicate food item detected.");
    }

    this._items.set(item.foodId, item);
    this._lastSyncedAt = new Date();
  }
}

