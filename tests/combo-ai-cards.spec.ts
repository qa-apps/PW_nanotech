import { test, expect } from '../fixtures/test-fixture';
import { comboCardLabels } from '../utils/site-data';

test.describe('Interactive Combo AI cards', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  for (const label of comboCardLabels) {
    test(`card "${label}" is present in the hero bubble visualization`, async ({ combo }) => {
      await combo.expectCardAttached(label);
    });
  }

  test('clicking a card does not cause errors', async ({ page, combo }) => {
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    await combo.clickCard(comboCardLabels[0]);
    await page.waitForTimeout(500);
    expect(errors).toHaveLength(0);
  });
});
