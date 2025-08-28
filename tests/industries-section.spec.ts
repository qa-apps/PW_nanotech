import { test, expect } from '../fixtures/test-fixture';

const INDUSTRIES = [
  'Financial Services',
  'Healthcare',
  'Manufacturing',
  'Retail & E-commerce',
  'Logistics & Transport',
  'Professional Services'
];

test.describe('Industries Section', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  test('industries section heading is visible', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'AI Solutions Across Sectors' });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  });

  test('all 6 industry cards are visible', async ({ page }) => {
    const sectionHeading = page.getByRole('heading', { name: 'AI Solutions Across Sectors' });
    await sectionHeading.scrollIntoViewIfNeeded();

    for (const industry of INDUSTRIES) {
      await expect(
        page.getByRole('heading', { name: industry }).first()
      ).toBeVisible();
    }
  });

  test('each industry card has a description', async ({ page }) => {
    const sectionHeading = page.getByRole('heading', { name: 'AI Solutions Across Sectors' });
    await sectionHeading.scrollIntoViewIfNeeded();

    for (const industry of INDUSTRIES) {
      const card = page.getByRole('heading', { name: industry }).first();
      await expect(card).toBeVisible();
      const parent = card.locator('..');
      const description = parent.locator('p');
      await expect(description.first()).toBeVisible();
    }
  });
});
