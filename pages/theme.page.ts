import { expect, type Page } from '@playwright/test';

const THEMES = ['Light', 'Dark', 'Aurora Blue', 'Glass Dawn'] as const;
export type ThemeOption = (typeof THEMES)[number];

export class ThemePage {
  constructor(private readonly page: Page) {}

  private themeSelect() {
    return this.page.getByLabel('Select background theme');
  }

  async selectTheme(option: ThemeOption) {
    await expect(this.themeSelect()).toBeVisible();
    await this.themeSelect().selectOption(option);
  }

  async verifyThemeOptionsVisible() {
    const select = this.themeSelect();
    await expect(select).toBeVisible();
    for (const option of THEMES) {
      await expect(select.locator('option', { hasText: option })).toBeAttached();
    }
  }
}
