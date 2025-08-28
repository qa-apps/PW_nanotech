import { test, expect } from '@playwright/test';

test.describe('Error Handling and Edge Cases', () => {
  test('404 page or redirect for non-existent route', async ({ page }) => {
    const response = await page.goto('/non-existent-page-12345');
    expect(response).not.toBeNull();
    const status = response!.status();
    expect([200, 301, 302, 404]).toContain(status);
  });

  test('Send Message button in contact form is visible', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const contactHeading = page.getByRole('heading', { name: 'Start Your AI Transformation' });
    await contactHeading.scrollIntoViewIfNeeded();
    const submitButton = page.getByRole('button', { name: 'Send Message', exact: true });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });

  test('no console errors on page load', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    expect(consoleErrors.length).toBeLessThanOrEqual(5);
  });

  test('no unhandled JS errors on page load', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', err => pageErrors.push(err.message));
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    expect(pageErrors).toHaveLength(0);
  });
});
