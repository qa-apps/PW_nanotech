import { expect, type Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async goto(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    await expect(this.page.getByRole('link', { name: 'NanoTech Hub' })).toBeVisible();
  }

  async openTopBannerLearnMore() {
    await this.page.getByRole('link', { name: /Learn More/i }).first().click();
  }
}
