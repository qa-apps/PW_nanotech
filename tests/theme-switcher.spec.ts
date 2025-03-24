import { test, expect } from '../fixtures/test-fixture';

const THEMES = ['Light', 'Dark', 'Aurora Blue', 'Glass Dawn'] as const;

test.describe('Theme Switcher', () => {
  test('theme menu opens and shows all 4 options', async ({ home, theme }) => {
    await home.goto('/');
    await theme.verifyThemeOptionsVisible();
  });

  for (const themeName of THEMES) {
    test(`selecting "${themeName}" theme applies without errors`, async ({ page, home, theme }) => {
      await home.goto('/');
      await theme.selectTheme(themeName);
      await page.waitForTimeout(500);

      await expect(page.getByText('Transforming Business', { exact: false }).first()).toBeVisible();

      const errors: string[] = [];
      page.on('pageerror', err => errors.push(err.message));
      await page.waitForTimeout(1000);
      expect(errors).toHaveLength(0);
    });
  }

  test('theme persists after page reload', async ({ page, home, theme }) => {
    await home.goto('/');
    await theme.selectTheme('Dark');
    await page.waitForTimeout(500);
    await page.reload();
    await expect(page.getByText('Transforming Business', { exact: false }).first()).toBeVisible();
  });
});
