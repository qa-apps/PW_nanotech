import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async openLoginModal() {
    await this.page.getByRole('button', { name: /Login/i }).click();
    await expect(this.page.getByRole('textbox').first()).toBeVisible();
  }

  async fillEmail(email: string) {
    const inputs = this.page.locator('[role="dialog"], [class*="modal"], [class*="login"]')
      .first().locator('input');
    await inputs.first().fill(email);
  }

  async fillPassword(password: string) {
    const inputs = this.page.locator('[role="dialog"], [class*="modal"], [class*="login"]')
      .first().locator('input[type="password"]');
    await inputs.first().fill(password);
  }

  async clickLoginButton() {
    await this.page.getByRole('button', { name: /^Login$/i }).click();
  }

  async login(email: string, password: string) {
    await this.openLoginModal();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async expectLoginModalVisible() {
    await expect(this.page.getByRole('textbox').first()).toBeVisible();
  }

  async expectLoginModalHidden() {
    await expect(
      this.page.locator('[role="dialog"], [class*="modal"]').first()
    ).not.toBeVisible();
  }
}
