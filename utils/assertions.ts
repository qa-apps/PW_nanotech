import { expect, type Locator, type Page } from '@playwright/test';

export async function expectImagesLoaded(page: Page) {
  const images = page.locator('img');
  const count = await images.count();

  for (let i = 0; i < count; i += 1) {
    const img = images.nth(i);
    await img.scrollIntoViewIfNeeded();
    const result = await img.evaluate((node) => {
      const image = node as HTMLImageElement;
      return {
        complete: image.complete,
        naturalWidth: image.naturalWidth
      };
    });
    expect(result.complete).toBeTruthy();
    expect(result.naturalWidth).toBeGreaterThan(0);
  }
}

export async function expectSectionHeadingVisible(page: Page, heading: string) {
  const sectionHeading = page.getByRole('heading', { name: heading }).first();
  await expect(sectionHeading).toBeVisible();
}

export async function expectClickable(locator: Locator) {
  await expect(locator).toBeVisible();
  await expect(locator).toBeEnabled();
}
