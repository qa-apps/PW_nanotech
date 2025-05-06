import { expect, type Page } from '@playwright/test';

export class MetricsPage {
  constructor(private readonly page: Page) {}

  async scrollToMetrics() {
    const heading = this.page.getByText('Measurable Business Impact', { exact: false }).first();
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  }

  async expectMetricCardVisible(title: string) {
    await expect(
      this.page.getByText(title, { exact: false }).first()
    ).toBeVisible();
  }

  async expectAllMetricCardsVisible() {
    const metrics = [
      '70% Cost Reduction',
      '5x Faster Processing',
      '99.9% Accuracy',
      '24/7 Availability',
      'Scalable Growth',
      'Enhanced Compliance'
    ];

    for (const metric of metrics) {
      await expect(
        this.page.getByText(metric, { exact: false }).first()
      ).toBeVisible();
    }
  }

  async expectStatsCountersVisible() {
    const stats = [
      '200+',
      '70%',
      '50+',
      '15+',
      '99.9%',
      '24/7'
    ];

    for (const stat of stats) {
      await expect(
        this.page.getByText(stat, { exact: true }).first()
      ).toBeVisible();
    }
  }
}
