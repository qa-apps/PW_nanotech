import { test, expect } from '../fixtures/test-fixture';
import { headerDropdowns } from '../utils/site-data';

test.describe('Navigation / Header dropdowns', () => {
  for (const group of headerDropdowns) {
    test(`"${group.menuLabel}" dropdown opens on hover`, async ({ page, home, header }) => {
      await home.goto('/');
      await header.openDropdown(group.menuLabel);
      await page.waitForTimeout(500);
    });

    for (const link of group.links) {
      test(`"${group.menuLabel}" -> "${link.label}" is visible in dropdown`, async ({
        page,
        home,
        header
      }) => {
        await home.goto('/');
        await header.openDropdown(group.menuLabel);
        await page.waitForTimeout(500);
        const item = page.getByRole('link', { name: link.label }).first();
        const isVisible = await item.isVisible();
        expect(isVisible).toBeTruthy();
      });
    }
  }

  test('main nav links Home and Contact are reachable', async ({ page, home }) => {
    await home.goto('/');
    const homeLink = page.locator('nav').getByRole('link', { name: 'Home' });
    await expect(homeLink).toBeVisible();
    const homeHref = await homeLink.getAttribute('href');
    expect(homeHref).toContain('#home');

    const contactLink = page.locator('nav').getByRole('link', { name: 'Contact' });
    await expect(contactLink).toBeVisible();
    const contactHref = await contactLink.getAttribute('href');
    expect(contactHref).toContain('#contact');
  });
});
