import { test, expect } from '../fixtures/test-fixture';

test.describe('About Section', () => {
  test('about section heading is visible', async ({ page, home }) => {
    await home.goto('/');
    await expect(
      page.getByText('Leading AI Automation & Intelligence', { exact: false }).first()
    ).toBeVisible();
  });

  test('about section describes NanoTech Hub mission', async ({ page, home }) => {
    await home.goto('/');
    await expect(
      page.getByText('strategic partner in AI-driven business transformation', { exact: false }).first()
    ).toBeVisible();
  });

  test('about section contains key stats', async ({ page, home }) => {
    await home.goto('/');
    const stats = ['200+', '70%', '50+', '15+', '99.9%', '24/7'];
    for (const stat of stats) {
      await expect(
        page.getByText(stat, { exact: true }).first()
      ).toBeVisible();
    }
  });

  test('stat labels are visible', async ({ page, home }) => {
    await home.goto('/');
    const labels = [
      'AI Projects Delivered',
      'Average Cost Reduction',
      'Enterprise Clients'
    ];
    for (const label of labels) {
      await expect(
        page.getByText(label, { exact: false }).first()
      ).toBeVisible();
    }
  });
});
