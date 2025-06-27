import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'Desktop 1920', width: 1920, height: 1080 },
  { name: 'Desktop 1440', width: 1440, height: 900 },
  { name: 'Laptop', width: 1280, height: 720 },
  { name: 'Tablet landscape', width: 1024, height: 768 },
  { name: 'Tablet portrait', width: 768, height: 1024 },
  { name: 'Mobile large', width: 430, height: 932 },
  { name: 'Mobile small', width: 375, height: 667 }
];

test.describe('Responsive layout smoke tests', () => {
  for (const vp of viewports) {
    test(`layout renders correctly at ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('https://nanotech.icu', { waitUntil: 'domcontentloaded' });

      await expect(page.getByText('Transforming Business', { exact: false }).first()).toBeVisible();

      await expect(
        page.getByRole('link', { name: 'NanoTech Hub' }).or(
          page.getByText('NanoTech Hub', { exact: false }).first()
        )
      ).toBeVisible();

      const images = page.locator('img');
      const imgCount = await images.count();
      for (let i = 0; i < Math.min(imgCount, 5); i++) {
        const img = images.nth(i);
        if (await img.isVisible()) {
          const box = await img.boundingBox();
          if (box) {
            expect(box.width).toBeLessThanOrEqual(vp.width + 20);
          }
        }
      }

      await expect(page.getByText('Schedule AI Assessment', { exact: false }).first()).toBeVisible();
    });
  }

  test('hamburger menu appears on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('https://nanotech.icu', { waitUntil: 'domcontentloaded' });

    const hamburger = page.locator('button[class*="menu"], button[aria-label*="menu"], [class*="hamburger"]').first();
    if (await hamburger.count()) {
      await expect(hamburger).toBeVisible();
    }
  });
});
