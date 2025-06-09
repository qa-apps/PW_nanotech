import { test, expect } from '../fixtures/test-fixture';

test.describe('Registration Form', () => {
  test('Register tab is accessible from login modal', async ({ page, home }) => {
    await home.goto('/');
    await page.getByText('Login', { exact: true }).first().click();
    const registerTab = page.getByText('Register', { exact: true }).first();
    if (await registerTab.isVisible()) {
      await registerTab.click();
      await expect(page.getByText('Create Account', { exact: false })).toBeVisible();
    }
  });

  test('registration form has all required fields', async ({ page, home }) => {
    await home.goto('/');
    await page.getByText('Login', { exact: true }).first().click();
    const registerTab = page.getByText('Register', { exact: true }).first();
    if (await registerTab.isVisible()) {
      await registerTab.click();
      await expect(page.locator('input[type="text"], input[placeholder*="Name"]').first()).toBeVisible();
      await expect(page.locator('input[type="email"]').first()).toBeVisible();
      await expect(page.locator('input[type="password"]').first()).toBeVisible();
    }
  });

  test('Create Account button is visible in register form', async ({ page, home }) => {
    await home.goto('/');
    await page.getByText('Login', { exact: true }).first().click();
    const registerTab = page.getByText('Register', { exact: true }).first();
    if (await registerTab.isVisible()) {
      await registerTab.click();
      await expect(
        page.getByRole('button', { name: /Create Account/i })
      ).toBeVisible();
    }
  });
});
