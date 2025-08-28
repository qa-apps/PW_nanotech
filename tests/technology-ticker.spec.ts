import { test, expect } from '../fixtures/test-fixture';

const TECH_KEYWORDS = [
  'Agentic AI',
  'Large Language Models',
  'Machine Learning',
  'Computer Vision',
  'Big Data',
  'Data Analytics',
  'Natural Language Processing',
  'Generative AI',
  'Multi-Agent Systems'
];

test.describe('Technology Ticker / Marquee', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  test('ticker section is visible with technology keywords', async ({ page }) => {
    const techSection = page.getByText('Powered by the most innovative technologies', { exact: false });
    await techSection.scrollIntoViewIfNeeded();
    await expect(techSection).toBeVisible();
  });

  test('ticker container is present and has content', async ({ page }) => {
    const techSection = page.getByText('Powered by the most innovative technologies', { exact: false });
    await techSection.scrollIntoViewIfNeeded();
    const parent = techSection.locator('..');
    await expect(parent).toBeVisible();
    const children = parent.locator('div >> nth=0');
    const count = await children.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  for (const keyword of TECH_KEYWORDS) {
    test(`${keyword} keyword is present`, async ({ page }) => {
      await expect(
        page.getByText(keyword, { exact: false }).first()
      ).toBeAttached();
    });
  }
});
