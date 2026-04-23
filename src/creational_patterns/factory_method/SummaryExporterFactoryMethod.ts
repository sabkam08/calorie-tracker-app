import { NutritionSummary } from "@/domain";

export interface SummaryExporter {
  export(summary: NutritionSummary): string;
}

class CsvSummaryExporter implements SummaryExporter {
  export(summary: NutritionSummary): string {
    return [
      "summaryId,totalCalories,remainingCalories,mealCount,periodStart,periodEnd",
      [
        summary.summaryId,
        summary.totalCalories,
        summary.remainingCalories,
        summary.mealCount,
        summary.periodStart.toISOString(),
        summary.periodEnd.toISOString(),
      ].join(","),
    ].join("\n");
  }
}

class JsonSummaryExporter implements SummaryExporter {
  export(summary: NutritionSummary): string {
    return JSON.stringify(
      {
        summaryId: summary.summaryId,
        totalCalories: summary.totalCalories,
        remainingCalories: summary.remainingCalories,
        mealCount: summary.mealCount,
        periodStart: summary.periodStart.toISOString(),
        periodEnd: summary.periodEnd.toISOString(),
      },
      null,
      2
    );
  }
}

export abstract class SummaryExporterCreator {
  protected abstract createExporter(): SummaryExporter;

  export(summary: NutritionSummary): string {
    const exporter = this.createExporter();
    return exporter.export(summary);
  }
}

export class CsvSummaryExporterCreator extends SummaryExporterCreator {
  protected createExporter(): SummaryExporter {
    return new CsvSummaryExporter();
  }
}

export class JsonSummaryExporterCreator extends SummaryExporterCreator {
  protected createExporter(): SummaryExporter {
    return new JsonSummaryExporter();
  }
}


