import { expect, type Page } from '@playwright/test';

export class ComboAICardsPage {
  constructor(private readonly page: Page) {}

  async expectCardAttached(name: string) {
    await expect(
      this.page.getByText(name, { exact: true }).first()
    ).toBeAttached();
  }

  async clickCard(name: string) {
    const target = this.page.getByText(name, { exact: true }).first();
    await expect(target).toBeAttached();
    await target.click({ force: true });
  }

  async hoverCard(name: string) {
    const target = this.page.getByText(name, { exact: true }).first();
    await expect(target).toBeAttached();
    await target.hover({ force: true });
  }
}
