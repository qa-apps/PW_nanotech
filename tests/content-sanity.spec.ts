import { test, expect } from '../fixtures/test-fixture';
import { expectImagesLoaded } from '../utils/assertions';
import { keyContentTexts } from '../utils/site-data';

test.describe('Content sanity', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  test('key texts are visible and CTAs are active', async ({ page }) => {
    for (const text of keyContentTexts) {
      await expect(page.getByText(text, { exact: false }).first()).toBeVisible();
    }

    await expect(page.getByRole('link', { name: /Schedule AI Assessment/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /See AI in Action/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Learn More/i }).first()).toBeVisible();
  });

  test('images are not broken', async ({ page }) => {
    await expectImagesLoaded(page);
  });

  test('theme switcher has all expected options', async ({ theme }) => {
    await theme.verifyThemeOptionsVisible();
  });

  test('responsive smoke on desktop/tablet/mobile widths', async ({ page, home }) => {
    const viewports = [
      { width: 1440, height: 900 },
      { width: 1024, height: 768 },
      { width: 390, height: 844 }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await home.goto('/');
      await expect(page.getByText('Transforming Business', { exact: false }).first()).toBeVisible();
    }
  });
});
