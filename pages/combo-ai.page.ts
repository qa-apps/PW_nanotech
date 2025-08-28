import { expect, type Page } from '@playwright/test';

export class ComboAICardsPage {
  constructor(private readonly page: Page) {}

  async expectCardAttached(name: string) {
    await expect(
      this.page.getByText(name, { exact: false }).first()
    ).toBeAttached({ timeout: 15_000 });
  }

  async clickCard(name: string) {
    const target = this.page.getByText(name, { exact: false }).first();
    await expect(target).toBeAttached({ timeout: 15_000 });
    await target.click({ force: true });
  }

  async hoverCard(name: string) {
    const target = this.page.getByText(name, { exact: false }).first();
    await expect(target).toBeAttached({ timeout: 15_000 });
    await target.hover({ force: true });
  }
}
