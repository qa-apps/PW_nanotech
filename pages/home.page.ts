import { expect, type Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async goto(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    await expect(this.page.getByRole('heading', { name: 'NanoTech Hub' }).first()).toBeVisible();
  }

  async openTopBannerLearnMore() {
    await this.page.getByRole('link', { name: /Learn More/i }).first().click();
  }
}
