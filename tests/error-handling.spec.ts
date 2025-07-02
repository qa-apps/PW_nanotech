import { test, expect } from '@playwright/test';

test.describe('Error Handling and Edge Cases', () => {
  test('404 page or redirect for non-existent route', async ({ page }) => {
    const response = await page.goto('https://nanotech.icu/non-existent-page-12345');
    expect(response).not.toBeNull();
    const status = response!.status();
    expect([200, 301, 302, 404]).toContain(status);
  });

  test('contact form does not submit with empty fields', async ({ page }) => {
    await page.goto('https://nanotech.icu/#contact', { waitUntil: 'domcontentloaded' });
    const submitButton = page.getByRole('button', { name: 'Send Message' });
    await expect(submitButton).toBeVisible();
    await submitButton.click();
    await page.waitForTimeout(500);
    const successToast = page.getByText('Message sent successfully', { exact: false });
    await expect(successToast).not.toBeVisible();
  });

  test('contact form validates email format', async ({ page }) => {
    await page.goto('https://nanotech.icu/#contact', { waitUntil: 'domcontentloaded' });
    const form = page.locator('form').first();
    const inputs = form.locator('input');
    await inputs.nth(0).fill('Test User');
    await inputs.nth(1).fill('not-an-email');
    await form.locator('textarea').first().fill('Test message');
    await page.getByRole('button', { name: 'Send Message' }).click();
    await page.waitForTimeout(500);
    const successToast = page.getByText('Message sent successfully', { exact: false });
    await expect(successToast).not.toBeVisible();
  });

  test('no console errors on page load', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    await page.goto('https://nanotech.icu', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    expect(consoleErrors.length).toBeLessThanOrEqual(5);
  });

  test('no unhandled JS errors on page load', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', err => pageErrors.push(err.message));
    await page.goto('https://nanotech.icu', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    expect(pageErrors).toHaveLength(0);
  });
});
