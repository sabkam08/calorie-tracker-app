import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  CsvSummaryExporterCreator,
  JsonSummaryExporterCreator,
} from "@/creational_patterns/factory_method/SummaryExporterFactoryMethod";
import { buildSummary } from "./fixtures";

describe("Factory Method", () => {
  it("exports summaries using different creators", () => {
    const summary = buildSummary();

    const csvOutput = new CsvSummaryExporterCreator().export(summary);
    const jsonOutput = new JsonSummaryExporterCreator().export(summary);

    assert.match(csvOutput, /summaryId,totalCalories/);
    assert.match(jsonOutput, /"summaryId": "summary-1"/);
  });
});




