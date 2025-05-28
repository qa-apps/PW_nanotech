import { test, expect } from '../fixtures/test-fixture';

test.describe('Scroll Navigation and Section Anchors', () => {
  const sections = [
    { hash: '#about', text: 'Leading AI Automation' },
    { hash: '#services', text: 'Autonomous Agent Services' },
    { hash: '#industries', text: 'AI Solutions Across Sectors' },
    { hash: '#contact', text: 'Get in Touch' }
  ];

  for (const section of sections) {
    test(`navigating to ${section.hash} shows "${section.text}"`, async ({ page, home }) => {
      await home.goto(section.hash);
      await page.waitForTimeout(500);
      await expect(
        page.getByText(section.text, { exact: false }).first()
      ).toBeVisible();
    });
  }

  test('scroll down arrow navigates to next section', async ({ page, home }) => {
    await home.goto('/');
    const arrow = page.locator('[class*="scroll-down"], [class*="arrow-down"]').first();
    if (await arrow.count()) {
      await arrow.click();
      await page.waitForTimeout(500);
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(100);
    }
  });

  test('smooth scroll behavior is enabled', async ({ page, home }) => {
    await home.goto('/');
    const scrollBehavior = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).scrollBehavior;
    });
    expect(scrollBehavior).toBe('smooth');
  });
});
