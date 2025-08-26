import { expect, type Page } from '@playwright/test';

export class ROICalculatorPage {
  constructor(private readonly page: Page) {}

  async scrollToCalculator() {
    const heading = this.page.getByRole('heading', { name: 'Quick ROI Calculator' });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  }

  async fillManualHours(hours: string) {
    await this.page.getByLabel('Manual hours per month').fill(hours);
  }

  async fillHourlyCost(cost: string) {
    await this.page.getByLabel('Average hourly cost (USD)').fill(cost);
  }

  async fillAutomationCoverage(percent: string) {
    await this.page.getByLabel('Automation coverage (%)').fill(percent);
  }

  async fillMonthlySoftwareCost(cost: string) {
    await this.page.getByLabel('Monthly software/tool cost (USD)').fill(cost);
  }

  async fillSetupCost(cost: string) {
    await this.page.getByLabel('One-time setup cost (USD)').fill(cost);
  }

  async clickCalculate() {
    await this.page.getByRole('button', { name: 'Calculate ROI' }).click();
  }

  async expectResultsVisible() {
    await expect(this.page.getByText('Monthly Savings', { exact: false })).toBeVisible();
    await expect(this.page.getByText('Annual Net Benefit', { exact: false })).toBeVisible();
    await expect(this.page.getByText('Payback Period', { exact: false })).toBeVisible();
  }

  async expectDownloadButtonVisible() {
    await expect(
      this.page.getByRole('button', { name: 'Download ROI Summary' })
    ).toBeVisible();
  }
}
