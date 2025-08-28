import { test, expect } from '../fixtures/test-fixture';

test.describe('Interactive Combo AI cards', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  test('hero section bubble visualization area exists', async ({ page }) => {
    const heroSection = page.getByRole('heading', { name: /Transforming Business/i }).locator('..');
    await expect(heroSection).toBeVisible();
  });

  test('AI model labels are rendered on page (via innerHTML search)', async ({ page }) => {
    const labels = ['ChatGPT', 'Gemini', 'Claude', 'Grok', 'Kimi'];
    const html = await page.content();
    let foundCount = 0;
    for (const label of labels) {
      if (html.includes(label)) foundCount++;
    }
    expect(foundCount).toBeGreaterThanOrEqual(2);
  });

  test('hero CTA buttons are present alongside bubble visualization', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Schedule AI Assessment' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'See AI in Action' })).toBeVisible();
  });

  test('no JS errors occur when interacting with hero section', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));

    await page.getByRole('heading', { name: /Transforming Business/i }).hover();
    await page.waitForTimeout(500);
    expect(errors).toHaveLength(0);
  });
});
