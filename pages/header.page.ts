import { expect, type Locator, type Page } from '@playwright/test';

export class HeaderPage {
  constructor(private readonly page: Page) {}

  private nav(): Locator {
    return this.page.locator('nav');
  }

  async openDropdown(menuLabel: string) {
    const link = this.nav().getByRole('link', { name: menuLabel }).first();
    await expect(link).toBeVisible();
    await link.hover();
  }

  async clickDropdownItem(menuLabel: string, itemLabel: string) {
    await this.openDropdown(menuLabel);
    const item = this.page.getByRole('link', { name: itemLabel }).first();
    await expect(item).toBeVisible();
    await item.click();
  }

  async openPageFromHeader(linkLabel: string) {
    const link = this.nav().getByRole('link', { name: linkLabel }).first();
    await expect(link).toBeVisible();
    await link.click();
  }
}
