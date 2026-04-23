import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  MobileDashboardWidgetFactory,
  WebDashboardWidgetFactory,
} from "@/creational_patterns/abstract_factory/DashboardWidgetAbstractFactory";

describe("Abstract Factory", () => {
  it("creates coherent mobile and web widget families", () => {
    const mobileFactory = new MobileDashboardWidgetFactory();
    const webFactory = new WebDashboardWidgetFactory();

    const mobileCard = mobileFactory.createCalorieWidget().render(1200, 800);
    const webTable = webFactory.createHistoryWidget().render(6);

    assert.match(mobileCard, /MobileCalorieCard/);
    assert.match(webTable, /WebHistoryTable/);
  });
});




