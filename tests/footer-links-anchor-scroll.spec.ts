import { test, expect } from '../fixtures/test-fixture';
import { footerLinkLabels } from '../utils/site-data';

test.describe('Footer links + anchor scroll', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  for (const label of footerLinkLabels) {
    test(`footer link "${label}" is clickable`, async ({ page }) => {
      const footer = page.locator('footer');
      await footer.scrollIntoViewIfNeeded();

      const link = footer.getByRole('link', { name: label, exact: true });
      await expect(link).toBeVisible();
      await expect(link).toBeEnabled();

      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
    });
  }
});
