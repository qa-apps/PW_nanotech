import { test, expect } from '../fixtures/test-fixture';

test.describe('Registration Form', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  test('login or register button is accessible in header', async ({ page }) => {
    const loginBtn = page.getByRole('button', { name: /Login/i });
    await expect(loginBtn).toBeVisible();
    await expect(loginBtn).toBeEnabled();
  });

  test('clicking login button shows auth interface with inputs', async ({ page }) => {
    await page.getByRole('button', { name: /Login/i }).click();
    await page.waitForTimeout(1000);
    const inputs = page.locator('input');
    const count = await inputs.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
