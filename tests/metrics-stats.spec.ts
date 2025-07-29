import { test, expect } from '../fixtures/test-fixture';
import { MetricsPage } from '../pages/metrics.page';

test.describe('Metrics and Statistics Section', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  test('measurable business impact heading is visible', async ({ page, home }) => {
    const metrics = new MetricsPage(page);
    await metrics.scrollToMetrics();
  });

  test('all 6 metric cards are visible', async ({ page, home }) => {
    const metrics = new MetricsPage(page);
    await metrics.scrollToMetrics();
    await metrics.expectAllMetricCardsVisible();
  });

  test('about section stats counters are visible', async ({ page, home }) => {
    const metrics = new MetricsPage(page);
    await metrics.expectStatsCountersVisible();
  });

  test('70% Cost Reduction metric details visible', async ({ page, home }) => {
    const metrics = new MetricsPage(page);
    await metrics.scrollToMetrics();
    await metrics.expectMetricCardVisible('70% Cost Reduction');
    await expect(
      page.getByText('operational costs', { exact: false }).first()
    ).toBeVisible();
  });

  test('99.9% Accuracy metric details visible', async ({ page, home }) => {
    const metrics = new MetricsPage(page);
    await metrics.scrollToMetrics();
    await metrics.expectMetricCardVisible('99.9% Accuracy');
  });
});
