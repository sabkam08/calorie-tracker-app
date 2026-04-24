import { FoodCatalogue } from "@/domain";
import { Repository } from "@/repositories/Repository";

export interface FoodCatalogueRepository extends Repository<FoodCatalogue, string> {
  findBySourceName(sourceName: string): FoodCatalogue[];
}

