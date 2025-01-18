import { expect, type Locator, type Page } from '@playwright/test';

export class ComboAICardsPage {
  constructor(private readonly page: Page) {}

  private card(name: string): Locator {
    return this.page.getByText(name, { exact: true }).first();
  }

  async hoverCard(name: string) {
    const target = this.card(name);
    await expect(target).toBeVisible();
    await target.hover();
  }

  async clickCard(name: string) {
    const target = this.card(name);
    await expect(target).toBeVisible();
    await target.click();
  }

  async expectTooltipContains(name: string) {
    const tooltip = this.page.locator('[role="tooltip"], .tooltip, .popover').filter({ hasText: name }).first();
    await expect(tooltip).toBeVisible();
  }
}
