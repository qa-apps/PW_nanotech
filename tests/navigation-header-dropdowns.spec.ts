import { test, expect } from '../fixtures/test-fixture';
import { headerDropdowns } from '../utils/site-data';

test.describe('Navigation / Header dropdowns', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  for (const group of headerDropdowns) {
    for (const link of group.links) {
      test(`"${group.menuLabel}" -> "${link.label}" is clickable and lands on relevant content`, async ({
        page,
        home,
        header
      }) => {
        const before = page.url();

        await header.clickDropdownItem(group.menuLabel, link.label);
        await page.waitForLoadState('domcontentloaded');

        const after = page.url();
        const hasUrlChange = after !== before;
        const hasRelevantText = await page.getByText(link.label, { exact: false }).first().isVisible();

        expect(hasUrlChange || hasRelevantText).toBeTruthy();
      });
    }
  }

  test('main nav links Home and Contact are reachable', async ({ page, home, header }) => {
    await header.openPageFromHeader('Home');
    await expect(page).toHaveURL(/\/(#.*)?$/);

    await header.openPageFromHeader('Contact');
    await expect(page).toHaveURL(/#contact|\/contact/);
  });
});
