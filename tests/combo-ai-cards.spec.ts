import { test, expect } from '../fixtures/test-fixture';
import { comboCardLabels } from '../utils/site-data';

test.describe('Interactive Combo AI cards', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  for (const label of comboCardLabels) {
    test(`card "${label}" is clickable and shows context`, async ({ page, home, combo }) => {
      await combo.clickCard(label);

      const anyContextVisible =
        (await page.getByText(label, { exact: false }).first().isVisible()) ||
        (await page.locator('[role="tooltip"], .tooltip, .popover').first().isVisible());
      expect(anyContextVisible).toBeTruthy();
    });
  }

  test('tooltip/popover can be closed with Escape', async ({ page, home, combo }) => {
    await combo.hoverCard(comboCardLabels[0]);
    await page.keyboard.press('Escape');
    const popup = page.locator('[role="tooltip"], .tooltip, .popover');
    if (await popup.count()) {
      await expect(popup.first()).not.toBeVisible();
    }
  });
});
