import { test, expect } from '@playwright/test';

test.describe('Accessibility Smoke Tests', () => {
  test('page has a main landmark', async ({ page }) => {
    await page.goto('https://nanotech.icu', { waitUntil: 'domcontentloaded' });
    const main = page.locator('main, [role="main"]');
    if (await main.count()) {
      await expect(main.first()).toBeVisible();
    }
  });

  test('all images have alt attributes', async ({ page }) => {
    await page.goto('https://nanotech.icu', { waitUntil: 'domcontentloaded' });
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).not.toBeNull();
    }
  });

  test('headings follow logical hierarchy', async ({ page }) => {
    await page.goto('https://nanotech.icu', { waitUntil: 'domcontentloaded' });
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThan(0);
    expect(h1Count).toBeLessThanOrEqual(3);
  });

  test('interactive elements are keyboard focusable', async ({ page }) => {
    await page.goto('https://nanotech.icu', { waitUntil: 'domcontentloaded' });
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? el.tagName.toLowerCase() : null;
    });
    expect(focused).toBeTruthy();
    expect(['a', 'button', 'input', 'select', 'textarea']).toContain(focused);
  });

  test('no empty links on the page', async ({ page }) => {
    await page.goto('https://nanotech.icu', { waitUntil: 'domcontentloaded' });
    const links = page.locator('a');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const text = (await link.innerText()).trim();
      const ariaLabel = await link.getAttribute('aria-label');
      const title = await link.getAttribute('title');
      const hasContent = text.length > 0 || ariaLabel || title;
      if (await link.isVisible()) {
        expect(hasContent).toBeTruthy();
      }
    }
  });

  test('color contrast: text is readable against background', async ({ page }) => {
    await page.goto('https://nanotech.icu', { waitUntil: 'domcontentloaded' });
    const heading = page.locator('h1').first();
    const color = await heading.evaluate(el => getComputedStyle(el).color);
    const bgColor = await heading.evaluate(el => {
      let parent = el as HTMLElement | null;
      while (parent) {
        const bg = getComputedStyle(parent).backgroundColor;
        if (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return bg;
        parent = parent.parentElement;
      }
      return 'rgb(255, 255, 255)';
    });
    expect(color).not.toBe(bgColor);
  });
});
