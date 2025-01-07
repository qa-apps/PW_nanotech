import { expect, test } from '@playwright/test';

test('Playwright docs landing page has expected title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Playwright/);
});
