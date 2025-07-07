import { test, expect } from '@playwright/test';

test.describe('Page Performance Smoke Tests', () => {
  test('homepage loads within 10 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('https://nanotech.icu', { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(10_000);
  });

  test('contact section loads within 10 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('https://nanotech.icu/#contact', { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(10_000);
  });

  test('page weight is reasonable (DOM node count)', async ({ page }) => {
    await page.goto('https://nanotech.icu', { waitUntil: 'domcontentloaded' });
    const nodeCount = await page.evaluate(() => document.querySelectorAll('*').length);
    expect(nodeCount).toBeLessThan(5000);
  });

  test('no excessively large images (> 2MB)', async ({ page }) => {
    const largeResources: string[] = [];
    page.on('response', response => {
      const contentType = response.headers()['content-type'] || '';
      const contentLength = parseInt(response.headers()['content-length'] || '0');
      if (contentType.includes('image') && contentLength > 2_000_000) {
        largeResources.push(response.url());
      }
    });
    await page.goto('https://nanotech.icu', { waitUntil: 'load' });
    expect(largeResources).toHaveLength(0);
  });

  test('page title is set correctly', async ({ page }) => {
    await page.goto('https://nanotech.icu', { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title.toLowerCase()).toContain('nanotech');
  });
});
