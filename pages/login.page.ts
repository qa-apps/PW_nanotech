import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  private loginModal() {
    return this.page.locator('[class*="modal"], [class*="login"], [role="dialog"]').first();
  }

  async openLoginModal() {
    await this.page.getByText('Login', { exact: true }).first().click();
    await expect(this.loginModal()).toBeVisible();
  }

  async fillEmail(email: string) {
    const emailInput = this.loginModal().locator('input[type="email"], input[type="text"]').first();
    await expect(emailInput).toBeVisible();
    await emailInput.fill(email);
  }

  async fillPassword(password: string) {
    const passwordInput = this.loginModal().locator('input[type="password"]').first();
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginModal().getByRole('button', { name: /Login/i }).click();
  }

  async login(email: string, password: string) {
    await this.openLoginModal();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async expectLoginModalVisible() {
    await expect(this.loginModal()).toBeVisible();
  }

  async expectLoginModalHidden() {
    await expect(this.loginModal()).not.toBeVisible();
  }
}
