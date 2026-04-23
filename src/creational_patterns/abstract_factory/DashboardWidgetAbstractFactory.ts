export interface CalorieWidget {
  render(totalCalories: number, remainingCalories: number): string;
}

export interface HistoryWidget {
  render(entries: number): string;
}

class MobileCalorieWidget implements CalorieWidget {
  render(totalCalories: number, remainingCalories: number): string {
    return `MobileCalorieCard(total=${totalCalories}, remaining=${remainingCalories})`;
  }
}

class MobileHistoryWidget implements HistoryWidget {
  render(entries: number): string {
    return `MobileHistoryList(entries=${entries})`;
  }
}

class WebCalorieWidget implements CalorieWidget {
  render(totalCalories: number, remainingCalories: number): string {
    return `WebCaloriePanel(total=${totalCalories}, remaining=${remainingCalories})`;
  }
}

class WebHistoryWidget implements HistoryWidget {
  render(entries: number): string {
    return `WebHistoryTable(entries=${entries})`;
  }
}

export interface DashboardWidgetFactory {
  createCalorieWidget(): CalorieWidget;
  createHistoryWidget(): HistoryWidget;
}

export class MobileDashboardWidgetFactory implements DashboardWidgetFactory {
  createCalorieWidget(): CalorieWidget {
    return new MobileCalorieWidget();
  }

  createHistoryWidget(): HistoryWidget {
    return new MobileHistoryWidget();
  }
}

export class WebDashboardWidgetFactory implements DashboardWidgetFactory {
  createCalorieWidget(): CalorieWidget {
    return new WebCalorieWidget();
  }

  createHistoryWidget(): HistoryWidget {
    return new WebHistoryWidget();
  }
}


