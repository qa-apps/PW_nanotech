import { test, expect } from '../fixtures/test-fixture';

const THEMES = ['Light', 'Dark', 'Aurora Blue', 'Glass Dawn'] as const;

test.describe('Theme Switcher', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  test('theme select has all 4 options', async ({ theme }) => {
    await theme.verifyThemeOptionsVisible();
  });

  for (const themeName of THEMES) {
    test(`selecting "${themeName}" theme applies without errors`, async ({ page, theme }) => {
      const errors: string[] = [];
      page.on('pageerror', err => errors.push(err.message));

      await theme.selectTheme(themeName);
      await page.waitForTimeout(500);

      await expect(page.getByText('Transforming Business', { exact: false }).first()).toBeVisible();
      expect(errors).toHaveLength(0);
    });
  }

  test('theme persists after page reload', async ({ page, theme }) => {
    await theme.selectTheme('Dark');
    await page.waitForTimeout(500);
    await page.reload();
    await expect(page.getByText('Transforming Business', { exact: false }).first()).toBeVisible();
  });
});
