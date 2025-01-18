import { expect, type Page } from '@playwright/test';

const THEMES = ['Light', 'Dark', 'Aurora Blue', 'Glass Dawn'] as const;
export type ThemeOption = (typeof THEMES)[number];

export class ThemePage {
  constructor(private readonly page: Page) {}

  async openThemeMenu() {
    const trigger = this.page.getByText(/^Light$|^Dark$|^Aurora Blue$|^Glass Dawn$/).first();
    await expect(trigger).toBeVisible();
    await trigger.click();
  }

  async selectTheme(option: ThemeOption) {
    await this.openThemeMenu();
    await this.page.getByText(option, { exact: true }).first().click();
  }

  async verifyThemeOptionsVisible() {
    await this.openThemeMenu();
    for (const option of THEMES) {
      await expect(this.page.getByText(option, { exact: true }).first()).toBeVisible();
    }
  }
}
