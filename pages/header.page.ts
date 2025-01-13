import { expect, type Locator, type Page } from '@playwright/test';

export class HeaderPage {
  constructor(private readonly page: Page) {}

  private navLinkByName(name: string): Locator {
    return this.page.getByRole('link', { name, exact: true });
  }

  async openDropdown(menuLabel: string) {
    const menu = this.navLinkByName(menuLabel);
    await expect(menu).toBeVisible();
    await menu.hover();
  }

  async clickDropdownItem(menuLabel: string, itemLabel: string) {
    await this.openDropdown(menuLabel);
    const item = this.page.getByRole('link', { name: itemLabel, exact: true }).first();
    await expect(item).toBeVisible();
    await item.click();
  }

  async openPageFromHeader(linkLabel: string) {
    const link = this.navLinkByName(linkLabel);
    await expect(link).toBeVisible();
    await link.click();
  }
}
