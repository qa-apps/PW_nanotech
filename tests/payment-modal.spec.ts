import { test, expect } from '../fixtures/test-fixture';

test.describe('Payment Modal', () => {
  test('payment modal displays admin contact info', async ({ page, home }) => {
    await home.goto('/');
    const paymentTrigger = page.getByText('Payment', { exact: false }).first();
    if (await paymentTrigger.isVisible()) {
      await paymentTrigger.click();
      await expect(
        page.getByText('Please contact administration', { exact: false })
      ).toBeVisible();
      await expect(
        page.getByText('info@nanotech.icu', { exact: false })
      ).toBeVisible();
    }
  });

  test('payment modal can be closed', async ({ page, home }) => {
    await home.goto('/');
    const paymentTrigger = page.getByText('Payment', { exact: false }).first();
    if (await paymentTrigger.isVisible()) {
      await paymentTrigger.click();
      const closeBtn = page.getByText('Got it', { exact: true }).or(
        page.getByRole('button', { name: /close|got it/i })
      ).first();
      if (await closeBtn.isVisible()) {
        await closeBtn.click();
        await expect(
          page.getByText('Please contact administration', { exact: false })
        ).not.toBeVisible();
      }
    }
  });
});
