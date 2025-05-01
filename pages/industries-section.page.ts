import { expect, type Page } from '@playwright/test';

export class IndustriesSectionPage {
  constructor(private readonly page: Page) {}

  async scrollToIndustries() {
    const heading = this.page.getByText('AI Solutions Across Sectors', { exact: false }).first();
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  }

  async expectIndustryCardVisible(industry: string) {
    await expect(
      this.page.getByText(industry, { exact: false }).first()
    ).toBeVisible();
  }

  async expectAllIndustryCardsVisible() {
    const industries = [
      'Financial Services',
      'Healthcare',
      'Manufacturing',
      'Retail & E-commerce',
      'Logistics & Transport',
      'Professional Services'
    ];

    for (const industry of industries) {
      await expect(
        this.page.getByText(industry, { exact: false }).first()
      ).toBeVisible();
    }
  }

  async expectIndustryDescriptionVisible(industry: string) {
    const card = this.page.locator('[class*="card"], article, section')
      .filter({ hasText: industry }).first();
    await expect(card).toBeVisible();
    const text = await card.innerText();
    expect(text.length).toBeGreaterThan(10);
  }

  async expectTransformingIndustriesHeading() {
    await expect(
      this.page.getByText('Transforming Industries with AI', { exact: false }).first()
    ).toBeVisible();
  }
}
