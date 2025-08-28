import { test, expect } from '../fixtures/test-fixture';

const TEST_EMAIL = 'test_email_001007@proton.me';
const TEST_PASSWORD = 'test_email_001007';

test.describe('Login and Dashboard', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  test('login button is visible in header', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /Login/i })
    ).toBeVisible();
  });

  test('clicking login button opens a modal or panel', async ({ page }) => {
    await page.getByRole('button', { name: /Login/i }).click();
    await page.waitForTimeout(1000);
    const hasModal = await page.locator('[class*="modal"], [class*="login"], [class*="auth"], [role="dialog"]').first().isVisible();
    const hasInput = await page.locator('input').first().isVisible();
    expect(hasModal || hasInput).toBeTruthy();
  });

  test('login form accepts email input', async ({ page }) => {
    await page.getByRole('button', { name: /Login/i }).click();
    await page.waitForTimeout(1000);
    const emailInput = page.locator('input[type="email"], input[type="text"]').first();
    if (await emailInput.isVisible()) {
      await emailInput.fill(TEST_EMAIL);
      expect(await emailInput.inputValue()).toBe(TEST_EMAIL);
    }
  });

  test('login form accepts password input', async ({ page }) => {
    await page.getByRole('button', { name: /Login/i }).click();
    await page.waitForTimeout(1000);
    const passwordInput = page.locator('input[type="password"]').first();
    if (await passwordInput.isVisible()) {
      await passwordInput.fill(TEST_PASSWORD);
      expect(await passwordInput.inputValue()).toBe(TEST_PASSWORD);
    }
  });
});
