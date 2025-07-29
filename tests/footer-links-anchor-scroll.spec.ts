import { test, expect } from '../fixtures/test-fixture';
import { footerLinkLabels } from '../utils/site-data';

test.describe('Footer links + anchor scroll', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  for (const label of footerLinkLabels) {
    test(`footer link "${label}" is clickable`, async ({ page, home }) => {
      const footer = page.locator('footer');
      await footer.scrollIntoViewIfNeeded();

      const link = footer.getByRole('link', { name: label, exact: true });
      await expect(link).toBeVisible();

      const href = await link.getAttribute('href');
      const before = page.url();
      await link.click();
      await page.waitForTimeout(300);

      if (href?.startsWith('#')) {
        await expect(page).toHaveURL(new RegExp(`${href}$`));
        const target = page.locator(href);
        await expect(target.first()).toBeVisible();
      } else {
        const after = page.url();
        const changed = after !== before;
        const stillVisible = await link.isVisible();
        expect(changed || stillVisible).toBeTruthy();
      }
    });
  }
});
