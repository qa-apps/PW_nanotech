import { expect, type Locator, type Page } from '@playwright/test';

export class FooterPage {
  constructor(private readonly page: Page) {}

  private footer(): Locator {
    return this.page.locator('footer');
  }

  async clickFooterLink(label: string) {
    const link = this.footer().getByRole('link', { name: label, exact: true });
    await expect(link).toBeVisible();
    await link.click();
  }

  async expectVisible() {
    await expect(this.footer()).toBeVisible();
  }
}
