import { expect, type Page } from '@playwright/test';

export class ROICalculatorPage {
  constructor(private readonly page: Page) {}

  private calculatorSection() {
    return this.page.locator('[class*="calculator"], [class*="roi"]').first();
  }

  async scrollToCalculator() {
    const heading = this.page.getByText('Quick ROI Calculator', { exact: false }).first();
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  }

  async fillManualHours(hours: string) {
    const input = this.page.locator('input').filter({ hasText: '' }).nth(0);
    await input.fill(hours);
  }

  async fillHourlyCost(cost: string) {
    const input = this.page.locator('input').filter({ hasText: '' }).nth(1);
    await input.fill(cost);
  }

  async fillAutomationCoverage(percent: string) {
    const input = this.page.locator('input').filter({ hasText: '' }).nth(2);
    await input.fill(percent);
  }

  async fillMonthlySoftwareCost(cost: string) {
    const input = this.page.locator('input').filter({ hasText: '' }).nth(3);
    await input.fill(cost);
  }

  async fillSetupCost(cost: string) {
    const input = this.page.locator('input').filter({ hasText: '' }).nth(4);
    await input.fill(cost);
  }

  async clickCalculate() {
    await this.page.getByRole('button', { name: /Calculate ROI/i }).click();
  }

  async expectResultsVisible() {
    await expect(this.page.getByText('Monthly Savings', { exact: false })).toBeVisible();
    await expect(this.page.getByText('Annual Net Benefit', { exact: false })).toBeVisible();
    await expect(this.page.getByText('Payback Period', { exact: false })).toBeVisible();
  }

  async expectDownloadButtonVisible() {
    await expect(
      this.page.getByRole('button', { name: /Download ROI Summary/i })
    ).toBeVisible();
  }
}
