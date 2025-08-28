import { test, expect } from '../fixtures/test-fixture';

test.describe('Payment Modal', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  test('accepted payment methods section is visible in footer', async ({ page }) => {
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(
      page.getByText('Accepted Payment Methods', { exact: false })
    ).toBeVisible();
  });

  test('payment method buttons exist in footer', async ({ page }) => {
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    const paymentButtons = footer.locator('button');
    const count = await paymentButtons.count();
    expect(count).toBeGreaterThan(0);
  });
});
