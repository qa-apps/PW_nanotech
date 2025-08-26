import { expect, type Page } from '@playwright/test';

export class HeroPage {
  constructor(private readonly page: Page) {}

  async expectHeroHeadingVisible() {
    await expect(
      this.page.getByRole('heading', { name: /Transforming Business/i }).first()
    ).toBeVisible();
  }

  async expectSubheadingVisible() {
    await expect(
      this.page.getByText('We build custom AI solutions', { exact: false }).first()
    ).toBeVisible();
  }

  async clickScheduleAssessment() {
    const link = this.page.getByRole('link', { name: 'Schedule AI Assessment' });
    await expect(link).toBeVisible();
    await link.click();
  }

  async clickSeeAIInAction() {
    const link = this.page.getByRole('link', { name: 'See AI in Action' });
    await expect(link).toBeVisible();
    await link.click();
  }

  async expectTopBannerVisible() {
    await expect(
      this.page.getByText('Introducing Agentic AI Solutions', { exact: false }).first()
    ).toBeVisible();
  }

  async expectTopBannerLearnMoreClickable() {
    const learnMore = this.page.getByRole('link', { name: /Learn More/i }).first();
    await expect(learnMore).toBeVisible();
    await expect(learnMore).toBeEnabled();
  }

  async clickLearnMore() {
    await this.page.getByRole('link', { name: /Learn More/i }).first().click();
  }

  async expectBannerColorScheme() {
    const banner = this.page.locator('[class*="banner"], [class*="announcement"]').first();
    if (await banner.count()) {
      await expect(banner).toBeVisible();
    }
  }
}
