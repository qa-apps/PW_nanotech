import { expect, type Page } from '@playwright/test';

export class HeroPage {
  constructor(private readonly page: Page) {}

  async expectHeroHeadingVisible() {
    await expect(
      this.page.getByText('Transforming Business', { exact: false }).first()
    ).toBeVisible();
  }

  async expectSubheadingVisible() {
    await expect(
      this.page.getByText('We build custom AI solutions', { exact: false }).first()
    ).toBeVisible();
  }

  async clickScheduleAssessment() {
    const btn = this.page.getByText('Schedule AI Assessment', { exact: false }).first();
    await expect(btn).toBeVisible();
    await btn.click();
  }

  async clickSeeAIInAction() {
    const btn = this.page.getByText('See AI in Action', { exact: false }).first();
    await expect(btn).toBeVisible();
    await btn.click();
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
      const bgColor = await banner.evaluate(el => getComputedStyle(el).backgroundColor);
      expect(bgColor).toBeTruthy();
    }
  }
}
